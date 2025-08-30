import { JSDOM } from 'jsdom';
import { groupConsecutiveFiguresDOM } from './groupConsecutiveFigures.js';
import { wrapSections } from './wrapSections.js';

export function transformHtml(htmlString) {
  const dom = new JSDOM(`<div id="root">${htmlString}</div>`);
  const document = dom.window.document;
  const root = document.getElementById('root');

  // 順番に変換処理を適用
  groupConsecutiveFiguresDOM(root, document);
  wrapSections(root, document);

  return root.innerHTML;
}
