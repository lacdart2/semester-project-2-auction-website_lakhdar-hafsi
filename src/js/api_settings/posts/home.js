


import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
/* import { logOut } from "../auth/logout.js"; */
/* import { remaining } from "../../ui/countDown.js";
import { postDetail } from "./postDetails.js"; */


/* logOut(); */
const action = "/listings";

/* ( */ export async function readHome() {
    const homeListingsContainer = document.querySelector(".listings-container-preview");
    const allListingsCount = document.querySelector(".listings-count");


    const getListingURL = `${API_AUCTION_URL}${action}?_seller=true&sort=created&sortOrder=desc`;
    // to add : active tag to url
    /*  read(); */
    console.log(getListingURL)
    try {
        const response = await fetchToken(getListingURL)
        //console.log(response)
        const json = await response.json();
        /*    let latestJson = json.reverse(); */
        //console.log(json);


        console.log(json);
        homeListingsContainer.innerHTML = "";
        allListingsCount.innerHTML = "";
        // get the last active bids :
        const jsonLast = json.slice(-10);
        //console.log(jsonLast)


        jsonLast.forEach(function (listing) {

            // listing end date :
            const endsDate = json[4].endsAt.toLocaleString();
            const splitEndDate = endsDate.split("T");
            console.log(splitEndDate);
            const ends = splitEndDate[0];
            if (listing.media.length === 1) {

                homeListingsContainer.innerHTML +=
                    `<a class="listing listing-home" href = "/post/detail/index.html?id=${listing.id}">
                        <div class="card card-home">
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


                allListingsCount.innerHTML = `
                                        <small>
                                           <i class="fa-solid fa-cloud-arrow-up"></i>
                                           recent added listings:  ${json.length}
                                        </small>
                                     `

            }

        });

    } catch (error) {
        console.log(error);
    }


}/* )() */;


/* 
`<a class="post" href = "/post/detail/index.html?id=${listing.id}" >
                        <div class="card w-25 ">
                            <div class=" card-body text-start overflow-hidden d-flex flex-column align-items-left  p-3">
                                <div class="card-top">
    
                                    <h5 class="card-title">${listing.title}</h5>
    
                                    <div class="card-details">
                                        <p class="fs-6 text-left">
                                            <i class="fa-solid fa-pen"></i>
                                            ${listing.body}
                                        </p>
                                        <div class="listing-image">
                                           <img src="${listing.media}" class="img-thumbnail mb-2" alt="${listing.title}">
                                         </div>
                                        <small>
                                            <i class="fa-solid fa-calendar-days"></i>
                                            ${listing.updated}
                                        </small>
                                    </div>
                                </div>
                          
                                <a href="#" class="btn btn-primary w-50 mt-2">Read More</a>
                            </div>
                        </div>
                     <a/> ` */