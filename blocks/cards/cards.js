import { createOptimizedPicture, fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders('');
  const { clickHereForMore, clickHereForLess } = placeholders;
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
        const paragraphs = div.querySelectorAll('p');
        if (paragraphs.length > 1) {
          const secondParagraph = paragraphs[1];
          // Initially show the second paragraph with ellipsis (CSS should already be handling this)
          secondParagraph.classList.add('truncated'); // Apply CSS class for ellipsis
          // Target the existing anchor tag in the HTML
          const placeholderLink = div.querySelector('a.button');
          if (placeholderLink) {
            // Set initial text for the button if not already set
            placeholderLink.innerText = clickHereForMore || 'Click here for more';
            // Modify the href attribute to prevent navigation
            placeholderLink.href = '#';
            // Add the click event listener to toggle content
            placeholderLink.addEventListener('click', (e) => {
              e.preventDefault(); // Prevent default anchor behavior
              // Toggle between showing full content and truncating with ellipsis
              if (secondParagraph.classList.contains('truncated')) {
                secondParagraph.classList.remove('truncated');
                secondParagraph.style.display = 'block';
                placeholderLink.innerText = clickHereForLess || 'Click here for less'; // Change to "Click here for less"
              } else {
                secondParagraph.classList.add('truncated');
                placeholderLink.innerText = clickHereForMore || 'Click here for more'; // Revert to "Click here for more"
              }
            });
          }
        }
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
