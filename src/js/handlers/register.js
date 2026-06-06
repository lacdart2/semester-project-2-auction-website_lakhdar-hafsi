import { register } from "../api_settings/auth/register.js"

export function setRegisterFormListener() {
    const form = document.querySelector("#registerForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const profile = Object.fromEntries(formData.entries());

            // v2 api requires avatar and banner as objects not as plain strings
            if (profile.avatar) {
                profile.avatar = { url: profile.avatar, alt: profile.name || "" };
            } else {
                delete profile.avatar;
            }

            if (profile.banner) {
                profile.banner = { url: profile.banner, alt: profile.name || "" };
            } else {
                delete profile.banner;
            }

            console.log(profile);
            register(profile);
        })
    }
}