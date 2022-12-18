
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";


const action = "/listings";

export async function readHome() {
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

                    `<a class="listing" href = "/post/detail/index.html?id=${listing.id}">
                        <div class="listing-card">
                            <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                <div class="card-top">
                                <div class="card-heading">
                                    <h5 class="card-title">${listing.title}</h5>
                                 </div>
                                 <div class="card-details">
                                      <small class="text-dark">          
                                          <i class="fa-sharp fa-solid fa-clock p-3 ps-0"></i>
                                             ${ends}
                                        </small>   
                                    </div>
                                    <div class="listing-image ">
                                            <img src="${listing.media[0]}" class="img-fluid rounded first-img" alt="${listing.title}">
                                            <img src="${listing.media[1]}" class="img-fluid rounded second-img" alt="${listing.title}">
                                            <span class="img-counter p-2"><i class="fa-solid fa-image p-2"></i>${listing.media.length}</span>
                                            <div class="dots">
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                            </div>
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
                                        <small class="border">
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


//original code


/*
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
 */

// end code











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