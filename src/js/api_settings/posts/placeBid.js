import { fetchToken } from "../fetchToken.js";
import { displayMessage } from "../../components/displayMessage.js";
import { API_AUCTION_URL } from "../constants.js";

export async function placeBid(id, amount) {
    const placeBidURL = `${API_AUCTION_URL}/listings/${id}/bids`;

    try {
        const response = await fetchToken(placeBidURL, {
            method: "POST",
            body: JSON.stringify({ amount: Number(amount) })
        });

        const json = await response.json();

        if (response.ok) {
            // fetch updated profile to get new balanc
            const profile = JSON.parse(localStorage.getItem("profile"));
            if (profile?.name) {
                const profileRes = await fetchToken(`${API_AUCTION_URL}/profiles/${profile.name}`);
                const profileJson = await profileRes.json();
                const newCredits = profileJson.data?.credits ?? 0;

                // update credits in localStorage and in navbar
                localStorage.setItem("credit", newCredits);
                const creditsEl = document.querySelector(".user-credits");
                if (creditsEl) {
                    creditsEl.innerHTML = `${newCredits} <i class="fa-solid fa-coins"></i>`;
                }
            }

            displayMessage("success", "", `Bid of ${amount} credits placed successfully!`, "", ".message-container");
            // scrollto show the message
            document.querySelector(".message-container")?.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => location.reload(), 1500);

        } else {
            const errMsg = json.errors?.[0]?.message || json.message || "Bid failed";
            displayMessage("warning", "", errMsg, "", ".message-container");
        }

    } catch (error) {
        console.error("placeBid error:", error);
        displayMessage("warning", "", "An error occurred. Please try again.", "", ".message-container");
    }
}