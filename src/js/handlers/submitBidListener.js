import { placeBid } from "../api_settings/posts/placeBid.js";

export function submitBidListener() {
    const id = new URLSearchParams(document.location.search).get("id");
    if (!id) return;

    document.addEventListener("submit", (e) => {
        if (!e.target.classList.contains("bid-form")) return;
        e.preventDefault();

        const amount = document.getElementById("bid-input")?.value;

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            document.querySelector(".message-container").innerHTML =
                `<div class="message warning"><i class="fa-solid fa-triangle-exclamation"></i><span>Please enter a valid bid amount.</span></div>`;
            return;
        }

        placeBid(id, Number(amount));
    });
}