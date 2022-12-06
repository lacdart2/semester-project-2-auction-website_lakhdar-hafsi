
import { getProfile, updateProfile } from "../api_settings/profiles/index.js";
import { getFromStorage } from "../utils/storage.js";




export async function setUpdateProfileListener() {


    const form = document.querySelector("#editProfile");


    if (form) {
        const { name, email } = getFromStorage("profile");
        form.name.value = name;
        form.email.value = email;

        const button = form.querySelector("button");
        button.disable = true;

        const profile = await getProfile(name);
        console.log(profile);


        form.banner.value = profile.banner;
        form.banner.value = profile.avatar;

        button.disable = false;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries())



            updateProfile(profile)
        })
    }
} 