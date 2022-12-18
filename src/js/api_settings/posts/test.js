/* 
// Get the input element
const inputElement = document.querySelector('#bid-amount');

// Get the value of the input element
const bidAmount = inputElement.value;
//Once you have the bid amount, you can use the fetch function to send the bid to an API.Here is an example of how to do this:

fetch('/api/submitbid', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        bidAmount: bidAmount
    })
})
    .then(response => response.json())
    .then(data => {
        // Do something with the response data
    });

placeBid(bidAmount) {
    try {
        const response = await fetch('http://api.auction.com/bid', {
            method: 'POST',
            body: JSON.stringify({ bidAmount }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (response.status === 200) {
            console.log('Bid placed successfully');
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error(error);
    }
} */

import { loadFromStorage } from "../storage/load.js";
import { fetchSingleProfile } from "../api/profile/read.js";
import { placeBid } from "../api/feed/create.js";

// const credits = loadFromStorage("credits");
const accessToken = loadFromStorage("accessToken");
const profile = loadFromStorage("profile");

export async function handlePlaceBidSubmission(amount, id) {
    const { credits } = await fetchSingleProfile(accessToken, profile.name);

    const quantity = parseInt(amount);
    //send amount to API only if user has filled in the amount field and if the amount of credits to be sent is less than the amount of credits the user has
    //alert user if errors
    if (quantity && quantity < credits) {
        placeBid(accessToken, quantity, id);
    } else if (!amount) {
        alert("Please enter amount");
    } else if (amount > credits) {
        alert(
            `You cannot bid higher than your current amount of credits. You have ${credits} credits`
        );
    }
}

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

    const response = await fetch(
        `${API_AUCTION_URL}listings/${id}/bids`,
        options
    );
    const result = await response.json();
    const USER_FEEDBACK = document.querySelector("#feedback");

    if (response.ok) {
        displayFeedback(
            USER_FEEDBACK,
            "Good luck!",
            "Your bid was successfully placed",
            "success"
        );
        location.reload();
        return result;
    } else {
        const {
            errors: [{ message }],
        } = result;
        console.log(result);
        displayFeedback(USER_FEEDBACK, "An error occurred", message, "danger");
    }
}


/* import { getFromStorage } from "../../utils/storage.js";
import { fetchToken } from "../fetchToken";
import { displayMessage } from "../../components/displayMessage.js";
import { API_AUCTION_URL } from "../constants.js";
const credit = getFromStorage("credit");
const accessToken = getFromStorage("accessToken");
const placeBidURL = `${API_AUCTION_URL}${action}/${id}/bids`;
const messageContainer = document.querySelector("message-container");
export async function placeBid(accessToken, amount, id) {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            amount: amount,
        }),
    };

    const response = await fetchToken(
        placeBidURL,
        options
    );
    const result = await response.json();


    if (response.ok) {
        alert("well done, you bid has been placed, good luck! ");
        location.reload();
    } else {
              const {
                  
                  errors: [{ message }],
                  
              } = result;
        console.log(result);
        displayMessage("warning", "", (response.message), "", ".message-container");

    }
}



export function managePlaceBid(amount, id) {
    const amount = parseInt(amount);
    //check for user´s credit amount is sufficient to place the bid

    if (amount && amount < credit) {
        placeBid(accessToken, amount, id);
    } else if (!amount) {
        alert("you must fill in the bid´s amount");
    } else if (amount > credit) {
        alert(
            `You cannot bid higher than your current amount of credits. You have ${credit} credits`
        );
    }
} */