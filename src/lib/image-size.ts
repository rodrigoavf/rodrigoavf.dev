import fs from "node:fs";
import path from "node:path";

export type Dimensions = { width: number; height: number };

/**
 * Reads intrinsic pixel dimensions straight from an image file's header.
 *
 * `next/image` needs width and height up front to reserve space and avoid
 * layout shift, but markdown's `![alt](src)` carries neither. Rather than make
 * every post declare them by hand, we read them at build time.
 *
 * Deliberately dependency-free: the published image-size packages carry an
 * unfixed DoS advisory, and we only need the handful of formats a post would
 * realistically use.
 */
function parse(buffer: Buffer): Dimensions | null {
  // PNG — IHDR is always the first chunk, at a fixed offset.
  if (buffer.length >= 24 && buffer.readUInt32BE(0) === 0x89504e47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  // GIF — logical screen descriptor, little endian.
  if (buffer.length >= 10 && buffer.toString("ascii", 0, 3) === "GIF") {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  }

  // WebP — three sub-formats, each storing the size differently.
  if (
    buffer.length >= 30 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    const format = buffer.toString("ascii", 12, 16);
    if (format === "VP8 ") {
      return {
        width: buffer.readUInt16LE(26) & 0x3fff,
        height: buffer.readUInt16LE(28) & 0x3fff,
      };
    }
    if (format === "VP8L") {
      const bits = buffer.readUInt32LE(21);
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >> 14) & 0x3fff) + 1,
      };
    }
    if (format === "VP8X") {
      const read24 = (offset: number) =>
        buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
      return { width: read24(24) + 1, height: read24(27) + 1 };
    }
  }

  // JPEG — walk the segment chain looking for a start-of-frame marker.
  if (buffer.length >= 4 && buffer.readUInt16BE(0) === 0xffd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      // Runs of 0xFF are legal padding before a marker, not a segment.
      if (marker === 0xff) {
        offset += 1;
        continue;
      }
      // SOF0–SOF15, excluding the non-frame markers that share the range.
      const isFrame =
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc;
      if (isFrame) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      offset += 2 + buffer.readUInt16BE(offset + 2);
    }
  }

  // SVG — explicit width/height if present, otherwise the viewBox.
  const head = buffer.toString("utf8", 0, 2048);
  if (head.includes("<svg")) {
    const attr = (name: string) =>
      Number.parseFloat(
        head.match(new RegExp(`${name}=["']([\\d.]+)`, "i"))?.[1] ?? "",
      );
    const width = attr("width");
    const height = attr("height");
    if (Number.isFinite(width) && Number.isFinite(height)) {
      return { width: Math.round(width), height: Math.round(height) };
    }
    const viewBox = head.match(/viewBox=["']\s*[\d.-]+[ ,]+[\d.-]+[ ,]+([\d.]+)[ ,]+([\d.]+)/i);
    if (viewBox) {
      return {
        width: Math.round(Number.parseFloat(viewBox[1])),
        height: Math.round(Number.parseFloat(viewBox[2])),
      };
    }
  }

  return null;
}

/** 16:9 at a sensible width — used when a file can't be measured. */
const FALLBACK: Dimensions = { width: 1600, height: 900 };

/**
 * Measures an image referenced by a site-root path such as
 * `/images/posts/my-post/step-1.png`, resolving it inside `public/`.
 *
 * Never throws: a missing or unreadable file falls back to a 16:9 box, so one
 * bad path can't fail the whole build.
 */
export function getImageSize(src: string): Dimensions {
  if (!src.startsWith("/")) return FALLBACK;

  const filePath = path.join(process.cwd(), "public", src.split(/[?#]/)[0]);
  try {
    const handle = fs.openSync(filePath, "r");
    try {
      // Generous: a JPEG's SOF marker sits after any EXIF block, which can
      // itself hold a full thumbnail and run well past a few KB.
      const buffer = Buffer.alloc(
        Math.min(128 * 1024, fs.fstatSync(handle).size),
      );
      fs.readSync(handle, buffer, 0, buffer.length, 0);
      return parse(buffer) ?? FALLBACK;
    } finally {
      fs.closeSync(handle);
    }
  } catch {
    return FALLBACK;
  }
}
