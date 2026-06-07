import { createListingForm } from "../api_settings/posts/create.js";

/**
 * Attaches submit listener to the create listing form.
 * Called from index.js on the create listing page.
 */
export function setCreateListingFormListener() {
    const form = document.querySelector(".createListingForm");
    if (form) {
        form.addEventListener("submit", createListingForm);
    }
}