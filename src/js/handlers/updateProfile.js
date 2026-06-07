import { updateProfile } from "../api_settings/profiles/update.js";

export function setUpdateProfileListener() {
    const form = document.querySelector("#editProfile");
    if (!form) return;

    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile?.name) return;

    // load name and email
    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    if (nameInput) nameInput.value = profile.name;
    if (emailInput) emailInput.value = profile.email || "";

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const avatarUrl = form.querySelector("#avatar")?.value.trim();
        const bannerUrl = form.querySelector("#banner")?.value.trim();
        const bioValue = form.querySelector("#bio")?.value.trim();
        if (bioValue) data.bio = bioValue;

        const data = {};
        if (avatarUrl) data.avatar = { url: avatarUrl, alt: profile.name };
        if (bannerUrl) data.banner = { url: bannerUrl, alt: profile.name };

        if (!avatarUrl && !bannerUrl) {
            document.querySelector(".message-container").innerHTML =
                `<div class="message warning"><i class="fa-solid fa-triangle-exclamation"></i><span>Enter avatar or banner URL.</span></div>`;
            return;
        }

        updateProfile(profile.name, data);
    });
}