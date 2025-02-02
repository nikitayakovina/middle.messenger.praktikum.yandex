import Block from "../utils/block.ts";

export function renderDom(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root) {
    root.innerHTML = "";
    root?.appendChild(block.getContent());
  }

  return root;
}
