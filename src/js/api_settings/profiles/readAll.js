import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

const action = "/profiles";
// v2: use & not ? for multiple query params
const getProfilesURL = `${API_AUCTION_URL}${action}?_listings=true&_bids=true`;

export async function readAllProfiles() {
    const profilesContainer = document.querySelector(".profiles-container");
    const userLogged = localStorage.getItem("profile");

    if (!userLogged || userLogged === "undefined") {
        location.href = "/profile/login/index.html";
        return;
    }

    try {
        const response = await fetchToken(getProfilesURL);
        const json = await response.json();

        // v2 wraps response in data property
        const profiles = json.data;
        console.log("profiles:", profiles?.length);

        if (!profiles || profiles.length === 0) {
            if (profilesContainer) profilesContainer.innerHTML = "<p style='color:#888'>No profiles found.</p>";
            return;
        }

        if (profilesContainer) {
            profilesContainer.innerHTML = "";
            profiles.forEach(profile => {
                // v2 avatar is object {url, alt}
                const avatarUrl = profile.avatar?.url || "";
                const wins = profile.wins?.length ?? 0;
                const listings = profile._count?.listings ?? 0;
                const bids = profile._count?.bids ?? 0;

                if (!avatarUrl) return;

                profilesContainer.innerHTML += `
                    <a class="listing" href="/profile/detail/index.html?name=${profile.name}">
                        <div class="profile-card">
                            <div class="profile-card-img">
                                <img src="${avatarUrl}" alt="${profile.name}">
                            </div>
                            <div class="profile-card-body">
                                <p class="profile-name">@${profile.name}</p>
                                <div class="profile-stats">
                                    <span>
                                        <i class="fa-solid fa-trophy"></i> ${wins} wins
                                    </span>
                                    <span>
                                        <i class="fa-solid fa-list"></i> ${listings} listings
                                    </span>
                                    <span>
                                        <i class="fa-solid fa-gavel"></i> ${bids} bids
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>`;
            });
        }

    } catch (error) {
        console.error("readAllProfiles error:", error);
    }
}