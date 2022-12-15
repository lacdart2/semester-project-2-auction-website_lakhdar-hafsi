import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";



const action = "/profiles";
const getProfilesURL = `${API_AUCTION_URL}${action}?_listings=true?_bids=true?_active=true`;



export async function readAllProfiles() {
    const profilesContainer = document.querySelector(".profiles-container");
    const activeProfiles = document.querySelector(".active-profiles");
    const activeProfiles2 = document.querySelector(".active-profiles2");
    try {
        const response = await fetchToken(getProfilesURL)
        console.log(getProfilesURL);
        const json = await response.json();
        console.log(json);

        profilesContainer.innerHTML = "";


        json.forEach(function (profile) {
            if (profile.avatar) {
                profilesContainer.innerHTML +=

                    `<a class="listing profile" href = "/profile/detail/index.html?name=${profile.name}">
                            <div class="card profile-card">
                                <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                    <div class="card-top d-flex flex-column align-items-left">
                                          <div class="card-heading">
                                              <h5 class="card-title">${profile.name}</h5>
                                          </div>
                                          <div class="card-details">
                                              <small class="text-dark py-3">
                                                  <i class="fa-solid fa-envelope mb-3 "></i>
                                                  ${profile.email}
                                              </small>
                                          </div>
                                        </div>
                                        <div class="card-bottom">
                                         <div class="listing-image profile-img">
                                             <img src="${profile.avatar}" class="img-fluid rounded" alt="${profile.title}">
                                          </div>
                                           <div class="seller-info">
                                               <small>
                                                      <i class="fa-solid fa-trophy"></i>
                                                      ${profile.wins.length}
                                               </small>
           
                                               <p class="pe-2 border-bottom pb-2">listings: ${profile._count.listings}</p>
  
                                               <p> <i class="fa-solid fa-coins pe-2"></i>${profile.credits}</p>
                                              </div>  
                                         </div>
                                    </div>
                                     <button type="button" class="btn btn-primary " data-bs-toggle="modal"
                                             data-bs-target="#exampleModal">
                                       
                                             Read More 
                                      </button>
                                 
                                </div>
                            
                         <a/> `


                /*   json.forEach(function (profile) { */

            }


        });

        activeProfiles.innerHTML = "";

        json.forEach(function (profile) {
            if (profile._count.listings > 3 && profile.avatar) {
                activeProfiles.innerHTML +=

                    ` <a class="listing profile" href = "/profile/detail/index.html?name=${profile.name}">
                        <div class="card">
                            <div class="card-body">
                            <h5>${profile.name}</h5>
                                <small>
                                <i class="fa-solid fa-trophy"></i>
                                ${profile.wins.length}
                                </small>
                            </div>
                            <img  src="${profile.avatar}" class="d-block w-100 slider-avatar" alt="...">
                      
                         </div>
                    </a>`


            }

        });

        /*  activeProfiles2.innerHTML = "";
         json.forEach(function (profile) {
             if (profile.credits < 900 && profile.wins.length > 3) {
                 activeProfiles2.innerHTML +=
 
 
                     ` <a class="listing profile" href = "/profile/detail/index.html?name=${profile.name}">
                                  <div class="card">
                                      <div class="card-body">
                                      <h5>${profile.name}</h5>
                                          <small>
                                          <i class="fa-solid fa-trophy"></i>
                                          ${profile.wins.length}
                                          </small>
                                      </div>
                                      <img  src="${profile.avatar}" class="d-block w-100 slider-avatar" alt="...">
                                      
                                      </div>
                              </a>`
 
 
 
 
             }
 
         });
 
  */

    } catch (error) {
        console.log(error);

    }
};

/* export async function popularProfiles() {
 
    try {
 
        const response = await fetchToken(getProfilesURL);
        const data = await response.json();
        console.log(data[0])
        const firstSlide = [data[0], data[1], data[2]];
        let secondArray = []
        let thirdArray = []
 
        console.log(firstSlide);
        
 
 
    } catch (error) {
        console.log(error)
    }
 
 
 
 
} */


/* 
     <div class="carousel-item" data-bs-interval="2000">
                        <img src="${profile[1].avatar}" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                             <h5>${profile[1].name}</h5>
                              <p>having ${profile[1]._count.listings} listings</p> / <p>wins :</p>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="${profile[2].avatar}" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h5>${profile[2].name}</h5>
 
                             <p>having ${profile[2]._count.listings} listings</p> / <p>wins :</p>
                        </div>
                    </div> */












{/* <div class="carousel-item" data-bs-interval="2000">
                                <img src="${profile.avatar}" class="d-block w-25" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>${profile.name}</h5>

                                    <p>having ${profile._count.listings} listings</p> / <p>wins :</p>
                                </div>
                            </div>
               
                   
                             <div class="carousel-item">
                                <img src="${profile.avatar}" class="d-block w-25" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>${profile.name}</h5>

                                    <p>having ${profile._count.listings} listings</p> / <p>wins :</p>
                                </div>
                            </div> */}