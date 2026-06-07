import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { displayMessage } from "../../components/displayMessage.js";

const action = "/profiles";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const profileName = params.get("name");

// v2: use & not ? for multiple query params
const getProfileURL = `${API_AUCTION_URL}${action}/${profileName}?_listings=true&_bids=true`;

/**
 * Fetches a single profile by name from the URL query string
 * and renders the profile detail page content.
 */
export async function getProfile() {
    const profileContainer = document.querySelector(".profile-container");

    try {
        const response = await fetchToken(getProfileURL);
        const json = await response.json();

        // v2 wraps response in data property
        const profile = json.data;
        console.log("profile:", profile);

        if (!profile) {
            displayMessage("warning", "", "Profile not found", "", ".message-container");
            return;
        }

        const avatarUrl = profile.avatar?.url || "";
        const bannerUrl = profile.banner?.url || "";
        const wins = profile.wins?.length ?? 0;
        const listings = profile._count?.listings ?? 0;
        const bids = profile._count?.bids ?? 0;
        const credits = profile.credits ?? 0;

        document.title = `${profile.name} — Bidly`;

        if (profileContainer) {
            profileContainer.innerHTML = `
                <div class="profile-detail">

                    <!-- banner -->
                    ${bannerUrl
                    ? `<div class="profile-banner">
                            <img src="${bannerUrl}" alt="${profile.name} banner">
                           </div>`
                    : `<div class="profile-banner profile-banner-empty"></div>`
                }

                    <!-- avatar + name -->
                    <div class="profile-header">
                        <div class="profile-avatar-wrap">
                            ${avatarUrl
                    ? `<img src="${avatarUrl}" alt="${profile.name}" class="profile-avatar-lg">`
                    : `<div class="profile-avatar-placeholder">${profile.name[0].toUpperCase()}</div>`
                }
                        </div>
                        <div>
                            <h1 class="profile-username">@${profile.name}</h1>
                            <p class="profile-email">${profile.email || ""}</p>
                        </div>
                    </div>

                    <!-- stats row -->
                    <div class="profile-stats-row">
                        <div class="profile-stat">
                            <span class="stat-value">${credits}</span>
                            <span class="stat-label">Credits</span>
                        </div>
                        <div class="profile-stat">
                            <span class="stat-value">${wins}</span>
                            <span class="stat-label">Wins</span>
                        </div>
                        <div class="profile-stat">
                            <span class="stat-value">${listings}</span>
                            <span class="stat-label">Listings</span>
                        </div>
                        <div class="profile-stat">
                            <span class="stat-value">${bids}</span>
                            <span class="stat-label">Bids</span>
                        </div>
                    </div>

                    <!-- listings -->
                    ${profile.listings && profile.listings.length > 0
                    ? `<div class="profile-listings-section">
                            <h2 class="profile-section-title">Active Listings</h2>
                            <div class="profile-listings-grid">
                                ${profile.listings.map(listing => {
                        const imgUrl = listing.media?.[0]?.url || "";
                        const ends = listing.endsAt?.split("T")[0] || "";
                        return `
                                        <a href="/post/detail/index.html?id=${listing.id}" class="profile-listing-item">
                                            ${imgUrl
                                ? `<img src="${imgUrl}" alt="${listing.title}">`
                                : `<div class="profile-listing-no-img"><i class="fa-regular fa-image"></i></div>`
                            }
                                            <p class="profile-listing-title">${listing.title}</p>
                                            <p class="profile-listing-ends">Ends ${ends}</p>
                                        </a>`;
                    }).join("")}
                            </div>
                           </div>`
                    : `<p style="color:#666;font-size:14px;margin-top:1.5rem">No active listings.</p>`
                }

                </div>`;
        }

    } catch (error) {
        console.error("getProfile error:", error);
        displayMessage("warning", "", "Failed to load profile", "", ".message-container");
    }
}