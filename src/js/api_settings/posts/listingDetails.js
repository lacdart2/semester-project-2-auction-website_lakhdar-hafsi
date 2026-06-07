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

        if (!listing) {
            displayMessage("warning", "", "Listing not found", "", ".message-container");
            return;
        }

        const created = listing.created.split("T")[0];
        const endsAt = listing.endsAt.split("T")[0];
        const bidsArray = listing.bids || [];
        const bidsCounter = bidsArray.length;

        const lastBid = bidsArray.length > 0 ? bidsArray[bidsArray.length - 1] : null;
        const lastBidAmount = lastBid ? lastBid.amount : 0;
        const lastBidder = lastBid ? lastBid.bidder?.name || "none" : "none";

        const img1 = listing.media?.[0]?.url || "";
        const img2 = listing.media?.[1]?.url || "";
        const sellerAvatar = listing.seller?.avatar?.url || "";
        const sellerName = listing.seller?.name || "unknown";

        document.title = `${listing.title} — Bidly`;

        const listingContainer = document.querySelector(".listing-container");
        const bidsContainer = document.querySelector(".bids-content");

        if (listingContainer) {
            listingContainer.innerHTML = `
                <div class="detail-grid" data-end="${listing.endsAt}">
                    <!-- image -->
                        <div class="detail-img-col">
                            <div id="carouselDetail" class="carousel slide" data-bs-ride="carousel" style="max-width:100%;width:100%">
                                <div class="carousel-inner" style="border-radius:8px;overflow:hidden">
                                <div class="carousel-item active">
                                    <img src="${img1}" alt="${listing.title}" class="detail-img">
                                </div>
                                ${img2 ? `<div class="carousel-item"><img src="${img2}" alt="${listing.title}" class="detail-img"></div>` : ""}
                            </div>
                            ${img2 ? `
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselDetail" data-bs-slide="prev" style="width:40px">
                                <span class="carousel-control-prev-icon"></span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselDetail" data-bs-slide="next" style="width:40px">
                                <span class="carousel-control-next-icon"></span>
                            </button>` : ""}
                        </div>
                    </div>

                    <!-- info -->
                    <div class="detail-info">
                        <h1 class="detail-title">${listing.title}</h1>
                        <p class="detail-desc">${listing.description || "No description provided."}</p>

                        <div class="detail-meta">
                            <div class="meta-row">
                                <span class="meta-label">Current Bid</span>
                                <span class="meta-value">${lastBidAmount} credits</span>
                            </div>
                            <div class="meta-row">
                                <span class="meta-label">Total Bids</span>
                                <span class="meta-value">${bidsCounter}</span>
                            </div>
                            <div class="meta-row">
                                <span class="meta-label">Last Bidder</span>
                                <span class="meta-value accent">@${lastBidder}</span>
                            </div>
                            <div class="meta-row">
                                <span class="meta-label">Ends</span>
                                <span class="meta-value">${endsAt}</span>
                            </div>
                            <div class="meta-row">
                                <span class="meta-label">Posted</span>
                                <span class="meta-value">${created}</span>
                            </div>
                        </div>

                        <div class="detail-seller">
                            ${sellerAvatar ? `<img src="${sellerAvatar}" alt="${sellerName}" class="seller-avatar">` : ""}
                            <span>by @${sellerName}</span>
                        </div>

                        <!-- countdown -->
                        <section id="count-down-section">
                            <div class="countdown-wrapper">
                                <div class="countdown-container">
                                    <p class="countdown-label">Time Left</p>
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

                        <!-- bid form -->
                        <form class="bid-form">
                            <label for="bid-input">Place your bid</label>
                            <div class="bid-input-row">
                                <input class="form-control" id="bid-input"
                                    placeholder="Higher than ${lastBidAmount}"
                                    type="number" name="bid">
                                <button type="submit" class="btn-bid-submit">Place Bid</button>
                            </div>
                        </form>

                        <button class="btn-see-bids" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">
                            See all bids (${bidsCounter})
                        </button>
                    </div>

                </div>`;
        }

        // bids history
        if (bidsContainer) {
            bidsContainer.innerHTML = "";
            if (bidsArray.length === 0) {
                bidsContainer.innerHTML = `<p style="color:#888;padding:1rem">No bids yet.</p>`;
            } else {
                bidsArray.forEach(bid => {
                    const bidDate = bid.created.split("T")[0];
                    const bidTime = bid.created.split("T")[1]?.split(".")[0] || "";
                    const bidderName = bid.bidder?.name || "unknown";
                    bidsContainer.innerHTML += `
                        <div class="bid-row">
                            <span class="bid-amount">${bid.amount} credits</span>
                            <span class="bid-bidder">@${bidderName}</span>
                            <span class="bid-date">${bidDate} ${bidTime}</span>
                        </div>`;
                });
            }
        }

        remaining(listing);

    } catch (error) {
        console.error(error);
        displayMessage("warning", "", "Failed to load listing", "", ".message-container");
    }
}