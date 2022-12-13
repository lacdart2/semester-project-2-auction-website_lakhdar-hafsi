/* import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

const action = "/posts";
const method = "delete";

export async function deleteListing(id) {

    if (!id) {
        alert("update needs an ID");
    }
    const updateListingURL = `${API_AUCTION_URL}${action}/${id}`;


    const response = await fetchToken(updateListingURL, {
        method,

    })

    return await response.json();
}
 */
