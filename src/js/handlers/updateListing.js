import { updateListing } from "../api_settings/posts/update.js";
import { fetchToken } from "../api_settings/fetchToken.js";
import { API_AUCTION_URL } from "../api_settings/constants.js";

export async function setUpdateListingFormListener() {
    const form = document.querySelector("#editListing");
    if (!form) return;

    const id = new URL(location.href).searchParams.get("id");
    if (!id) {
        document.querySelector(".message-container").innerHTML =
            `<div class="message warning">No listing ID found in URL.</div>`;
        return;
    }

    // pre-fill the form with existing info
    try {
        const response = await fetchToken(`${API_AUCTION_URL}/listings/${id}`);
        const json = await response.json();
        const listing = json.data;

        if (listing) {
            form.querySelector("#title").value = listing.title || "";
            form.querySelector("#description").value = listing.description || "";
            form.querySelector("#tags").value = listing.tags?.join(", ") || "";
            form.querySelector("#media").value = listing.media?.[0]?.url || "";
        }
    } catch (error) {
        console.error("prefill error:", error);
    }

    // submit handler
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = form.querySelector("#title").value.trim();
        const description = form.querySelector("#description").value.trim();
        const tagsValue = form.querySelector("#tags").value.trim();
        const mediaValue = form.querySelector("#media").value.trim();

        if (!title || !description) {
            document.querySelector(".message-container").innerHTML =
                `<div class="message warning">Title and description are required.</div>`;
            return;
        }

        // v2 media must be array of {url, alt} objects
        const media = mediaValue
            ? [{ url: mediaValue, alt: title }]
            : [];

        const tags = tagsValue
            ? tagsValue.split(",").map(t => t.trim()).filter(Boolean)
            : [];

        updateListing(id, { title, description, tags, media });
    });
}