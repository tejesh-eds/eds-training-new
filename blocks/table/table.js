/*
 * Table Block
 * Recreate a table
 * https://www.hlx.live/developer/block-collection/table
 */

function buildCell(rowIndex) {
  const cell = rowIndex ? document.createElement('td') : document.createElement('th');
  if (!rowIndex) cell.setAttribute('scope', 'col');
  return cell;
}

export default async function decorate(block) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const header = !block.classList.contains('no-header');
  if (header) table.append(thead);
  table.append(tbody);

  [...block.children].forEach((child, i) => {
    const row = document.createElement('tr');
    if (header && i === 0) thead.append(row);
    else tbody.append(row);
    [...child.children].forEach((col) => {
      const cell = buildCell(header ? i : i + 1);
      // Check if <p> contains an <a> tag, and move the <a> directly into the cell
      const pTag = col.querySelector('p');
      if (pTag) {
        const anchor = pTag.querySelector('a');
        if (anchor) {
          cell.appendChild(anchor); // Move the anchor tag into the cell
        } else {
          cell.textContent = pTag.textContent; // If no anchor, just add the text content
        }
      } else {
        cell.innerHTML = col.innerHTML; // Fall back to the original content if no <p> is found
      }
      row.append(cell);
    });
  });
  block.innerHTML = '';
  block.append(table);
}
