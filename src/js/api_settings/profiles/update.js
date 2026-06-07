import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { displayMessage } from "../../components/displayMessage.js";

export async function updateProfile(name, data) {
    const updateURL = `${API_AUCTION_URL}/profiles/${name}`;

    try {
        const response = await fetchToken(updateURL, {
            method: "PUT",
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (response.ok) {
            // update the avatar in localStorage
            const profile = JSON.parse(localStorage.getItem("profile"));
            if (profile) {
                if (data.avatar) profile.avatar = data.avatar;
                if (data.banner) profile.banner = data.banner;
                localStorage.setItem("profile", JSON.stringify(profile));
            }
            displayMessage("success", "", "Profile updated!", "", ".message-container");
            setTimeout(() => {
                location.href = `/profile/detail/index.html?name=${name}`;
            }, 1200);
        } else {
            const errMsg = json.errors?.[0]?.message || "Update failed";
            displayMessage("warning", "", errMsg, "", ".message-container");
        }

    } catch (error) {
        console.error("updateProfile error:", error);
        displayMessage("warning", "", "An error occurred.", "", ".message-container");
    }
}