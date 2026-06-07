import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { displayMessage } from "../../components/displayMessage.js";

export async function deleteListing(id) {
    const deleteURL = `${API_AUCTION_URL}/listings/${id}`;

    try {
        const response = await fetchToken(deleteURL, { method: "DELETE" });

        if (response.ok) {
            displayMessage("success", "", "Listing deleted.", "", ".message-container");
            setTimeout(() => { location.href = "/posts/index.html"; }, 1200);
        } else {
            const json = await response.json();
            const errMsg = json.errors?.[0]?.message || "Delete failed";
            displayMessage("warning", "", errMsg, "", ".message-container");
        }

    } catch (error) {
        console.error("deleteListing error:", error);
        displayMessage("warning", "", "An error occurred.", "", ".message-container");
    }
}