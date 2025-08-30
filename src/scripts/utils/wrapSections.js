export function wrapSections(root, document) {
  const nodes = Array.from(root.childNodes);
  const newChildren = [];
  let section = null;

  nodes.forEach((node) => {
    if (node.nodeType === 1 && node.tagName === 'H2') {
      if (section) {
        newChildren.push(section);
      }
      section = document.createElement('section');
      section.appendChild(node);
    } else {
      if (section) {
        section.appendChild(node);
      } else {
        newChildren.push(node);
      }
    }
  });

  if (section) {
    newChildren.push(section);
  }

  root.replaceChildren(...newChildren);
}
