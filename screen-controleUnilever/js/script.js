function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Carregar a preferência do usuário ao abrir a página
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
});
