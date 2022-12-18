
import { getFromStorage } from "../../utils/storage.js";
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

const action = "/listings";
const method = "POST";

export async function placeBid(id, amount) {
    const placeBidURL = `${API_AUCTION_URL}${action}/${id}/bids`;

    const response = await fetchToken(placeBidURL, {
        method,
        body: JSON.stringify({ amount: amount }),
    });

    const { userName } = await response.json();

    if (response.ok) {
        getFromStorage("profile", userName);
        location.href = `/post/detail/index.html?id=${id}`;
        return await response.json();
    } else {
        alert(
            "Your bid must be higher !"
        );
    }

    throw new Error(response);
}