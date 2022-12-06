
import createMenu from "./components/createMenu.js";

import * as apiCalls from "./api_settings/posts/index.js";

import * as triggers from "./handlers/index.js";

import * as profileCalls from "./api_settings/profiles/index.js"



const path = location.pathname;
console.log(path);




// profile

if (path === "/profile/home/index.html") {

    createMenu();
    apiCalls.readHome();

} else if (path === "/profile/edit/index.html") {

    triggers.setUpdateProfileListener();
    profileCalls.updateProfile();
    createMenu();
}
// profiles 
else if (path === "/profiles/index.html") {
    profileCalls.readAllProfiles();
    createMenu();

}
// auth
else if (path === "/profile/register/index.html") {
    triggers.setRegisterFormListener();

} else if (path === "/profile/login/index.html") {
    triggers.setLoginFormListener();

}

// posts
else if (path === "/posts/index.html") {
    createMenu();
    apiCalls.read();
}

// post
else if (path === "/post/create/index.html") {
    createMenu();
    triggers.setCreatePostFormListener()
    apiCalls.createPost();

} else if (path === "/post/detail/index.html") {
    createMenu();
    apiCalls.postDetail();

} else if (path === "/post/edit/index.html") {
    createMenu();
    triggers.setUpdatePostFormListener();
    apiCalls.postDetail();

}







