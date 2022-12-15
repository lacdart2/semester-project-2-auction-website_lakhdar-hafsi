
import { updateListing } from "../api_settings/posts/index.js"
import { listingDetail } from "../api_settings/posts/index.js"




export async function setUpdateListingFormListener() {


    const form = document.querySelector("#editListing");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");



    if (form) {
        const button = form.querySelector("button");
        button.disable = true;
        const listing = await listingDetail(id);

        form.title.value = listing.title;
        form.body.value = listing.body;
        form.tags.value = listing.tags;
        form.media.value = listing.media;

        button.disable = false;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const listing = Object.fromEntries(formData.entries())
            listing.id = id;





            // send to api :
            // in another file (api/auth/register.js)
            updateListing(listing)
        })
    }
} 