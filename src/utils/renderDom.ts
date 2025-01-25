import Block from "../utils/block";

export function renderDom(query: string, block: Block) {
    const root = document.querySelector(query);
    // @ts-ignore
    root.innerHTML = '';
    root?.appendChild(block.getContent())
  
    return root;
}