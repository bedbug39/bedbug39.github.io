const themeButton = document.getElementById("theme-toggle");
const currentYear = document.getElementById("current-year");
const menuButton = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") document.body.classList.add("dark-theme");

function updateThemeButton() {
    if (!themeButton) return;
    const isDark = document.body.classList.contains("dark-theme");
    themeButton.textContent = isDark ? "Light Mode" : "Dark Mode";
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

updateThemeButton();

if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        const isDark = document.body.classList.contains("dark-theme");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateThemeButton();
    });
}

if (menuButton && primaryNav) {
    menuButton.addEventListener("click", () => {
        const open = primaryNav.classList.toggle("nav-open");
        menuButton.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("menu-open", open);
    });

    primaryNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            primaryNav.classList.remove("nav-open");
            menuButton.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        });
    });
}

if (currentYear) currentYear.textContent = new Date().getFullYear();
