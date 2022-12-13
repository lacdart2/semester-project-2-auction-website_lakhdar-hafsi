
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

/* import { mediaChecker } from "../../ui/mediaChecker.js"; */
/* import { placeListings } from "./popular.js"; */
const action = "/listings";
const getListingsURL = `${API_AUCTION_URL}${action}?_seller=true&sort=created&sortOrder=desc`;
/* const myListingsURL = `${API_AUCTION_URL}${action}?_tag=frame`; */



export async function read() {

    const listingsContainer = document.querySelector(".listings-container");

    try {
        const response = await fetchToken(getListingsURL)
        const json = await response.json();
        console.log(json);
        const result = json.filter(listing => listing._count.bids > 0);
        const result2 = json.filter(listing => listing._count.bids <= 0);

        const totalArray = result.concat(result2);


        // display only still active bids ,not over dated
        const today = new Date();
        let stillActive = [];
        totalArray.map((listing) => {

            const listingDate = new Date(listing.endsAt);
            if (listingDate >= today) {
                // add to new array with only active
                stillActive.push(listing);
            }
        })
        console.log(stillActive);
        console.log(result.length, result2.length, totalArray.length);
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


        console.log(json[1].endsAt);
        /*   console.log(json.endsAt.toLocaleString()) */

        // listing end date :
        const endsDate = json[4].endsAt.toLocaleString();
        const splitEndDate = endsDate.split("T");
        console.log(splitEndDate);
        const ends = splitEndDate[0];
        //const event = new Date(latestJson.endsAt);
        const event = new Date(totalArray.endsAt);
        console.log(json[1].endsAt);

        listingsContainer.innerHTML = "";


        stillActive.forEach(function (listing) {

            const endsDate = listing.endsAt.toLocaleString();
            const splitEndDate = endsDate.split("T");
            console.log(splitEndDate);
            const ends = splitEndDate[0];

            // showing only results with media :
            if (listing.media.length === 1) {

                listingsContainer.innerHTML +=
                    `<a class="listing" href = "/post/detail/index.html?id=${listing.id}">
                        <div class="card">
                            <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                <div class="card-top">
                                <div class="card-heading">
                                    <h5 class="card-title">${listing.title}</h5>
                                   
                                 
                                 </div>
                                 <div class="card-details">
                                    
                                       
                                        <small class="text-dark">
                                        
                                          <i class="fa-sharp fa-solid fa-clock"></i>
                                             ${ends}
                                        </small>
                            
                                    </div>
                                  
                                     <div class="listing-image">
                                            <img src="${listing.media}" class="img-fluid rounded" alt="${listing.title}">
                                     </div>     
                                      <div class="seller-info">
                                        <a href= "/post/detail/index.html?id=${listing.id}" class="">
                                                @ ${listing.seller.name}
                                               
                                         </a>
                                     </div>   
                                </div>
                                <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-primary mb-2">Place a Bid</a>
                                <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-secondary">totals bids:${listing._count.bids} </a>
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

