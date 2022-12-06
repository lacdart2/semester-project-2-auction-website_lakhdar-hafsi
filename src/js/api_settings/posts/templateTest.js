/* import { API_SOCIAL_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import displayMessage from "../../components/displayMessage.js";





const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const action = "/posts";
const postUrl = `${API_SOCIAL_URL}${action}/${id}`;

const form = document.querySelector("#editPost");
const title = document.querySelector("#title");
const body = document.querySelector("#body");
const tags = document.querySelector("#tags");
const idInput = document.querySelector("#id");
//const message = document.querySelector(".message-container"); 


(async function () {
    try {
        const response = await fetch(postUrl);
        const details = await response.json();

        title.value = details.title;
        body.value = details.body;
        tags.value = details.tags;
        idInput.value = details.id;

        console.log(details);
    } catch (error) {
        console.log(error);
    }
})();

form.addEventListener("submit", setUpdatePostFormListener);

function setUpdatePostFormListener(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const bodyValue = (body.value);
    const tagsValue = tags.value.trim();
    const idValue = idInput.value;

    if (titleValue.length === 0 || bodyValue.length === 0 || isNaN(bodyValue) || tagsValue.length === 0) {
        return alert("please supply proper values"); displayMessage("warning", "Please supply proper values", ".message-container");
    }

    updatePost(titleValue, bodyValue, tagsValue, idValue);
}

async function updatePost(title, body, tags, id) {
    const url = API_SOCIAL_URL + "posts/" + id;
    const data = JSON.stringify({ title: title, body: body, tags: tags });

    const token = fetchToken();

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if (json.updated_at) {
            displayMessage("success", "Product updated", ".message-container");
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    } catch (error) {
        console.log(error);
    }
}
 */