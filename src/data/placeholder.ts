import type { Project } from "@/data/work";

// Placeholder for every thumbnail (project cards, case-study covers, hero ring, Services, How I work)
// until the final screens arrive. Set to null to show the generated project mockups again.
export const THUMB: string | null = "/img/placeholder-phone.webp";

/** A project's thumbnail: its final mockup if supplied, else the placeholder, else the generated mockup. */
export const projectThumb = (p: Project, tall = false) =>
  p.thumb ?? THUMB ?? (tall ? p.cover.replace(/\.webp$/, "-tall.webp") : p.cover);
