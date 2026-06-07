import createMenu from "./components/createMenu.js";
import * as apiCalls from "./api_settings/posts/index.js";
import * as triggers from "./handlers/index.js";
import * as ui from "./ui/index.js";
import * as profileCalls from "./api_settings/profiles/index.js";

const path = location.pathname;


// landing page
if (path === "/index.html" || path === "/") {
    createMenu();
    apiCalls.readLanding();

    // profile home
} else if (path === "/profile/home/index.html") {
    createMenu();
    apiCalls.readHome();

    // profile detail
} else if (path === "/profile/detail/index.html") {
    createMenu();
    profileCalls.getProfile();

    // all profiles
} else if (path === "/profiles/index.html") {
    createMenu();
    profileCalls.readAllProfiles();

    // auth - register
} else if (path === "/profile/register/index.html") {
    triggers.setRegisterFormListener();
    ui.offerToNewUser();

    // auth - login
} else if (path === "/profile/login/index.html") {
    triggers.setLoginFormListener();

    // listings browse
} else if (path === "/posts/index.html") {
    createMenu();
    apiCalls.read();

    // listing - create
} else if (path === "/post/create/index.html") {
    createMenu();
    triggers.setCreateListingFormListener();

    // listing - detail
} else if (path === "/post/detail/index.html") {
    createMenu();
    apiCalls.listingDetail();
    triggers.submitBidListener();

    // listing - edit
} else if (path === "/post/edit/index.html") {
    createMenu();
    triggers.setUpdateListingFormListener();
}