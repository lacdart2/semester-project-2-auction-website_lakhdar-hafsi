
import createMenu from "./components/createMenu.js";
import * as apiCalls from "./api_settings/posts/index.js";
import * as triggers from "./handlers/index.js";
import * as ui from "./ui/index.js";
import * as profileCalls from "./api_settings/profiles/index.js"




const path = location.pathname;
console.log(path);





// profile

// landing- page 
if (path === "/index.html") {

    createMenu();
    apiCalls.readLanding()

} else if (path === "/profile/home/index.html") {

    /*   if (storage.profile) { */
    createMenu();
    /* auth.logoutListener(); */
    /*     } */
    apiCalls.readHome();

}

/* else if (path === "/profile/edit/index.html") {

    triggers.setUpdateProfileListener();
    profileCalls.updateProfile();
    createMenu();
} */
else if (path === "/profile/detail/index.html") {

    /*   triggers.setUpdateProfileListener(); */
    profileCalls.getProfile();
    createMenu();
}
// profiles 
else if (path === "/profiles/index.html") {

    profileCalls.readAllProfiles();

    createMenu();

}
// auth register
else if (path === "/profile/register/index.html") {

    triggers.setRegisterFormListener();
    ui.offerToNewUser();

}
// auth login
else if (path === "/profile/login/index.html") {

    triggers.setLoginFormListener();

}
// auth logout
/* else if (path !== registerPath && path !== loginPath) {

    auth.logout();


} */
// listings
else if (path === "/posts/index.html") {
    /*     if (storage.profile) { */
    createMenu();
    /*     } */

    apiCalls.read();
}

// listing - Create 
else if (path === "/post/create/index.html") {
    createMenu();
    /*  triggers.setCreateListingFormListener() */
    apiCalls.createListingForm();
    apiCalls.createListing();
    /*    triggers.setCreateListingListener() */


    // listing - Details 
} else if (path === "/post/detail/index.html") {
    createMenu();
    apiCalls.listingDetail();


    triggers.submitBidListener();


    // listing - Edit 
} else if (path === "/post/edit/index.html") {
    /*    createMenu();
       triggers.setUpdateListingFormListener();
       apiCalls.listingDetail(); */

}







