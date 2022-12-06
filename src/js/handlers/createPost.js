import { createPost } from "../api_settings/posts/create.js";


export function setCreatePostFormListener() {

    const form = document.querySelector("#createPost");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries())


            const action = form.action;
            const method = form.method;



            // send to api :
            // in another file (api/auth/login.js)
            /*  createPost(post) */
            form.reset();
            console.log(post);

            createPost(post)
        })
    }
} 