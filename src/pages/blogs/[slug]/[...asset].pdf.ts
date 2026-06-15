import type { APIRoute } from "astro";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const blogsDirectory = path.join(process.cwd(), "src", "blogs");
const pdfExtension = ".pdf";

const walkFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith("."))
      .map(async (entry) => {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
          return walkFiles(entryPath);
        }

        return [entryPath];
      }),
  );

  return files.flat();
};

export async function getStaticPaths() {
  const postDirectories = await readdir(blogsDirectory, { withFileTypes: true });
  const paths = await Promise.all(
    postDirectories
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
      .map(async (entry) => {
        const postDirectory = path.join(blogsDirectory, entry.name);
        const files = await walkFiles(postDirectory);

        return files
          .filter((filePath) => filePath.toLowerCase().endsWith(pdfExtension))
          .map((filePath) => {
            const relativePath = path.relative(postDirectory, filePath).split(path.sep).join("/");

            return {
              params: {
                slug: entry.name,
                asset: relativePath.slice(0, -pdfExtension.length),
              },
              props: { filePath },
            };
          });
      }),
  );

  return paths.flat();
}

export const GET: APIRoute = async ({ props }) => {
  const filePath = props.filePath as string;
  const file = await readFile(filePath);

  return new Response(file, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
};
