
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";



/**
 * sends a get request to get single profile
 * @param {string} fetchToken to access the Api
 * @param {string} name user's name
 * @returns result that matches the user's name
 */
const action = "/profiles";
const method = "GET";





const queryString = document.location.search;

const params = new URLSearchParams(queryString);
const name = params.get("name");
const getProfileURL = `${API_AUCTION_URL}${action}/${name}?_listings=true`;
console.log(getProfileURL);
/* export async function updateProfile() {
 
 
    const updateProfileURL = `${API_AUCTION_URL}${action}/${name}?_listings=true`;
 
 
    const response = await fetchToken(updateProfileURL)
 
    return await response.json();
} */



/*    profileContainer.innerHTML = ""; */



export async function getProfile(name) {



    /*    if (!name) {
           throw new Error("you need a profile name ");
       } */

    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${fetchToken}`,
        },
    }


    /*    try { */


    const response = await fetchToken(getProfileURL, options);

    const json = await response.json();
    console.log(json);








    /*   } catch (error) {
          console.log(error);
      } */
}

/* ?_listings = true */
/* 

profileContainer.innerHTML = `

                <a class="listing profile listing-details" href = "/">
                          <div class="card profile-card">
                              <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                  <div class="card-top d-flex flex-column align-items-left">
                                        <div class="card-heading">
                                            <h5 class="card-title">${json.name}</h5>
                                        </div>
                                        <div class="card-details">
                                            <small class="text-dark py-3">
                                                <i class="fa-solid fa-envelope mb-3 "></i>
                                                ${json.email}
                                            </small>
                                        </div>
                                      </div>
                                      <div class="card-bottom">
                                       <div class="listing-image profile-img">
                                           <img src="${json.avatar}" class="img-fluid rounded" alt="${json.title}">
                                        </div>
                                         <div class="seller-info">
                                             <small>
                                                    <i class="fa-solid fa-trophy"></i>
                                                    ${json.wins.length}
                                             </small>
         
                                             <p class="pe-2 border-bottom pb-2">listings: ${json._count.listings}</p>

                                             <p> <i class="fa-solid fa-coins pe-2"></i>${json.credits}</p>
                                            </div>  
                                       </div>
                                  </div>
                                   <button type="button" class="btn btn-primary " 
                                        
                                     
                                           Read More 
                                    </button>
                               
                              </div>
                          </div>
                       <a/> `
 */