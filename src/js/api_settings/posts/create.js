
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { displayMessage } from "../../components/displayMessage.js";
const message = document.querySelector(".message-container");
import { displayMessage } from "../../components/displayMessage.js";




// collect data from form :
// to avoid error : cannot read property of null, reading : addEventListener
/* window.onload = function () { */


const newListingFrom = document.querySelector(".createListingForm");
const title = document.querySelector(".title");
const startPrice = document.querySelector(".price");
const description = document.querySelector(".description");
const endDate = document.querySelector(".bidEndDate");
const tags = document.querySelector(".tags");
const image = document.querySelector(".media");



/*     if (newListingFrom) { */


newListingFrom.addEventListener("submit", createListingForm);

/*   } */
export function createListingForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const startPriceValue = parseFloat(startPrice.value);
    const descriptionValue = description.value.trim();
    const bidEndDateValue = endDate.value.trim();
    const tagsValue = tags.value.trim();
    const imageValue = image.value;
    const tagsArray = tagsValue.split(",");
    const imageUrlArray = imageValue.split(",");

    /*  const imageArray = imageUrlArray.push()[0]; */


    if (imageUrlArray.length === 0) {
        imageUrlArray === null;
    }
    // grab correct image path 

    console.log(imageUrlArray[0], tagsValue, titleValue, startPriceValue, descriptionValue, bidEndDateValue);


    console.log("priceValue", startPriceValue);

    if (titleValue.length === 0 || startPriceValue.length === 0 || isNaN(startPriceValue) || descriptionValue.length === 0 || bidEndDateValue.length === 0 || tagsArray.length === 0) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    createListing(titleValue, startPriceValue, descriptionValue, bidEndDateValue, tagsArray, imageUrlArray);
}
// END collect data from form 
// async function :

const action = "/listings";
const method = "POST";

export async function createListing(title, startPrice, description, endDate, tags, image) {

    const createListingURL = API_AUCTION_URL + action;

    const data = JSON.stringify({
        title: title,
        startPrice: startPrice,
        description: description,
        endsAt: endDate,
        tags: tags,
        media: image
    });



    const options = {
        method: method,
        body: data,

    };

    try {
        const response = await fetchToken(createListingURL, options);
        const json = await response.json();
        console.log(json);

        if (json.created) {
            displayMessage("success", "", "listing created", "", ".message-container");

            (json.id).storage.saveToStorage("myId", id);
            console.log(json.id);
            newListingFrom.reset();

        }

        if (json.error) {
            displayMessage("error", "", json.message, " ", ".message-container");
        }

        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", "An error occurred", ".message-container");
    }
}

createListingForm();



/* } */

