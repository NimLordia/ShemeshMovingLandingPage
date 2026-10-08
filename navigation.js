'use strict';

// Fragment navigation keeps visitors on their campaign URL, including its
// original advertising query parameters. All content is available without JS.
const panels = Array.from(document.querySelectorAll('[data-panel]'));
const panelLinks = Array.from(document.querySelectorAll('[data-panel-link]'));

function showPanel() {
  const requestedPanel = window.location.hash.slice(1);
  // The skip link moves focus to the current main content, without switching
  // the visitor back to the home panel.
  if (requestedPanel === 'main' && panels.some((panel) => panel.hidden)) return;
  const activePanel = panels.find((panel) => panel.id === requestedPanel) || panels[0];
  panels.forEach((panel) => { panel.hidden = panel !== activePanel; });
  panelLinks.forEach((link) => {
    if (link.dataset.panelLink === activePanel.id) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

window.addEventListener('hashchange', showPanel);
showPanel();
