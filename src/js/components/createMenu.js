import { getUsername } from "../utils/storage.js";
import * as storage from "../utils/storage.js";

const menu_container = document.querySelector(".menu-container");

export default function createMenu() {
    // check if user is logged in before doing anything
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
    const userCredit = localStorage.getItem("credit") || 0;

    if (menu_container) {
        menu_container.innerHTML = `
            <a href="/profile/detail/index.html">
                <div class="menu">
                    <div class="user-avatar">
                        ${userTag}
                        <img class="user-avatar-img" src="${userAvatar}" alt="user avatar"/>
                    </div>
                    <div class="creditSpan">
                        <span class="creditMenu">${userCredit}<i class="fa-solid fa-coins"></i></span>
                    </div>
                </div>
            </a>`;
    }
}