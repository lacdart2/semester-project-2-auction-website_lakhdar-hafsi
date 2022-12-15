
import { getUsername } from "../utils/storage.js";
const menu_container = document.querySelector(".menu-container");
import * as storage from "../utils/storage.js";
const userCredit = storage.getFromStorage("credit");


export default function createMenu() {
    const { pathname } = document.location;



    const username = getUsername();
    const userAvatar = storage.getFromStorage("profile").avatar;
    console.log(userAvatar);
    let userLogged = localStorage.getItem("profile");
    const userTag = JSON.parse(userLogged).name;
    console.log(userTag);

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""} ">Login</a>`;

    if (storage.username) {
        authLink = `<a href="posts.html" class="${pathname === "/posts/index.html" ? "active" : ""}">Add listing</a>
                    <span>Hi${username}</span>`;


        menu_container.innerHTML = `<a href="/profile/detail/index.html">
                          <div class="menu ">
                               <div class="user-avatar">
                                        ${userTag} 
                                        <img class="user-avatar-img " src="${userAvatar}" alt="user avatar"/>
                                </div>
                                <div class="creditSpan ">    
                                
                                    <span class="creditMenu">${userCredit}<i class="fa-solid fa-coins"></i></span>
                                </div>
                          </div>
                       </a> `;
    }
}
/* 
 <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a>
${authLink}
 */
