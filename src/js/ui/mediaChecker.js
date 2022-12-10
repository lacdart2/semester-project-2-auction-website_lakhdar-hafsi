import { read } from "../api_settings/posts/read.js";

export async function mediaChecker(json) {

    /*     read(json); */
    /*  const listWithImages = []
     for (i = 0; i < totalArray.length; i++)
         if (totalArray.media[0]) {
             totalArray.push(listWithImages);
             console.log(listWithImages);
         }; */
    if (json.media.length === 1) {
        /*  read(json); */
        totalArray.push(json.media.length === 1);
    } else {
        totalArray.unshift(json.media.length === 1)
    }

}

