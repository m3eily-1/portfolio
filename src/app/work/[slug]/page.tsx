import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import CaseStudy from "@/components/CaseStudy";
import { projects, getProject } from "@/data/work";
import "@/styles/case.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: `${p.name} — Ahmed Mealy`, description: p.summary } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  return (
    <>
      <Header />
      <CaseStudy slug={slug} />
    </>
  );
}
