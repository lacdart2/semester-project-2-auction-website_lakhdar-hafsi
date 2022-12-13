/* import { listingDetail } from "../posts/listingDetails.js";



import { API_AUCTION_URL } from "../constants.js";
import * as storage from "../../utils/storage.js";

const fetchToken = storage.getFromStorage("token");
const profile = storage.getFromStorage("profile");

const method = "POST";
const action = "/listings"

const BidURL = `${API_AUCTION_URL}${action}/${id}/bids?_seller=true&_bids=true`;




bidBtn.addEventListener("click", createBid);



export function createBid(event) {
    event.preventDefault();


    const bidBtn = document.querySelector(".bid-btn");
    const bidInput = document.querySelector(".bid-input");
    const currentBid = lastBid[0].amount;
    console.log(currentBid + "SOUK AHRAS MAN");
    const userCredit = storage.getFromStorage("credit");




    const bidValue = parseFloat(bidInput.value);
    console.log("souk ahras " + bidValue);
    // check that amount is greater than current bid
    if (bidValue <= currentBid) {
        alert("Your bid must be higher than the current bid");
        return;
    }
    if (currentBid && bidValue.length === 0 && isNaN(bidValue)) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }
    placeBid(amount);
}


export async function placeBid(amount) {


    const data = JSON.stringify({
        amount: bidValue,
    });
    const options = {
        method: method,
        body: data,

    };
    try {
        const response = await fetchToken(BidURL, options);
        const jsonBid = await response.json();
        console.log(jsonBid);

        if (jsonBid) {
            // update current bid
            console.log(jsonBid.bids)
            currentBid = amount;
            displayMessage("success", "", "Product created", "", ".message-container");

            // (json.id).storage.saveToStorage("myId", id);
            console.log(jsonBid.id);
            bidInput.clear();

        }

        if (jsonBid.error) {
            displayMessage("error", "", jsonBid.message, "", ".message-container");
        }

        console.log(jsonBid);
    } catch (error) {
        console.log(error);
        displayMessage("error", "An error occurred", ".message-container");
    }

} */
    // check that the user is logged in
/*   if (!loggedIn) {
      alert("Please log in to place a bid");
      return;
  } */






    // send bid to server
    //listingDetails(amount);