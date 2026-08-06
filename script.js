const themeButton = document.getElementById("theme-toggle");

// Read the previously saved theme
const savedTheme = localStorage.getItem("theme");

// Apply the saved theme when the page loads
if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
}

// Update the button text
function updateThemeButton() {
    if (!themeButton) {
        return;
    }

    const darkModeIsActive =
        document.body.classList.contains("dark-theme");

    themeButton.textContent = darkModeIsActive
        ? "Light Mode"
        : "Dark Mode";
}

updateThemeButton();

// Change and save the theme when the button is clicked
if (themeButton) {
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");

        const darkModeIsActive =
            document.body.classList.contains("dark-theme");

        localStorage.setItem(
            "theme",
            darkModeIsActive ? "dark" : "light"
        );

        updateThemeButton();
    });
}