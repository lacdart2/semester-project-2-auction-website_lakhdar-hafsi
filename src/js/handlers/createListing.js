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

/* 
import { createListing } from "../api_settings/posts/create.js";

export function setCreateListingListener() {
    const form = document.querySelector("#createListingForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const form = event.target;
            const formData = new FormData(form);

            const title = formData.get("title");
            const description = formData.get("description");
            const tags = formData.get("tags").split(", ");
            const endsAt = new Date(formData.get("endsAt"));
            const media = formData.get("media").split(", ");
            const post = { title, description, tags, media, endsAt };
            
                        if (!media.value || media.value === [] || media.length === 0 || media.value === "") {
                             delete post.media;
                            alert("no media");
                        }

            createListing(post);
        });
    }
} */