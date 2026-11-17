import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (await getCollection("blogs", ({ data }) => data.draft !== true)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: "Briheet Singh Yadav — Blog",
    description:
      "Writing by Briheet Singh Yadav on systems and infrastructure: microVMs, KVM, GPUs, Rust, Go and Nix.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blogs/${post.id}/`,
      categories: post.data.tags ?? [],
    })),
    customData: "<language>en</language>",
  });
}
