export function groupConsecutiveFiguresDOM(root, document) {
  const nodes = Array.from(root.childNodes);
  const newChildren = [];
  let buffer = [];

  nodes.forEach((node) => {
    if (node.nodeType === 1 && node.tagName === 'FIGURE') {
      buffer.push(node);
    } else {
      if (buffer.length > 1) {
        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper';
        buffer.forEach((fig) => wrapper.appendChild(fig));
        newChildren.push(wrapper);
      } else if (buffer.length === 1) {
        newChildren.push(buffer[0]);
      }
      buffer = [];
      newChildren.push(node);
    }
  });

  if (buffer.length > 1) {
    const wrapper = document.createElement('div');
    wrapper.className = 'figure-group';
    buffer.forEach((fig) => wrapper.appendChild(fig));
    newChildren.push(wrapper);
  } else if (buffer.length === 1) {
    newChildren.push(buffer[0]);
  }

  root.replaceChildren(...newChildren);
}
