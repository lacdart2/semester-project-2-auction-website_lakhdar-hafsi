/* import { submitBid } from "../api_settings/posts/index.js";

export function submitBidListener(bidId, finalBid) {
    const form = document.querySelector(".bid-form");

    const params = new URLSearchParams(document.location.search);
    const bidId = params.get("id");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log(event);
            const myBid = event.target.amount.value;

            const finalBid = Number(myBid)
            submitBid(bidId, finalBid);

            console.log(bidId, finalBid);
        });
    }
} */
/* submitBidListener(id, amount) */


/* import { getFromStorage } from "../utils/storage.js";
import { placeBid } from "../api_settings/posts/create.js";

const credit = getFromStorage("credit");
const accessToken = getFromStorage("token");

export function placeBidHandler(amount, id) {
    const quantity = parseInt(amount);
    //check if users account is enough to be able to send a bid

    if (quantity && quantity < credit) {
        placeBid(accessToken, quantity, id);
    } else if (!amount) {
        alert("Please enter amount");
    } else if (amount > credit) {
        alert(
            `You cannot bid higher than your current amount of credits. You have ${credit} credits`
        );
    }
} */

import { placeBid } from "../api_settings/posts/placeBid.js";

export function setAddBidListener(id, amount) {
    const form = document.querySelector(".bid-form");

    const params = new URLSearchParams(document.location.search);
    const bidId = params.get("id");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const myBid = event.target.amount.value;

            placeBid(bidId, Number(myBid));
            console.log(bidId, Number(myBid));
        });
    }
}