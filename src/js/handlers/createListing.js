/* import { createListing } from "../api_settings/posts/create.js";


export function setCreateListingFormListener() {

    const form = document.querySelector("#createListing");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const listing = Object.fromEntries(formData.entries())
            console.log(listing);


            const action = form.action;
            const method = form.method;



            // send to api :
            // in another file (api/auth/login.js)

            form.reset();
            console.log(listing);

            createListing(listing);
        })
    }
}  */