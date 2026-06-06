import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

const action = "/listings";
//const getListingsURL = `${API_AUCTION_URL}${action}?_active=true&_seller=true&sort=created&sortOrder=desc&limit=100`;
const getListingsURL = `${API_AUCTION_URL}${action}?_seller=true&sort=created&sortOrder=desc&limit=100`;

export async function readLanding() {

    const shortRecent = document.querySelector(".recent-added-short");
    const shortMostWanted = document.querySelector(".most-wanted-short");

    try {
        const response = await fetchToken(getListingsURL);
        const json = await response.json();

        // v2 api wraps all responses in data property
        const listings = json.data;
        console.log("listings from api:", listings);
        console.log("total count:", listings?.length);

        if (!listings || listings.length === 0) {
            if (shortRecent) shortRecent.innerHTML = "<p class='text-white'>No listings found.</p>";
            return;
        }

        const result = listings.filter(listing => listing._count.bids > 1);
        const result2 = listings.filter(listing => listing._count.bids <= 1);
        const totalArray = result.concat(result2);

        // only show listings that are still active
        const today = new Date();
        let stillActive = [];
        totalArray.forEach(listing => {
            const listingDate = new Date(listing.endsAt);
            if (listingDate >= today) {
                stillActive.push(listing);
            }
        });


        // recent listings - added in latest
        var yesterday = new Date(new Date().setDate(new Date().getDate() - 30));

        const newsArray = listings.filter(listing => new Date(listing.created) > yesterday);
        const fewRecent = newsArray.slice(-5);

        console.log("newsArray:", newsArray.length);
        console.log("fewRecent:", fewRecent.length);
        console.log("result most wanted:", result.length);
        // render recent listings
        if (shortRecent) {
            shortRecent.innerHTML = "";
            fewRecent.forEach(function (listing) {

                // v2 media is now an object {url, alt} not a plain string
                const imgUrl = listing.media?.[0]?.url || "";
                const img2Url = listing.media?.[1]?.url || "";
                const ends = listing.endsAt.split("T")[0];

                if (listing.media.length >= 1) {
                    shortRecent.innerHTML +=
                        `<a class="listing" href="/post/detail/index.html?id=${listing.id}">
                            <div class="listing-card">
                                <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                    <div class="card-top">
                                        <div class="recent-added d-flex">
                                            <p class="btn btn-primary ms-auto">New</p>
                                        </div>
                                        <div class="card-heading">
                                            <h5 class="card-title">${listing.title}</h5>
                                        </div>
                                        <div class="card-details">
                                            <small class="listing-end-date">
                                                <i class="fa-sharp fa-solid fa-clock p-3 ps-0"></i>
                                                ${ends}
                                            </small>
                                        </div>
                                        <div class="listing-image">
                                            <img src="${imgUrl}" class="img-fluid rounded first-img" alt="${listing.title}">
                                            <img src="${img2Url}" class="img-fluid rounded second-img" alt="${listing.title}">
                                            <span class="img-counter p-2"><i class="fa-solid fa-image p-2"></i>${listing.media.length}</span>
                                            <div class="dots">
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                            </div>
                                        </div>
                                        <div class="seller-info">
                                            <a href="/post/detail/index.html?id=${listing.id}">
                                                @ ${listing.seller?.name || "unknown"}
                                            </a>
                                        </div>
                                    </div>
                                    <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-secondary">total bids: ${listing._count.bids}</a>
                                    <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-primary mt-2">Place a Bid</a>
                                </div>
                            </div>
                        </a>`;
                }
            });
        }

        // render most wanted listings
        if (shortMostWanted) {
            shortMostWanted.innerHTML = "";
            result.forEach(function (listing) {
                const imgUrl = listing.media?.[0]?.url || "";
                const img2Url = listing.media?.[1]?.url || "";
                const ends = listing.endsAt.split("T")[0];

                if (listing._count.bids >= 6) {
                    shortMostWanted.innerHTML +=
                        `<a class="listing" href="/post/detail/index.html?id=${listing.id}">
                            <div class="listing-card">
                                <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                    <div class="card-top">
                                        <div class="recent-added d-flex">
                                            <p class="btn btn-primary ms-auto">Wanted</p>
                                        </div>
                                        <div class="card-heading">
                                            <h5 class="card-title">${listing.title}</h5>
                                        </div>
                                        <div class="card-details">
                                            <small class="listing-end-date">
                                                <i class="fa-sharp fa-solid fa-clock p-3 ps-0"></i>
                                                ${ends}
                                            </small>
                                        </div>
                                        <div class="listing-image">
                                            <img src="${imgUrl}" class="img-fluid rounded first-img" alt="${listing.title}">
                                            <img src="${img2Url}" class="img-fluid rounded second-img" alt="${listing.title}">
                                            <span class="img-counter p-2"><i class="fa-solid fa-image p-2"></i>${listing.media.length}</span>
                                            <div class="dots">
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                            </div>
                                        </div>
                                        <div class="seller-info">
                                            <a href="/post/detail/index.html?id=${listing.id}">
                                                @ ${listing.seller?.name || "unknown"}
                                            </a>
                                        </div>
                                    </div>
                                    <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-secondary">total bids: ${listing._count.bids}</a>
                                    <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-primary mt-2">Place a Bid</a>
                                </div>
                            </div>
                        </a>`;
                }
            });
        }

    } catch (error) {
        console.log(error);
    }
}