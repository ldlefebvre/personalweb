import type { ImageMetadata } from "astro";

/*
  Lazy resolver for project imagery living in src/assets/images/project.
  Lazy (non-eager) so Astro only optimizes + emits images we actually render.
  Usage (in .astro frontmatter, which can await):
    const img = await projectImage("sensium/iphone/store_01_train_home.png");
*/
const importers = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/project/**/*.{png,jpg,jpeg,webp,JPG,PNG}",
);

const BASE = "/src/assets/images/project/";

export async function projectImage(path: string): Promise<ImageMetadata> {
  const importer = importers[BASE + path];
  if (!importer) {
    throw new Error(`[projectImage] not found: ${path}`);
  }
  const mod = await importer();
  return mod.default;
}

export async function projectImages(paths: string[]): Promise<ImageMetadata[]> {
  return Promise.all(paths.map((p) => projectImage(p)));
}
