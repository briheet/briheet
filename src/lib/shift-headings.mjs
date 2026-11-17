// Each page renders its own <h1> (the post or page title). When a markdown
// document also uses `#` headings, they would add more <h1>s, so in that case
// every heading renders one level lower (# -> <h2>, ## -> <h3>, ...).
// Documents whose headings start at `##` are left alone, so the heading order
// stays valid (no jump from <h1> to <h3>).
// The level written in the markdown is kept as an `md-hN` class, and
// global.css styles that class exactly as the original heading was styled.
// Not cached: ctx.data is not reliably per document, and the walk is cheap.
function documentShift(node, ctx) {
  let root = node;
  for (let parent = ctx.parent(root); parent; parent = ctx.parent(root)) root = parent;
  const hasH1 = (root.children ?? []).some((n) => n.type === "heading" && n.depth === 1);
  return hasH1 ? 1 : 0;
}

export const shiftHeadings = {
  name: "shift-headings",
  heading(node, ctx) {
    const original = node.depth;
    if (documentShift(node, ctx) === 1) {
      ctx.setProperty(node, "depth", Math.min(original + 1, 6));
    }
    ctx.setProperty(node, "data", {
      ...(node.data ?? {}),
      hProperties: { ...(node.data?.hProperties ?? {}), className: [`md-h${original}`] },
    });
  },
};
