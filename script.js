
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  // Theme
  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemDark ? "dark" : "light");
  root.setAttribute("data-theme", initialTheme);

  const updateThemeIcon = () => {
    if (!themeToggle) return;
    themeToggle.textContent = root.getAttribute("data-theme") === "dark" ? "☀" : "☾";
    themeToggle.setAttribute(
      "aria-label",
      root.getAttribute("data-theme") === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  };

  updateThemeIcon();

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
    updateThemeIcon();
  });

  // Mobile nav
  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks?.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Scrollspy / active section in top-right nav
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll('.nav-links a[data-section]')];

  const setActive = (id) => {
    links.forEach(link => {
      link.classList.toggle("active", link.dataset.section === id);
    });
  };

  const observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length) setActive(visible[0].target.id);
    },
    {
      rootMargin: "-24% 0px -58% 0px",
      threshold: [0.05, 0.2, 0.5, 0.8]
    }
  );

  sections.forEach(section => observer.observe(section));

  // Keep the active state correct near the bottom of the page.
  // CV is the final section, so when the user reaches the page bottom, CV should be active.
  window.addEventListener("scroll", () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 4) {
      const lastSection = sections[sections.length - 1];
      if (lastSection) setActive(lastSection.id);
    }
  }, { passive: true });
});


document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.dataset.target);
      if (!panel) return;

      const opening = panel.hidden;
      panel.hidden = !opening;
      button.textContent = opening ? "Close" : "Design";
      button.setAttribute("aria-expanded", String(opening));
    });
  });
});
