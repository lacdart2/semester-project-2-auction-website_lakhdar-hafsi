import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

const action = "/listings";
const getListingsURL = `${API_AUCTION_URL}${action}?_seller=true&sort=created&sortOrder=desc&limit=100`;

function buildCard(listing, badge = "") {
    const imgUrl = listing.media?.[0]?.url || "";
    const ends = listing.endsAt.split("T")[0];
    const seller = listing.seller?.name || "unknown";
    const bids = listing._count?.bids ?? 0;

    const imgHtml = imgUrl
        ? `<img src="${imgUrl}" alt="${listing.title}" loading="lazy">`
        : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#111">
             <i class="fa-regular fa-image" style="font-size:2rem;color:#444"></i>
           </div>`;

    const badgeHtml = badge
        ? `<span class="bidly-badge">${badge}</span>`
        : "";

    return `
        <a class="listing" href="/post/detail/index.html?id=${listing.id}">
            <div class="bidly-card">
                <div class="bidly-card-img">
                    ${imgHtml}
                    ${badgeHtml}
                </div>
                <div class="bidly-card-body">
                    <p class="bidly-card-title">${listing.title}</p>
                    <div class="bidly-card-meta">
                        <span class="meta-item">
                            <i class="fa-regular fa-clock"></i> Ends ${ends}
                        </span>
                    </div>
                    <p class="bidly-seller">by <span>@${seller}</span></p>
                    <div class="bidly-card-actions">
                        <span class="btn-bids">${bids} bid${bids !== 1 ? "s" : ""}</span>
                        <span class="btn-bid">Place a Bid</span>
                    </div>
                </div>
            </div>
        </a>`;
}

export async function read() {
    const listingsContainer = document.querySelector(".listings-container");
    const recentContainer = document.querySelector(".recent-added");
    const mostWantedContainer = document.querySelector(".most-wanted");

    try {
        const response = await fetchToken(getListingsURL);
        const json = await response.json();

        // v2 api wraps response in data property
        const listings = json.data;
        console.log("listings:", listings?.length);

        if (!listings || listings.length === 0) {
            if (listingsContainer) listingsContainer.innerHTML = "<p style='color:#888'>No listings found.</p>";
            return;
        }

        const today = new Date();
        const stillActive = listings.filter(l => new Date(l.endsAt) >= today);
        let filteredListings = stillActive;

        // all active listings with search
        const displayListings = () => {
            if (!listingsContainer) return;
            if (filteredListings.length < 1) {
                listingsContainer.innerHTML = `<p style="color:#888">No listings matched your search.</p>`;
                return;
            }
            listingsContainer.innerHTML = filteredListings.map(l => buildCard(l)).join("");
        };

        displayListings();

        // search 
        const searchInput = document.querySelector(".search-input");
        if (searchInput) {
            searchInput.addEventListener("keyup", () => {
                const q = searchInput.value.toLowerCase();
                filteredListings = stillActive.filter(l =>
                    l.title.toLowerCase().includes(q) ||
                    l.tags?.some(t => t.toLowerCase().includes(q))
                );
                displayListings();
            });
        }

        // recent last 30 days
        const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
        const recent = stillActive.filter(l => new Date(l.created) > thirtyDaysAgo).slice(-8);

        if (recentContainer) {
            recentContainer.innerHTML = recent.length
                ? recent.map(l => buildCard(l, "New")).join("")
                : "<p style='color:#888'>No recent listings.</p>";
        }

        // most wanted: 6 bids
        const mostWanted = stillActive.filter(l => (l._count?.bids ?? 0) >= 6);

        if (mostWantedContainer) {
            mostWantedContainer.innerHTML = mostWanted.length
                ? mostWanted.map(l => buildCard(l, "Wanted")).join("")
                : "<p style='color:#888'>No high-bid listings yet.</p>";
        }

    } catch (error) {
        console.error("read error:", error);
    }
}