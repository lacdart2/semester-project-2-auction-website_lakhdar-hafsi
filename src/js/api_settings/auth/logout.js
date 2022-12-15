/* import { remove } from "../../utils/storage.js";
//import menu-container from "../../components/createMenu.js"
//import createMenu from "../../components/createMenu.js";
import * as storage from "../../utils/storage.js";

const logoutBtn = document.querySelector(".logout-btn");
const menu_container = document.querySelector(".menu-container");
const logStatus = document.querySelector(".logging-status");



logoutBtn.addEventListener("click", logOut)
export function logOut() {



    if (storage.profile) {
        remove("token");
        remove("profile");
        remove("credit");

        window.location.assign("/profile/login/index.html")
        menu_container.innerHTML = "";



        logStatus.innerHTML = ` <small>Your Are Logged av</small>`
    }



    console.log(error);

    return alert("There was a problem logging out");

}; */
import { remove } from "../../utils/storage.js";

import * as storage from "../../utils/storage.js";
const logoutBtn = document.querySelector(".logout-btn");
const menu_container = document.querySelector(".menu-container");
/* const logStatus = document.querySelector(".logging-status"); */

if (storage.profile) {
    logoutBtn.addEventListener("click", () => {
        console.log("working logout");
        remove("token")
        remove("profile")
        remove("credit")
        menu_container.innerHTML = "";
    })
}


/* export function logout() {
  
  // alert("you are logged out"); 
} */

/* import * as auth from "../../api/auth/index.js"; */
/* import { updateLoginVisibility } from "../../ui/auth.js"; */

export function logoutListener() {

    try {
        logout();
        /*   updateLoginVisibility() */
        location.href = "./"
    } catch {
        /*  return alert("There was a problem logging out"); */
    }
}