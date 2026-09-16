import { EmailLink } from "@/components/email-link";
import { PageShell } from "@/components/page-shell";
import { site } from "@/lib/site";

export const metadata = {
  title: "Get in touch",
  description:
    "Available for freelance and contract work in Power BI, Microsoft Fabric, Databricks and data engineering.",
};

const services = [
  "Power BI reports and semantic models: DAX, Power Query, row-level security, data modelling",
  "Microsoft Fabric: lakehouse and warehouse builds, data pipelines, deployment pipelines, data governance",
  "Data engineering: SQL, Python, PySpark, Spark SQL, KQL, ETL/ELT",
  "Cleaning up an existing report or model that has grown unmanageable",
];

export default function GetInTouchPage() {
  return (
    <PageShell
      title="Get in touch"
      intro="Freelance and contract work in Power BI, Microsoft Fabric, Databricks and data engineering."
    >
      <div className="prose">
        <p>
          I take on freelance and contract projects, usually a few hours a
          week or as a short, scoped engagement. If you need a dashboard
          built, a pipeline sorted out, or a model that finally makes sense,
          that&apos;s the kind of work I take on.
        </p>
        <p>Where I can help:</p>
        <ul>
          {services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
        <p>
          Tell me a bit about the project and I&apos;ll get back to you
          within a couple of days.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <EmailLink className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90" />
        {site.social.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
          >
            {link.label}
          </a>
        ))}
      </div>
    </PageShell>
  );
}
