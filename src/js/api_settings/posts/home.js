


import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
/* import { remaining } from "../../ui/countDown.js";
import { postDetail } from "./postDetails.js"; */



const action = "/listings";

(async function readHome() {
    const homePostsContainer = document.querySelector(".posts-container-preview");
    const allListingsCount = document.querySelector(".posts-count");


    const getListingURL = `${API_AUCTION_URL}${action}`;


    console.log(getListingURL)
    try {
        const response = await fetchToken(getListingURL)
        //console.log(response)
        const json = await response.json();
     /*    let latestJson = json.reverse(); */
        //console.log(json);



        homePostsContainer.innerHTML = "";
        allListingsCount.innerHTML = "";

        const jsonLast = json.slice(-3);
        //console.log(jsonLast)
        jsonLast.forEach(function (post) {
         

                homePostsContainer.innerHTML +=
                    `<a class="post" href = "/post/detail/index.html?id=${post.id}" >
                        <div class="card w-25 ">
                            <div class=" card-body text-start overflow-hidden d-flex flex-column align-items-left  p-3">
                                <div class="card-top">
    
                                    <h5 class="card-title">${post.title}</h5>
    
                                    <div class="card-details">
                                        <p class="fs-6 text-left">
                                            <i class="fa-solid fa-pen"></i>
                                            ${post.body}
                                        </p>
                                        <div class="post-image">
                                           <img src="${post.media}" class="img-thumbnail mb-2" alt="${post.title}">
                                         </div>
                                        <small>
                                            <i class="fa-solid fa-calendar-days"></i>
                                            ${post.updated}
                                        </small>
                                    </div>
                                </div>
                          
                                <a href="#" class="btn btn-primary w-50 mt-2">Read More</a>
                            </div>
                        </div>
                     <a/> `

                allListingsCount.innerHTML = `
                                        <small>
                                           <i class="fa-solid fa-cloud-arrow-up"></i>
                                           number recent posts:  ${json.length}
                                        </small>
                                     `
          

        });

    } catch (error) {
        console.log(error);
    }


})();



