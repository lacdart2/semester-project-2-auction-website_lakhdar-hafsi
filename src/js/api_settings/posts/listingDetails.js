import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { remaining } from "../../ui/countDown.js";
import { displayMessage } from "../../components/displayMessage.js";

const action = "/listings";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");


const getListingsURL = `${API_AUCTION_URL}${action}/${id}?_seller=true&_bids=true`;

export async function listingDetail() {
    try {
        const response = await fetchToken(getListingsURL);
        const json = await response.json();

        const listing = json.data;
        console.log("listing detail:", listing);

        if (!listing) {
            displayMessage("warning", "", "Listing not found", "", ".message-container");
            return;
        }

        const created = listing.created.split("T")[0];
        const bidsArray = listing.bids || [];
        const bidsCounter = bidsArray.length;

        // to show last highest bid
        const lastBid = bidsArray.length > 0 ? bidsArray[bidsArray.length - 1] : null;
        const lastBidAmount = lastBid ? lastBid.amount : 0;
        const lastBider = lastBid ? lastBid.bidder?.name || "none" : "none";

        // media fix- v2 returns objects {url, alt}
        const img1 = listing.media?.[0]?.url || "";
        const img2 = listing.media?.[1]?.url || "";
        const sellerAvatar = listing.seller?.avatar?.url || "";

        document.title = listing.title;

        const listingContainer = document.querySelector(".listing-container");
        const bidsContainer = document.querySelector(".bids-content");

        if (listingContainer) {
            listingContainer.innerHTML = `
                <div data-end="${listing.endsAt}" class="card">
                    <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                        <div class="card-top">
                            <h5 class="card-title">${listing.title}</h5>
                            <div class="card-details p-2">
                                <p class="description fs-6 text-dark">${listing.description || ""}</p>
                                <div class="listing-info p-2">
                                    <div class="border listing-info-top d-flex align-items-left justify-content-left">
                                        <div id="carouselExampleControls" class="carousel listing-image slide" data-bs-ride="carousel">
                                            <div class="carousel-inner">
                                                <div class="carousel-item active">
                                                    <img src="${img1}" class="" alt="${listing.title}">
                                                </div>
                                                ${img2 ? `<div class="carousel-item"><img src="${img2}" class="" alt="${listing.title}"></div>` : ""}
                                            </div>
                                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                        <div class="listing-update text-dark d-flex flex-column">
                                            <p class="bids-info">Total Bids:
                                                <a href="/" class="btn btn-light ms-2">${bidsCounter}</a>
                                            </p>
                                            <p class="bids-info">Current bid:
                                                <a href="/" class="btn btn-light ms-2">${lastBidAmount} <i class="fa-solid fa-coins ms-2"></i></a>
                                            </p>
                                            <p class="bids-info">Last Bidder:
                                                <a href="/" class="btn btn-light ms-2">@ ${lastBider}</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="border seller-info d-flex flex-row align-items-center justify-content-between my-2">
                                        <a href="/post/edit/index.html" class="btn btn-seller p-2">
                                            @ ${listing.seller?.name || "unknown"}
                                            <img class="profile-avatar" src="${sellerAvatar}" alt="seller avatar"/>
                                        </a>
                                        <button type="submit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <i class="fa-solid fa-arrow-down pe-2 pt-2"></i>
                                            See all bids (${bidsCounter})
                                        </button>
                                    </div>
                                </div>
                                <small class="mb-3">
                                    <i class="fa-solid fa-calendar-days"></i> posted: ${created}
                                </small>
                            </div>
                        </div>
                        <section id="count-down-section">
                            <div class="countdown-wrapper">
                                <div class="countdown-container">
                                    <h3>Time Left</h3>
                                    <div class="countdown" id="countdown">
                                        <div class="time"><p id="days"></p><small>days</small></div>
                                        <div class="time"><p id="hours"></p><small>hours</small></div>
                                        <div class="time"><p id="minutes"></p><small>minutes</small></div>
                                        <div class="time"><p id="seconds"></p><small>seconds</small></div>
                                    </div>
                                </div>
                            </div>
                            <div class="expired"></div>
                        </section>
                        <form class="bid-form">
                            <div class="form-group mb-3">
                                <label for="bid-input" class="py-3">Bid Now and win a great deal</label>
                                <input class="form-control" id="bid-input" placeholder="Higher than ${lastBidAmount}" type="number" name="bid">
                            </div>
                            <button type="submit" class="btn btn-primary">Place Bid</button>
                        </form>
                    </div>
                </div>`;
        }

        // display bids history
        if (bidsContainer) {
            bidsContainer.innerHTML = "";
            bidsArray.forEach(bid => {
                const bidDate = bid.created.split("T")[0];
                const bidTime = bid.created.split("T")[1]?.split(".")[0] || "";
                // v2 uses bidder.name not bidderName
                const bidderName = bid.bidder?.name || "unknown";
                bidsContainer.innerHTML += `
                    <div class="bid-row text-dark border-bottom p-2 d-flex flex-row align-items-center justify-content-between">
                        <h6>${bid.amount} <i class="fa-solid fa-coins px-2"></i> by
                            <a href="/" class="btn btn-light">@ ${bidderName}</a>
                        </h6>
                        <span class="text-dark fs-6">${bidDate} -- ${bidTime}</span>
                    </div>`;
            });
        }
        remaining(listing);

    } catch (error) {
        console.log(error);
        displayMessage("warning", "", "Failed to load listing", "", ".message-container");
    }
}