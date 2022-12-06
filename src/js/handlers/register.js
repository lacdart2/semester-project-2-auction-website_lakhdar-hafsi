import { register } from "../api_settings/auth/register.js"

export function setRegisterFormListener() {
    const form = document.querySelector("#registerForm");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const profile = Object.fromEntries(formData.entries())
            console.log(profile);


            // const action = form.action;
            //const method = form.method; 



            // send to api :
            // in another file (api/auth/register.js)
            register(profile)
        })
    }
}