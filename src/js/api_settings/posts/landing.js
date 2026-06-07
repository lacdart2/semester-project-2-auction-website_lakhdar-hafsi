import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

const action = "/listings";
const getListingsURL = `${API_AUCTION_URL}${action}?_seller=true&sort=created&sortOrder=desc&limit=100`;

// check if user logged in
function isLoggedIn() {
    const profile = localStorage.getItem("profile");
    return profile && profile !== "undefined" && profile !== "null";
}

// card link — goes to detail if logged in, and to login page if not
function cardLink(id) {
    return `/post/detail/index.html?id=${id}`;
}

function buildCard(listing, badge) {
    const imgUrl = listing.media?.[0]?.url || "";
    const ends = listing.endsAt.split("T")[0];
    const seller = listing.seller?.name || "unknown";
    const bids = listing._count?.bids ?? 0;
    const link = cardLink(listing.id);

    const imgHtml = imgUrl
        ? `<img src="${imgUrl}" alt="${listing.title}" loading="lazy">`
        : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#111">
             <i class="fa-regular fa-image" style="font-size:2rem;color:#444"></i>
           </div>`;

    return `
        <a class="listing" href="${link}">
            <div class="bidly-card">
                <div class="bidly-card-img">
                    ${imgHtml}
                    <span class="bidly-badge">${badge}</span>
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
                        <span class="btn-bid">${isLoggedIn() ? "Place a Bid" : "Login to Bid"}</span>
                    </div>
                </div>
            </div>
        </a>`;
}

export async function readLanding() {
    const shortRecent = document.querySelector(".recent-added-short");
    const shortMostWanted = document.querySelector(".most-wanted-short");

    try {
        const response = await fetchToken(getListingsURL);
        const json = await response.json();
        const listings = json.data;

        if (!listings || listings.length === 0) {
            if (shortRecent) shortRecent.innerHTML = "<p style='color:#888'>No listings found.</p>";
            return;
        }

        const today = new Date();
        const active = listings.filter(l => new Date(l.endsAt) >= today);
        const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));

        // recent added in last 30 days
        const recent = active
            .filter(l => new Date(l.created) > thirtyDaysAgo)
            .slice(-8);

        // most wanted with  more than 6 bids
        const mostWanted = active.filter(l => (l._count?.bids ?? 0) >= 6).slice(0, 8);

        if (shortRecent) {
            shortRecent.innerHTML = recent.length
                ? recent.map(l => buildCard(l, "New")).join("")
                : "<p style='color:#888'>No recent listings.</p>";
        }

        if (shortMostWanted) {
            shortMostWanted.innerHTML = mostWanted.length
                ? mostWanted.map(l => buildCard(l, "Wanted")).join("")
                : "<p style='color:#888'>No high-bid listings yet.</p>";
        }
        // search filter on home page
        const searchInput = document.querySelector(".search-input");
        if (searchInput) {
            searchInput.addEventListener("keyup", () => {
                const q = searchInput.value.toLowerCase();
                const filtered = active.filter(l =>
                    l.title.toLowerCase().includes(q) ||
                    l.tags?.some(t => t.toLowerCase().includes(q))
                );
                if (shortRecent) {
                    shortRecent.innerHTML = filtered.length
                        ? filtered.slice(-8).map(l => buildCard(l, "New")).join("")
                        : "<p style='color:#888'>No results found.</p>";
                }
            });
        }
    } catch (error) {
        console.error("readLanding error:", error);
    }
}