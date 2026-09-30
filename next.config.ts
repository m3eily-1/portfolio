import type { NextConfig } from "next";

/**
 * GitHub Pages serves static files from `/<repo>/`. `npm run build:pages`
 * sets these two env vars; local dev and any Next-capable host are unaffected.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(staticExport ? { output: "export" as const, trailingSlash: true, images: { unoptimized: true } } : {}),
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
