const PROJECTS = [
  {
    title: 'Mapping Jesuit Missions in the Mississippi Valley',
    description:
      'A spatial history project layering archival records, oral histories, and cartography to explore early Jesuit missions and Indigenous collaborations.',
    type: 'faculty',
    team: 'Dr. Maria Herrera (History), Center Fellows, Missouri Historical Society',
    year: 2023,
    link: 'https://www.slu.edu/',
    tags: ['Spatial history', 'ArcGIS StoryMaps', 'Community partnerships'],
  },
  {
    title: 'Ong Archive Digital Editions',
    description:
      'Critical digital editions and TEI-encoded correspondence curated by graduate students in English and Theology.',
    type: 'student',
    team: 'Graduate Research Collaborative in English & Theology',
    year: 2022,
    link: 'https://www.slu.edu/',
    tags: ['TEI', 'Scholarly communication'],
  },
  {
    title: 'Justice & AI Ethics Studio',
    description:
      'A faculty learning community pairing computer science and philosophy courses to develop Jesuit-informed ethical frameworks for machine learning.',
    type: 'faculty',
    team: 'Dr. Angela Reed (Computer Science), Dr. Marcus Allen (Philosophy)',
    year: 2024,
    link: 'https://www.slu.edu/',
    tags: ['Ethics', 'AI', 'Pedagogy'],
  },
  {
    title: 'North St. Louis Oral Histories',
    description:
      'Community-sourced storytelling archive co-designed with neighborhood partners, featuring audio, transcripts, and interactive maps.',
    type: 'community',
    team: 'Urban Project Fellows, Northside Community Housing Inc.',
    year: 2021,
    link: 'https://www.slu.edu/',
    tags: ['Oral history', 'Audio', 'Community archive'],
  },
  {
    title: 'Jesuit Libraries Provenance Project',
    description:
      'Digital curation of marginalia and book histories from Jesuit libraries around the world with linked open data visualizations.',
    type: 'faculty',
    team: 'Dr. Kyle Roberts (History), Center for Digital Humanities Team',
    year: 2020,
    link: 'https://www.slu.edu/',
    tags: ['Linked data', 'Visualization'],
  },
  {
    title: 'Sacred Spaces Virtual Reality Lab',
    description:
      'Immersive VR reconstructions of sacred architecture co-created with Art History and Engineering students.',
    type: 'student',
    team: 'Digital Humanities Lab + Parks College Makerspace',
    year: 2024,
    link: 'https://www.slu.edu/',
    tags: ['Virtual reality', '3D modeling', 'Interdisciplinary'],
  },
];

const WHITE_PAPERS = [
  {
    title: 'Frameworks for Ethical Community Archiving',
    summary:
      'Guidance for equitable partnership models, metadata practices, and long-term access for community-centered digital collections.',
    authors: 'Monica Bradford + Ong Center Community Fellows',
    year: 2023,
    themes: ['Community archiving', 'Metadata equity'],
    link: 'https://www.slu.edu/',
  },
  {
    title: 'Designing Accessible Digital Exhibits',
    summary:
      'Accessibility heuristics, user testing protocols, and design sprints used in recent collaborations with the Saint Louis Art Museum.',
    authors: 'Lindsay Porter, UX Strategist',
    year: 2022,
    themes: ['Accessibility', 'Exhibit design'],
    link: 'https://www.slu.edu/',
  },
  {
    title: 'Jesuit Approaches to Data Feminism',
    summary:
      'A white paper aligning Jesuit pedagogical principles with data feminism methodologies for classroom and community practice.',
    authors: 'Dr. Nandita Rao (Women & Gender Studies)',
    year: 2021,
    themes: ['Data feminism', 'Pedagogy'],
    link: 'https://www.slu.edu/',
  },
  {
    title: 'Sustaining Digital Projects Beyond the Grant',
    summary:
      'Playbook for governance, infrastructure, and funding strategies to support post-grant maintenance of digital scholarship.',
    authors: 'Ong Center Project Management Collective',
    year: 2024,
    themes: ['Sustainability', 'Project management'],
    link: 'https://www.slu.edu/',
  },
];

const projectGrid = document.getElementById('project-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const whitePaperList = document.getElementById('white-paper-list');
const whitePaperSearch = document.getElementById('white-paper-search');
const navToggle = document.querySelector('.site-nav__toggle');
const navList = document.querySelector('.site-nav__list');

function createProjectCard(project) {
  const article = document.createElement('article');
  article.className = 'project-card';
  article.innerHTML = `
    <span class="project-card__tag">${project.type}</span>
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <div class="project-card__meta">
      <span>${project.team}</span>
      <span>Year: ${project.year}</span>
    </div>
    <div class="project-card__meta">
      ${project.tags.map((tag) => `<span>#${tag}</span>`).join('')}
    </div>
    <a class="project-card__link" href="${project.link}" target="_blank" rel="noopener">View project</a>
  `;
  return article;
}

function renderProjects(filter = 'all') {
  projectGrid.innerHTML = '';
  const filtered =
    filter === 'all' ? PROJECTS : PROJECTS.filter((project) => project.type === filter);

  if (!filtered.length) {
    projectGrid.innerHTML = '<p>No projects found for this category yet. Check back soon.</p>';
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

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderWhitePapers();

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveFilter(button);
      renderProjects(button.dataset.filter);
    });
  });

  if (whitePaperSearch) {
    whitePaperSearch.addEventListener('input', (event) => {
      renderWhitePapers(event.target.value);
    });
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
