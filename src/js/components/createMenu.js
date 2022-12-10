/* import * as storage from "../utils/storage.js"; */
import { getUsername } from "../utils/storage.js";
const container = document.querySelector(".menu-container");
import * as storage from "../utils/storage.js";
/* import * as login from "../api_settings/auth/login.js";
const loggedIn = profile.email
const slicedName = loggedIn.split('@')[0]; */
/* const loggedName = storage.getFromStorage.getUsername(profile.email); */

/* import { slicedName, loggedIn } from "../api_settings/auth/login.js" */
/* import { createName } from "./createName.js" */
const userCredit = storage.getFromStorage("credit")
export default function createMenu() {
    const { pathname } = document.location;



    const username = getUsername()
    let userLogged = localStorage.getItem("profile");
    const userTag = JSON.parse(userLogged).name;
    console.log(userTag);

    let authLink = `<a href="login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a>`;

    if (username) {
        authLink = `<a href="posts.html" class="${pathname === "/posts/index.html" ? "active" : ""}">Add Post</a>
                    <span>Hi${username}</span>`;
    }
   
    container.innerHTML = `<div class="menu">
                            <div class="creditSpan">    
                                 <i class="fa-regular fa-user"></i> ${userTag} 
                                 <span class="creditMenu">${userCredit}<i class="fa-solid fa-dollar-sign"></i></span>
                            </div>
                        </div>`;
}
/* 
 <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a>
${authLink}
 */