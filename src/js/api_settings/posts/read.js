import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

const action = "/listings";
const getListingsURL = `${API_AUCTION_URL}${action}?_seller=true&sort=created&sortOrder=desc&limit=100`;

export async function read() {

    const listingsContainer = document.querySelector(".listings-container");
    const recent = document.querySelector(".recent-added");
    const mostWanted = document.querySelector(".most-wanted");

    try {
        const response = await fetchToken(getListingsURL);
        const json = await response.json();

        // v2 api wraps response in data property
        const listings = json.data;
        console.log("listings:", listings?.length);

        if (!listings || listings.length === 0) {
            if (listingsContainer) listingsContainer.innerHTML = "<p class='text-white'>No listings found.</p>";
            return;
        }

        const result = listings.filter(listing => listing._count.bids > 1);
        const result2 = listings.filter(listing => listing._count.bids <= 1);
        const totalArray = result.concat(result2);

        // only to show active listings
        const today = new Date();
        let stillActive = [];
        totalArray.forEach(listing => {
            const listingDate = new Date(listing.endsAt);
            if (listingDate >= today) stillActive.push(listing);
        });

        let filteredListings = stillActive;

        const displayListings = () => {
            if (!listingsContainer) return;
            if (filteredListings.length < 1) {
                listingsContainer.innerHTML = `<h6 class="text-white">No listings matched your search</h6>`;
                return;
            }
            listingsContainer.innerHTML = "";
            filteredListings.forEach(listing => {
                // v2 media is object {url, alt}
                const imgUrl = listing.media?.[0]?.url || "";
                const img2Url = listing.media?.[1]?.url || "";
                const ends = listing.endsAt.split("T")[0];

                if (listing.media.length >= 1) {
                    listingsContainer.innerHTML +=
                        `<a class="listing" href="/post/detail/index.html?id=${listing.id}">
                            <div class="listing-card">
                                <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                    <div class="card-top">
                                        <div class="card-heading">
                                            <h5 class="card-title text-white">${listing.title}</h5>
                                        </div>
                                        <div class="card-details">
                                            <small class="listing-end-date">
                                                <i class="fa-sharp fa-solid fa-clock p-3 ps-0"></i>
                                                ${ends}
                                            </small>
                                        </div>
                                        <div class="listing-image">
                                            <img src="${imgUrl}" class="img-fluid rounded  first-img" alt="${listing.title}">
                                            <img src="${img2Url}" class="img-fluid rounded second-img" alt="${listing.title}">
                                            <span class="img-counter p-2"><i class="fa-solid fa-image p-2"></i>${listing.media.length}</span>
                                            <div class="dots">
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                            </div>
                                        </div>
                                        <div class="seller-info">
                                            <a href="/post/detail/index.html?id=${listing.id}" class="listing-owner">
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
        };

        displayListings();

        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('keyup', () => {
                const inputValue = searchInput.value.toLowerCase();
                filteredListings = stillActive.filter(listing =>
                    listing.title.toLowerCase().includes(inputValue) ||
                    listing.tags?.some(tag => tag.toLowerCase().includes(inputValue))
                );
                displayListings();
            });
        }

        // recent listings - last 30 days
        var thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
        const newsArray = listings.filter(listing => new Date(listing.created) > thirtyDaysAgo);
        const fewRecent = newsArray.slice(-5);

        if (recent) {
            recent.innerHTML = "";
            fewRecent.forEach(listing => {
                const imgUrl = listing.media?.[0]?.url || "";
                const ends = listing.endsAt.split("T")[0];
                if (listing.media.length >= 1) {
                    recent.innerHTML +=
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

        // most wanted
        if (mostWanted) {
            mostWanted.innerHTML = "";
            result.forEach(listing => {
                const imgUrl = listing.media?.[0]?.url || "";
                const ends = listing.endsAt.split("T")[0];
                if (listing._count.bids >= 6) {
                    mostWanted.innerHTML +=
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