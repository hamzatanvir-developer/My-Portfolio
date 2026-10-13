
const hamburger = document.getElementById('hamburger-toggle');

// Replace legacy approximations with maintained brand marks from Simple Icons.
const skillLogos = {
  'JavaScript': ['javascript', 'F7DF1E'],
  'TypeScript': ['typescript', '3178C6'],
  'HTML5': ['html5', 'E34F26'],
  'CSS3 / SCSS': ['sass', 'CC6699'],
  'React.js': ['react', '61DAFB'],
  'Next.js': ['nextdotjs', 'FFFFFF'],
  'Vue.js': ['vuedotjs', '4FC08D'],
  'Tailwind CSS': ['tailwindcss', '06B6D4'],
  'Three.js': ['threedotjs', 'FFFFFF'],
  'Redux / Zustand': ['redux', '764ABC'],
  'Vercel AI SDK': ['vercel', 'FFFFFF'],
  'OpenAI API (Frontend)': ['openai', 'FFFFFF'],
  'Real-Time Streaming': ['socketdotio', 'FFFFFF'],
  'AI Code Review UI': ['githubcopilot', 'FFFFFF'],
  'Vite': ['vite', '646CFF'],
  'Git & GitHub': ['github', 'FFFFFF'],
  'Figma': ['figma', 'F24E1E'],
  'DevTools & Lighthouse': ['lighthouse', 'F44B21'],
  'REST & GraphQL APIs': ['graphql', 'E10098'],
  'Webpack & PostCSS': ['webpack', '8DD6F9'],
};

document.querySelectorAll('.skill-item').forEach(item => {
  const name = item.querySelector('.skill-name')?.textContent.trim();
  const icon = item.querySelector('.skill-icon');
  const logo = skillLogos[name];
  if (!icon || !logo) return;

  const image = document.createElement('img');
  image.src = `https://cdn.simpleicons.org/${logo[0]}/${logo[1]}`;
  image.alt = `${name} logo`;
  image.width = 42;
  image.height = 42;
  image.loading = 'lazy';
  image.decoding = 'async';
  icon.replaceChildren(image);
});

const mainNav = document.getElementById('main-nav');
const navOverlay = document.getElementById('nav-overlay');

if (hamburger && mainNav) {
  const setMenuState = isOpen => {
    mainNav.classList.toggle('nav-open', isOpen);
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));

    if (navOverlay) {
      navOverlay.classList.toggle('active', isOpen);
    }

    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const openMenu = () => {
    setMenuState(true);
    mainNav.querySelector('a')?.focus();
  };

  const closeMenu = () => {
    setMenuState(false);
  };

  hamburger.addEventListener('click', () => {
    setMenuState(!mainNav.classList.contains('nav-open'));
    if (mainNav.classList.contains('nav-open')) {
      mainNav.querySelector('a')?.focus();
    }
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('nav-open')) {
        closeMenu();
      }
    });
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mainNav.classList.contains('nav-open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (!mainNav.classList.contains('nav-open')) {
      return;
    }

    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });
}

const navIndicator = document.getElementById('nav-indicator');
// Gentle scroll-linked movement for the full-screen section titles.
const chapterPages = document.querySelectorAll('.chapter-intro');
const chapterMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let chapterFrame = 0;
const updateChapterMotion = () => {
  chapterFrame = 0;
  chapterPages.forEach(page => {
    const rect = page.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const distance = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight));
    page.style.setProperty('--chapter-drift', chapterMotion.matches ? '0px' : `${distance * 55}px`);
    page.style.setProperty('--chapter-scale', chapterMotion.matches ? '1' : String(1 - Math.abs(distance) * .06));
    page.style.setProperty('--chapter-glow', String(1 - Math.abs(distance)));
  });
};
const requestChapterMotion = () => {
  if (!chapterFrame) chapterFrame = requestAnimationFrame(updateChapterMotion);
};
window.addEventListener('scroll', requestChapterMotion, { passive: true });
window.addEventListener('resize', requestChapterMotion);
chapterMotion.addEventListener('change', requestChapterMotion);
requestChapterMotion();
// Vertical page scroll traverses the project track, then releases to Skills.
const projectsSection = document.getElementById('projects');
const projectsTrack = projectsSection?.querySelector('.projects-grid-real');
if (projectsSection && projectsTrack) {
  const stage = document.createElement('div');
  stage.className = 'projects-stage';
  const heading = projectsSection.querySelector('.section-header');
  projectsSection.append(stage);
  stage.append(heading, projectsTrack);
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let travel = 0;
  let frame = 0;

  const drawProjects = () => {
    frame = 0;
    if (!travel) return;
    const progress = Math.min(travel, Math.max(0, -projectsSection.getBoundingClientRect().top));
    projectsTrack.style.transform = `translate3d(${-progress}px, 0, 0)`;
  };
  const measureProjects = () => {
    projectsSection.classList.remove('horizontal-projects');
    projectsSection.style.height = '';
    projectsTrack.style.transform = '';
    stage.style.display = 'contents';
    travel = 0;
    if (motionPreference.matches || window.innerWidth < 700) return;
    projectsSection.style.setProperty('--project-width', `${stage.parentElement.clientWidth - parseFloat(getComputedStyle(projectsSection).paddingLeft) - parseFloat(getComputedStyle(projectsSection).paddingRight)}px`);
    stage.style.display = '';
    projectsSection.classList.add('horizontal-projects');
    const requiredHeight = heading.offsetHeight + 124 + Math.max(...Array.from(projectsTrack.children, project => project.offsetHeight));
    if (requiredHeight > window.innerHeight) {
      projectsSection.classList.remove('horizontal-projects');
      stage.style.display = 'contents';
      return;
    }
    travel = Math.max(0, projectsTrack.scrollWidth - parseFloat(projectsSection.style.getPropertyValue('--project-width')));
    projectsSection.style.height = `${window.innerHeight + travel}px`;
    drawProjects();
  };
  window.addEventListener('scroll', () => {
    if (!frame && travel) frame = requestAnimationFrame(drawProjects);
  }, { passive: true });
  window.addEventListener('resize', measureProjects);
  projectsTrack.addEventListener('focusin', event => {
    if (!travel) return;
    const project = event.target.closest('.project-card-real');
    if (!project) return;
    const sectionTop = window.scrollY + projectsSection.getBoundingClientRect().top;
    window.scrollTo({ top: sectionTop + project.offsetLeft, behavior: 'instant' });
    stage.scrollLeft = 0;
    drawProjects();
  });
  motionPreference.addEventListener('change', measureProjects);
  document.fonts.ready.then(measureProjects);
  measureProjects();
}
// A pinned vertical skills reel advances with normal page scrolling.
const skillsSection = document.getElementById('skills');
const skillsTrack = skillsSection?.querySelector('.skills-categories-grid');
if (skillsSection && skillsTrack) {
  const skillsHeading = skillsSection.querySelector('.section-header');
  const skillsStage = document.createElement('div');
  skillsStage.className = 'skills-stage';
  const skillsWindow = document.createElement('div');
  skillsWindow.className = 'skills-window';
  const skillsMarkers = document.createElement('div');
  skillsMarkers.className = 'skills-markers';
  skillsMarkers.setAttribute('role', 'group');
  skillsMarkers.setAttribute('aria-label', 'Skill categories');
  const groups = Array.from(skillsTrack.children);
  const markers = groups.map((group, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', group.querySelector('h3').textContent);
    button.addEventListener('click', () => {
      const target = Math.min(skillsTravel, group.offsetTop - groups[0].offsetTop);
      window.scrollTo({ top: window.scrollY + skillsSection.getBoundingClientRect().top + target, behavior: skillsMotion.matches ? 'instant' : 'smooth' });
    });
    skillsMarkers.append(button);
    return button;
  });
  skillsSection.append(skillsStage);
  skillsStage.append(skillsHeading, skillsWindow);
  skillsWindow.append(skillsTrack, skillsMarkers);
  const skillsMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let skillsTravel = 0;
  let panelHeight = 0;
  let skillsFrame = 0;
  const drawSkills = () => {
    skillsFrame = 0;
    if (!skillsTravel) return;
    const progress = Math.min(skillsTravel, Math.max(0, -skillsSection.getBoundingClientRect().top));
    skillsTrack.style.transform = `translate3d(0, ${-progress}px, 0)`;
    const center = progress + panelHeight / 2;
    let active = 0;
    groups.forEach((group, index) => {
      if (group.offsetTop - groups[0].offsetTop <= center) active = index;
    });
    markers.forEach((marker, index) => {
      marker.classList.toggle('active', index === active);
      marker.setAttribute('aria-pressed', String(index === active));
    });
  };
  const measureSkills = () => {
    skillsTravel = 0;
    skillsSection.classList.remove('vertical-skills');
    skillsSection.style.height = '';
    skillsTrack.style.transform = '';
    skillsStage.style.display = 'contents';
    skillsWindow.style.display = 'contents';
    if (skillsMotion.matches) return;
    skillsStage.style.display = '';
    skillsWindow.style.display = '';
    skillsSection.classList.add('vertical-skills');
    panelHeight = Math.max(120, Math.floor(window.innerHeight - skillsHeading.offsetHeight - 132));
    skillsSection.style.setProperty('--skills-panel-height', `${panelHeight}px`);
    skillsTravel = Math.max(0, skillsTrack.scrollHeight - panelHeight);
    skillsSection.style.height = `${window.innerHeight + skillsTravel}px`;
    drawSkills();
  };
  window.addEventListener('scroll', () => {
    if (!skillsFrame && skillsTravel) skillsFrame = requestAnimationFrame(drawSkills);
  }, { passive: true });
  window.addEventListener('resize', measureSkills);
  skillsTrack.addEventListener('focusin', event => {
    if (!skillsTravel) return;
    const group = event.target.closest('.skills-category-card');
    if (!group) return;
    const target = Math.min(skillsTravel, group.offsetTop - groups[0].offsetTop);
    window.scrollTo({ top: window.scrollY + skillsSection.getBoundingClientRect().top + target, behavior: 'instant' });
    skillsWindow.scrollTop = 0;
    drawSkills();
  });
  skillsMotion.addEventListener('change', measureSkills);
  document.fonts.ready.then(measureSkills);
  window.addEventListener('load', measureSkills, { once: true });
  measureSkills();
}
// Directional entrances replay on return; content stays visible without motion.
if ('IntersectionObserver' in window) {
  const entryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const entryObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entryMotion.matches) {
        entry.target.classList.remove('motion-enter');
        return;
      }
      entry.target.classList.add('motion-enter');
    });
  }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });

  const entryElements = document.querySelectorAll('.chapter-title, .hero-portrait, .hero-content > *, .section-header, .about-card-bio > *, .about-stat-card, .about-pillar, .project-card-inner, .skills-category-card, .process-card, .process-cta-banner, .testimonial-card, .footer-left > *, .contact-form-field:not(.contact-form-honeypot), .contact-form > button, .footer-bottom');
  entryElements.forEach((element, index) => {
    // The pinned reel itself supplies motion; keep every skill panel visible.
    if (element.matches('.skills-category-card') || (element.matches('.section-header') && element.closest('#skills'))) return;
    const siblings = Array.from(element.parentElement.children);
    const isHeading = element.matches('.section-header, h1, h2, h3, .subtitle');
    element.style.setProperty('--enter-x', isHeading ? '0px' : index % 2 ? '36px' : '-36px');
    element.style.setProperty('--enter-y', isHeading ? '-20px' : '12px');
    element.style.setProperty('--enter-delay', `${Math.min(siblings.indexOf(element), 3) * 55}ms`);
    entryObserver.observe(element);
  });
  entryMotion.addEventListener('change', () => {
    entryElements.forEach(element => element.classList.remove('motion-enter'));
  });
}
const navEl = document.getElementById('main-nav');

if (navIndicator && navEl) {
  const navLinks = Array.from(navEl.querySelectorAll('a:not(.btn-outline)'));
  let hoveredLink = null;

  const moveIndicator = link => {
    const navRect = navEl.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    navIndicator.style.width = `${linkRect.width}px`;
    navIndicator.style.left = `${linkRect.left - navRect.left}px`;
    navIndicator.style.top = `${linkRect.top - navRect.top}px`;
    navIndicator.classList.add('visible');
  };

  const hideIndicator = () => {
    hoveredLink = null;
    navIndicator.classList.remove('visible');
  };

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      hoveredLink = link;
      moveIndicator(link);
    });

    link.addEventListener('focusin', () => {
      hoveredLink = link;
      moveIndicator(link);
    });

    link.addEventListener('mouseleave', () => {
      if (hoveredLink === link) {
        hideIndicator();
      }
    });

    link.addEventListener('focusout', () => {
      if (hoveredLink === link) {
        hideIndicator();
      }
    });
  });

  navEl.addEventListener('mouseleave', () => {
    hideIndicator();
  });

  window.addEventListener('resize', () => {
    if (hoveredLink) {
      moveIndicator(hoveredLink);
    }
  });
}

const contactForm = document.querySelector('.contact-form');
const contactStatus = document.getElementById('contact-status');
const contactSendOverlay = document.getElementById('contact-send-overlay');

if (contactForm instanceof HTMLFormElement) {
  const recipient = contactForm.dataset.recipient || 'hello@hamza.dev';
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const nameField = contactForm.querySelector('#contact-name');

  const normalizeValue = value => String(value || '').replace(/\r/g, '').trim();
  const normalizeName = value => normalizeValue(value).replace(/\s+/g, ' ');
  const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidName = value => /^[A-Za-z][A-Za-z' -]*$/.test(value) && !/\d/.test(value);
  const sleep = duration => new Promise(resolve => window.setTimeout(resolve, duration));

  const showSuccessOverlay = () => {
    if (!contactSendOverlay) {
      return;
    }

    contactSendOverlay.classList.add('visible');
  };

  const hideSuccessOverlay = () => {
    if (!contactSendOverlay) {
      return;
    }

    contactSendOverlay.classList.remove('visible');
  };

  if (nameField instanceof HTMLInputElement) {
    nameField.addEventListener('input', () => {
      const cleanedValue = nameField.value.replace(/[^A-Za-z' -]/g, '');

      if (cleanedValue !== nameField.value) {
        nameField.value = cleanedValue;
      }
    });
  }

  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const honeypot = normalizeValue(formData.get('company'));

    if (honeypot) {
      contactForm.reset();
      if (contactStatus) {
        contactStatus.textContent = 'Thanks for reaching out.';
      }

      return;
    }

    const name = normalizeName(formData.get('name'));
    const email = normalizeValue(formData.get('email'));
    const websiteType = normalizeValue(formData.get('websiteType'));
    const message = normalizeValue(formData.get('message'));

    if (name.length < 2 || message.length < 4 || !websiteType || !isValidEmail(email) || !isValidName(name)) {
      if (contactStatus) {
        contactStatus.textContent = 'Please use a real name, valid email, select a website type, and add a short message.';
      }

      return;
    }

    const subject = `Portfolio inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Website type: ${websiteType}`,
      '',
      message,
    ].join('\n');

    if (contactStatus) {
      contactStatus.textContent = 'Sending your message...';
    }

    const submissionStart = performance.now();
    const sendPayload = new FormData();
    sendPayload.append('name', name);
    sendPayload.append('email', email);
    sendPayload.append('websiteType', websiteType);
    sendPayload.append('message', message);
    sendPayload.append('_subject', subject);
    sendPayload.append('_captcha', 'false');
    sendPayload.append('_template', 'table');

    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
    }

    showSuccessOverlay();

    const sendRequest = fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: sendPayload,
    });

    sendRequest
      .then(async response => {
        if (!response.ok) {
          throw new Error('Form delivery failed');
        }

        const elapsed = performance.now() - submissionStart;
        if (elapsed < 1500) {
          await sleep(1500 - elapsed);
        }

        if (contactStatus) {
          contactStatus.textContent = 'Message sent to your inbox.';
        }

        contactForm.reset();
      })
      .catch(() => {
        if (contactStatus) {
          contactStatus.textContent = 'Message could not be sent. Please try again or contact me using the social links.';
        }
      })
      .finally(async () => {
        const elapsed = performance.now() - submissionStart;
        if (elapsed < 1500) {
          await sleep(1500 - elapsed);
        }

        hideSuccessOverlay();

        if (submitButton instanceof HTMLButtonElement) {
          submitButton.disabled = false;
        }
      });
  });
}
