import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { displayMessage } from "../../components/displayMessage.js";

const action = "/listings";

export async function updateListing(id, data) {
    const updateURL = `${API_AUCTION_URL}${action}/${id}`;

    try {
        const response = await fetchToken(updateURL, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        const json = await response.json();
        console.log("updateListing response:", json);

        if (json.data?.id) {
            displayMessage("success", "", "Listing updated!", "", ".message-container");
            setTimeout(() => {
                location.href = `/post/detail/index.html?id=${id}`;
            }, 1200);
        } else {
            const errMsg = json.errors?.[0]?.message || json.message || "Update failed";
            displayMessage("warning", "", errMsg, "", ".message-container");
        }

    } catch (error) {
        console.error("updateListing error:", error);
        displayMessage("warning", "", "An error occurred.", "", ".message-container");
    }
}