const PROJECT_DATA_DIRECTORY = 'assets/data/projects/';
const PROJECT_FILENAME_PREFIX = 'project-';
const PROJECT_FILENAME_EXTENSION = '.json';
const PROJECT_MAX_INDEX = 200;
const PROJECT_MAX_MISSES = 5;

const WHITE_PAPERS = [];

let projectData = [];
let activeProjectFilter = 'all';

const projectGrid = document.getElementById('project-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const whitePaperList = document.getElementById('white-paper-list');
const whitePaperSearch = document.getElementById('white-paper-search');
const navToggle = document.querySelector('.site-nav__toggle');
const navList = document.querySelector('.site-nav__list');

function createProjectCard(project) {
  const article = document.createElement('article');
  article.className = 'project-card';
  const tags = Array.isArray(project.tags) ? project.tags : [];
  article.innerHTML = `
    <span class="project-card__tag">${project.type}</span>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-card__meta">
      <span>${project.team}</span>
      <span>Year: ${project.year}</span>
    </div>
    <div class="project-card__meta">
      ${tags.map((tag) => `<span>#${tag}</span>`).join('')}
    </div>
    <a class="project-card__link" href="${project.link}" target="_blank" rel="noopener">View project</a>
  `;
  return article;
}

function renderProjects(filter = activeProjectFilter) {
  projectGrid.innerHTML = '';
  const filtered =
    filter === 'all' ? projectData : projectData.filter((project) => project.type === filter);

  if (!filtered.length) {
    projectGrid.innerHTML =
      '<p>No projects found for this category yet. Add a new project JSON file to the data directory to feature it here.</p>';
    return;
  }

  filtered.forEach((project) => {
    projectGrid.appendChild(createProjectCard(project));
  });
}

function createWhitePaperItem(paper) {
  const article = document.createElement('article');
  article.className = 'white-paper';
  article.innerHTML = `
    <h3>${paper.title}</h3>
    <p>${paper.summary}</p>
    <div class="white-paper__meta">
      <span>${paper.authors}</span>
      <span>${paper.year}</span>
      <span>${paper.themes.join(', ')}</span>
    </div>
    <div class="white-paper__actions">
      <a class="white-paper__link" href="${paper.link}" target="_blank" rel="noopener">Download PDF</a>
    </div>
  `;
  return article;
}

function renderWhitePapers(term = '') {
  whitePaperList.innerHTML = '';
  if (!WHITE_PAPERS.length) {
    whitePaperList.innerHTML =
      '<p>White papers will be posted here as they become available.</p>';
    return;
  }
  const normalized = term.trim().toLowerCase();

  const filtered = WHITE_PAPERS.filter((paper) => {
    const haystack = [paper.title, paper.summary, paper.authors, paper.themes.join(' ')].join(' ');
    return haystack.toLowerCase().includes(normalized);
  });

  if (!filtered.length) {
    whitePaperList.innerHTML = '<p>No white papers match your search. Try another keyword.</p>';
    return;
  }

  filtered.forEach((paper) => {
    whitePaperList.appendChild(createWhitePaperItem(paper));
  });
}

function setActiveFilter(target) {
  filterButtons.forEach((button) => button.classList.remove('is-active'));
  target.classList.add('is-active');
  activeProjectFilter = target.dataset.filter || 'all';
}

function toggleNavigation() {
  const isOpen = navList.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

function closeNavigationOnLinkClick(event) {
  if (event.target.tagName === 'A' && navList.classList.contains('is-open')) {
    navList.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
}

async function loadProjectData() {
  const projects = [];
  let misses = 0;

  for (let index = 1; index <= PROJECT_MAX_INDEX && misses < PROJECT_MAX_MISSES; index += 1) {
    const paddedIndex = index.toString().padStart(2, '0');
    const url = `${PROJECT_DATA_DIRECTORY}${PROJECT_FILENAME_PREFIX}${paddedIndex}${PROJECT_FILENAME_EXTENSION}`;

    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        misses += 1;
        continue;
      }

      const data = await response.json();

      if (data && data.title) {
        projects.push(data);
        misses = 0;
      }
    } catch (error) {
      misses += 1;
    }
  }

  return projects;
}

async function initializeProjects() {
  if (!projectGrid) {
    return;
  }

  projectGrid.innerHTML = '<p>Loading projects…</p>';
  projectData = await loadProjectData();

  if (!projectData.length) {
    projectGrid.innerHTML =
      '<p>No projects are published yet. Add JSON files to <code>assets/data/projects</code> to feature them here.</p>';
    return;
  }

  renderProjects();
}

document.addEventListener('DOMContentLoaded', () => {
  initializeProjects();
  renderWhitePapers();

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveFilter(button);
      renderProjects(button.dataset.filter);
    });
  });

  if (whitePaperSearch && WHITE_PAPERS.length) {
    whitePaperSearch.addEventListener('input', (event) => {
      renderWhitePapers(event.target.value);
    });
  } else if (whitePaperSearch) {
    whitePaperSearch.setAttribute('disabled', 'true');
    whitePaperSearch.setAttribute('aria-disabled', 'true');
    whitePaperSearch.setAttribute('placeholder', 'White papers coming soon');
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleNavigation);
  }

  if (navList) {
    navList.addEventListener('click', closeNavigationOnLinkClick);
  }

  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        form.reset();
        const confirmation = document.createElement('p');
        confirmation.className = 'form__confirmation';
        confirmation.textContent = 'Thank you for subscribing! We will be in touch soon.';
        form.appendChild(confirmation);
        setTimeout(() => confirmation.remove(), 4000);
      }
    });
  }

  const yearElement = document.getElementById('copyright-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
