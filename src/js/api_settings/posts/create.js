import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { displayMessage } from "../../components/displayMessage.js";

const action = "/listings";

/**
 * Collects form data and triggers createListing API call.
 * Attached to the create listing form submit event.
 */
export function createListingForm(event) {
    event.preventDefault();

    const form = event.target;
    const titleValue = form.querySelector(".title")?.value.trim();
    const descriptionValue = form.querySelector(".description")?.value.trim();
    const tagsValue = form.querySelector(".tags")?.value.trim();
    const imageValue = form.querySelector(".media")?.value.trim();
    const endDateValue = form.querySelector(".bidEndDate")?.value.trim();

    if (!titleValue || !descriptionValue || !endDateValue) {
        displayMessage("warning", "", "Please fill in title, description and end date", "", ".message-container");
        return;
    }

    // v2 media must be array of {url, alt} objects
    const mediaArray = imageValue
        ? imageValue.split(",").map(url => ({ url: url.trim(), alt: titleValue }))
        : [];

    const tagsArray = tagsValue
        ? tagsValue.split(",").map(t => t.trim()).filter(Boolean)
        : [];

    createListing(titleValue, descriptionValue, endDateValue, tagsArray, mediaArray);
}

/**
 * Sends POST request to create a new listing.
 * @param {string} title
 * @param {string} description
 * @param {string} endsAt - ISO date string
 * @param {string[]} tags
 * @param {Array<{url: string, alt: string}>} media
 */
export async function createListing(title, description, endsAt, tags, media) {
    const createListingURL = API_AUCTION_URL + action;

    const body = JSON.stringify({ title, description, endsAt, tags, media });

    try {
        const response = await fetchToken(createListingURL, {
            method: "POST",
            body
        });
        const json = await response.json();
        console.log("create listing response:", json);

        if (json.data?.id) {
            displayMessage("success", "", "Listing created successfully!", "", ".message-container");
            document.querySelector(".createListingForm")?.reset();
            // redirect to listing detail after short delay
            setTimeout(() => {
                location.href = `/post/detail/index.html?id=${json.data.id}`;
            }, 1500);
        } else {
            const errMsg = json.errors?.[0]?.message || json.message || "Failed to create listing";
            displayMessage("warning", "", errMsg, "", ".message-container");
        }

    } catch (error) {
        console.error("createListing error:", error);
        displayMessage("warning", "", "An error occurred. Please try again.", "", ".message-container");
    }
}