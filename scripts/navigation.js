const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    const isOpen = navMenu.classList.contains("open");
    menuButton.textContent = isOpen ? "X" : "☰";
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});
