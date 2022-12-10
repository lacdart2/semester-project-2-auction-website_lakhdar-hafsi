
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
/* import { mediaChecker } from "../../ui/mediaChecker.js"; */
/* import { remainingAll } from "../../ui/allCountDown.js"; */
/* import { placeListings } from "./popular.js"; */
const action = "/listings";
const getListingsURL = `${API_AUCTION_URL}${action}?_seller=true`;


export async function read() {

    const postsContainer = document.querySelector(".posts-container");

    try {
        const response = await fetchToken(getListingsURL)
        const json = await response.json();

        console.log(json);

        const result = json.filter(listing => listing._count.bids > 0);
        const result2 = json.filter(listing => listing._count.bids <= 0);
        const totalArray = result.concat(result2);
        console.log(totalArray[3].media[0]);

        /*      const listWithImages = []
             for (i = 0; i < totalArray.length; i++)
                 if (totalArray.contains(media[0])) {
                     totalArray.push(listWithImages);
                     console.log(listWithImages);
                 }; */


        /*     let listingsWithImages = [];
            console.log(listingsWithImages);
    
            function checkForImage(totalArray) {
    
    
                for (let i = 0; i < totalArray.length; i++) {
                    if (totalArray[i].media[0]) {
                        (totalArray[i].media[0]).push(listingsWithImages);
                   
                    }
    
                }
    
                return false;
            } */
        /*   for (let j = 0; j < totalArray[i].length; j++) {
                             if (totalArray[i][j].type === 'image') {
                                 return true;
                                 totalArray[i][j].push(listingsWithImages);
     
                             }
                         } */

        console.log(result);
        console.log([result2]);
        console.log(totalArray);
        /*      console.log(totalArray);
       console.log(json.unshift(result)); */



        //let latestJson = json.reverse();
        //let latestJson = result.reverse();


        //console.log(latestJson);

        console.log(json[1].endsAt);
        /*   console.log(json.endsAt.toLocaleString()) */
        const endsDate = json[4].endsAt.toLocaleString();
        const splitEndDate = endsDate.split("T");
        console.log(splitEndDate);
        const ends = splitEndDate[0];
        //const event = new Date(latestJson.endsAt);
        const event = new Date(totalArray.endsAt);
        console.log(json[1].endsAt);

        postsContainer.innerHTML = "";


        totalArray.forEach(function (post) {

            const endsDate = post.endsAt.toLocaleString();
            const splitEndDate = endsDate.split("T");
            console.log(splitEndDate);
            const ends = splitEndDate[0];
            if (post.media.length === 1) {

                postsContainer.innerHTML +=
                    `<a class="post" href = "/post/detail/index.html?id=${post.id}">
                        <div class="card">
                            <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                <div class="card-top">
                                <div class="card-heading">
                                    <h5 class="card-title">${post.title}</h5>
                                   
                                 
                                 </div>
                                    <div class="card-details">
                                    
                                       
                                        <small>
                                        
                                          <i class="fa-sharp fa-solid fa-clock"></i>
                                         ${ends}
                                        </small>
                            
                                    </div>
                                  
                                     <div class="post-image">
                                            <img src="${post.media}" class="img-fluid rounded" alt="${post.title}">
                                     </div>     
                                      <div class="seller-info">
                                        <a href= "/post/detail/index.html?id=${post.id}" class="">
                                                @ ${post.seller.name}
                                               
                                         </a>
                                     </div>   
                                </div>
                                <a href="/post/detail/index.html?id=${post.id}" class="btn btn-primary mb-2">Place a Bid</a>
                                <a href="/post/detail/index.html?id=${post.id}" class="btn btn-secondary">totals bids:${post._count.bids} </a>
                            </div> 
                        </div>
                     </a> `


            }
        });

        /*     remainingAll(post); */
        /*    placeListings(); */
    } catch (error) {
        console.log(error);

    }

};


{/* <div class="seller-info">
    <a href="/post/detail/index.html?id=${post.id}" class="btn btn-primary btn-danger">
        @ ${post.seller.name}
        <img class="profile-avatar" src="${post.seller.avatar}" />
    </a>
</div> */}




//${ post.created.toLocaleString().split('T') }
//<i class="fa-solid fa-calendar-days"></i>



/* export function apiResponseImage(totalArray) {

    const listWithImages = [];
    totalArray.forEach(function (post) {


        if (totalArray.media[0]) {
            totalArray.push(listWithImages);
            console.log(listWithImages);
        };


    }); */

/* 
  for (i = 0; i < totalArray.length; i++)
      if (totalArray.media[0]) {
          totalArray.push(listWithImages);
          console.log(listWithImages);
      }; */















{/* <p class="fs-6 text-left">
    <i class="fa-solid fa-pen"></i>
    ${post.description}
</p> */}

