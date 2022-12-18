
import { getFromStorage } from "../../utils/storage.js";

import { fetchToken } from "../fetchToken.js";

import { displayMessage } from "../../components/displayMessage.js";
import { API_AUCTION_URL } from "../constants.js";


const action = "/listings";
const method = "POST";

const messageContainer = document.querySelector("message-container");

/* const userCredit = storage.getFromStorage("credit");
const userToken = storage.getFromStorage("token"); */
const params = new URLSearchParams(document.location.search);
const bidId = params.get("id");

const placeBidURL = `${API_AUCTION_URL}${action}/${id}/bids`;

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputElement = document.getElementById("bid-input");
    const bidValue = inputElement.value;
    // Place the bid using the bidValue
    placeBid(listingId, bidValue)
});


const formElement = document.querySelector("bid-form");


export async function placeBid(accessToken, quantity, id) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            amount: quantity,
        }),
    };

    const response = await fetchToken(
        `${API_AUCTION_URL}listings/${id}/bids`,
        options
    );
    const result = await response.json();


    if (response.ok) {
        displayMessage("success", "bit successfully place", ".message-container");
        location.reload();
        return result;
    } else {

        console.log(result);
        displayMessage("error", result.errors[0].message, ".message-container");
    }
}