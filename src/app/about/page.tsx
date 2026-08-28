import type { ReactNode } from "react";
import { EmailLink } from "@/components/email-link";
import { PageShell } from "@/components/page-shell";
import { site } from "@/lib/site";

export const metadata = {
  title: "About",
  description: site.description,
};

const skills = [
  {
    group: "Analytics & BI",
    items: [
      "Power BI",
      "DAX",
      "Power Query (M)",
      "Semantic models",
      "Row-level security",
      "Data modelling",
      "Databricks AI/BI",
    ],
  },
  {
    group: "Data engineering",
    items: ["SQL", "Python", "PySpark", "Spark SQL", "KQL", "ETL / ELT"],
  },
  {
    group: "Microsoft Fabric",
    items: [
      "Lakehouse",
      "Warehouse",
      "Object-level security",
      "Dynamic data masking",
      "Deployment pipelines",
      "Data pipelines",
      "Data governance",
    ],
  },
  {
    group: "Automation & integration",
    items: ["Power Automate", "VBA", "REST APIs", "Advanced Excel"],
  },
];

const roles = [
  {
    title: "Lead Data Analyst Consultant",
    org: "Devoteam",
    period: "Sep 2023 – Present",
    place: "Lisbon, Portugal / Remote",
    points: [
      "End-to-end Power BI and Microsoft Fabric delivery for clients across pharmaceuticals, media, finance, retail and manufacturing.",
      "Acting tech lead on several projects, and the main point of contact for gathering and shaping client requirements.",
      "Built internal tooling — C# scripts for Tabular Editor, reusable RLS implementations — that cut manual work and made delivery more consistent.",
      "Mentored junior analysts and ran knowledge-sharing sessions on Power BI practice, TMDL and GitHub integration.",
    ],
  },
  {
    title: "Senior BI Analyst",
    org: "Serasa Experian",
    period: "Apr – Aug 2023",
    place: "Blumenau, Brazil",
    points: [
      "Brought in to modernise the Customer Care area's reporting infrastructure.",
      "Rebuilt every report as an automated Power BI dashboard, taking refresh time from hours to minutes.",
      "Automated database extracts and ingestion over REST APIs, removing the manual collection step entirely.",
    ],
  },
  {
    title: "Data Analyst",
    org: "Mous",
    period: "May 2019 – Feb 2023",
    place: "Dongguan, China / Remote",
    points: [
      "Hired to build the company's first data and reporting infrastructure from nothing.",
      "Built a production tracking tool feeding the ERP, which grew to cover several other areas of the business.",
      "Modelled production cost scenarios in Power BI to support purchasing and pricing decisions.",
      "Built a Power Apps mobile app for QC inspections on the factory floor, replacing a paper process.",
    ],
  },
  {
    title: "Project Manager — China Market Entry",
    org: "Lugano Alimentos e Bebidas",
    period: "Nov 2016 – Aug 2018",
    place: "Shenzhen, China",
    points: [
      "Primary on-the-ground decision-maker between the Brazilian HQ and the China team.",
      "Ran market research on the Chinese premium food sector and managed the import licensing process.",
    ],
  },
  {
    title: "Sales Information Analyst",
    org: "Philip Morris International",
    period: "Mar 2014 – Oct 2016",
    place: "Porto Alegre, Brazil",
    points: [
      "Owned regional sales data and reporting for Rio Grande do Sul, feeding Brazil's national HQ.",
      "Automated the department's entire sales data process with Excel VBA, cutting manual work and error rates sharply.",
    ],
  },
];

const certifications = [
  { name: "Databricks Data Analyst", issuer: "Databricks", year: "2026" },
  { name: "DP-700 — Fabric Data Engineer", issuer: "Microsoft", year: "2026" },
  {
    name: "DP-600 — Fabric Analytics Engineer",
    issuer: "Microsoft",
    year: "2024",
  },
  { name: "PL-300 — Power BI Data Analyst", issuer: "Microsoft", year: "2024" },
];

const education = [
  {
    course: "MSc Information Management — Business Intelligence",
    school: "NOVA IMS, Lisbon",
    period: "2023 – 2025",
  },
  {
    course: "BSc Economics",
    school: "UNISINOS, São Leopoldo, Brazil",
    period: "2010 – 2014",
  },
];

const languages = [
  { name: "Portuguese", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "Basic" },
  { name: "Mandarin", level: "Elementary" },
];

export default function AboutPage() {
  return (
    <PageShell
      title="About"
      intro={`${site.role} — ${site.location}.`}
    >
      <div className="prose">
        <p>
          My name if Rodrigo Ferreira, I build business intelligence solutions on the Microsoft and Databricks stack — pipelines and automation at one end, semantic models and reports at the other. Ten years of it now, across Brazil, China and Portugal.
        </p>
        <p>
          I currently consult at <strong>Devoteam</strong>, delivering Power BI
          and Microsoft Fabric work for international clients. Before that I
          modernised reporting at Serasa Experian, and spent nearly four years
          in southern China building Mous&apos; first data
          infrastructure from scratch — which is where I learned that the
          hardest part of analytics is usually not the analytics.
        </p>
        <p>
          I started in economics and moved sideways into data through
          spreadsheets, which is why I still think a well-built Excel model
          deserves more respect than it gets. That detour also turned into{" "}
          <a
            href="https://youtube.com/funcaoexcel"
            target="_blank"
            rel="noreferrer noopener"
          >
            Função Excel
          </a>
          , a Portuguese-language Excel tutorial site and YouTube channel I ran
          from 2015 to early 2026 — 140+ articles and an audience of around 18,000
          subscribers.
        </p>
        <p>
          This site is where the English-language version of that habit lives:
          notes and tutorials on data analysis and data engineering, the projects
          worth showing, and the cheat sheets I got tired of looking up twice.
        </p>
      </div>

      <Section title="What I work with">
        <dl className="grid gap-6 sm:grid-cols-2">
          {skills.map((entry) => (
            <div key={entry.group}>
              <dt className="text-sm font-semibold tracking-tight">
                {entry.group}
              </dt>
              <dd className="mt-2.5">
                <ul className="flex flex-wrap gap-1.5">
                  {entry.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-accent/25 bg-accent/8 px-2 py-0.5 font-mono text-xs text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Experience">
        <ol className="flex flex-col divide-y divide-border">
          {roles.map((role) => (
            <li key={`${role.org}-${role.period}`} className="py-6 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium tracking-tight">
                  {role.title}{" "}
                  <span className="text-muted">· {role.org}</span>
                </h3>
                <p className="font-mono text-xs text-muted">{role.period}</p>
              </div>
              <p className="mt-0.5 font-mono text-xs text-muted">{role.place}</p>
              <ul className="mt-3 flex max-w-[var(--measure)] flex-col gap-1.5 text-sm leading-relaxed text-muted">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span aria-hidden="true" className="text-accent">
                      —
                    </span>
                    <span className="text-pretty">{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Certifications">
        <ul className="flex flex-col divide-y divide-border">
          {certifications.map((cert) => (
            <li
              key={cert.name}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-3 first:pt-0 last:pb-0"
            >
              <span className="text-sm font-medium tracking-tight">
                {cert.name}
              </span>
              <span className="font-mono text-xs text-muted">
                {cert.issuer} · {cert.year}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        <ul className="flex flex-col divide-y divide-border">
          {education.map((item) => (
            <li key={item.course} className="py-3 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <span className="text-sm font-medium tracking-tight">
                  {item.course}
                </span>
                <span className="font-mono text-xs text-muted">
                  {item.period}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-muted">{item.school}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Languages">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {languages.map((language) => (
            <li key={language.name}>
              {language.name}{" "}
              <span className="font-mono text-xs text-muted">
                {language.level}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Get in touch">
        <p className="max-w-[var(--measure)] text-sm leading-relaxed text-muted text-pretty">
          Happy to talk about Power BI, Fabric, or anything else on this site.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <li>
            <EmailLink className="text-accent hover:underline" />
          </li>
          {site.social.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-accent hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14 border-t border-border pt-8">
      <h2 className="mb-6 flex items-center gap-2.5 text-xl font-semibold tracking-tight">
        <span aria-hidden="true" className="h-4 w-1 rounded-full bg-accent" />
        {title}
      </h2>
      {children}
    </section>
  );
}
