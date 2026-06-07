export default function createMenu() {
    // check if user is logged in
    const userLogged = localStorage.getItem("profile");
    if (!userLogged || userLogged === "undefined" || userLogged === "null") return;

    let profile;
    try {
        profile = JSON.parse(userLogged);
    } catch (e) {
        return;
    }

    if (!profile || !profile.name) return;

    const userTag = profile.name;
    const userAvatar = profile.avatar?.url || "";

    // credits
    const rawCredit = localStorage.getItem("credit");
    const userCredit = (rawCredit && rawCredit !== "undefined" && rawCredit !== "null")
        ? parseInt(rawCredit, 10)
        : 0;

    // hide login/register, update old logout button
    const navAuth = document.querySelector(".nav-auth");
    if (navAuth) navAuth.classList.add("d-none");

    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) logoutBtn.style.display = "none";

    // render dropdown menu
    const menu_container = document.querySelector(".menu-container");
    if (menu_container) {
        menu_container.innerHTML = `
            <div class="user-dropdown">
                <button class="user-dropdown-trigger" id="userMenuBtn">
                    ${userAvatar
                ? `<img src="${userAvatar}" alt="${userTag}" class="user-avatar-img">`
                : `<div class="user-avatar-initials">${userTag[0].toUpperCase()}</div>`
            }
                    <span class="user-name">${userTag}</span>
                    <span class="user-credits">${userCredit} <i class="fa-solid fa-coins"></i></span>
                </button>
                <div class="user-dropdown-menu" id="userDropdownMenu">
                    <a href="/profile/detail/index.html?name=${userTag}" class="dropdown-item-link">
                        <i class="fa-regular fa-user"></i> My Profile
                    </a>
                    <a href="/post/create/index.html" class="dropdown-item-link">
                        <i class="fa-solid fa-plus"></i> + Sell
                    </a>
                    <hr class="dropdown-divider-line">
                    <button class="dropdown-item-link dropdown-logout" id="logoutBtn">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
                    </button>
                </div>
            </div>`;

        // toggle dropdown
        const btn = document.getElementById("userMenuBtn");
        const menu = document.getElementById("userDropdownMenu");

        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            menu.classList.toggle("open");
        });

        // close on click outside
        document.addEventListener("click", () => {
            menu.classList.remove("open");
        });

        // logout
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.clear();
            location.href = "/index.html";
        });
    }
}