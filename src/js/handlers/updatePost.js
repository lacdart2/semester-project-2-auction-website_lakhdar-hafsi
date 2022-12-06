
import { updatePost } from "../api_settings/posts/index.js"
import { postDetail } from "../api_settings/posts/index.js"




export async function setUpdatePostFormListener() {


    const form = document.querySelector("#editPost");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");



    if (form) {
        const button = form.querySelector("button");
        button.disable = true;
        const post = await postDetail(id);

        form.title.value = post.title;
        form.body.value = post.body;
        form.tags.value = post.tags;
        form.media.value = post.media;

        button.disable = false;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries())
            post.id = id;





            // send to api :
            // in another file (api/auth/register.js)
            updatePost(post)
        })
    }
} 