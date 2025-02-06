import Block from "./block.ts";

export const renderDom = (query: string, block: Block) => {
  const root = document.querySelector(query);

  if (root) {
    root.innerHTML = "";
    root?.appendChild(block.getContent());
  }

  return root;
};
