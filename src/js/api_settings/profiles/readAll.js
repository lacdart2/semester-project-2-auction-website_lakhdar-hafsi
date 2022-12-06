/* import { API_SOCIAL_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";



const action = "/profiles";
const getProfilesURL = `${API_SOCIAL_URL}${action}`;


export async function readAllProfiles() {
    const profilesContainer = document.querySelector(".profiles-container");

    try {
        const response = await fetchToken(getProfilesURL)
        console.log(getProfilesURL);
        const json = await response.json();
        console.log(json);

        profilesContainer.innerHTML = "";

        json.forEach(function (profile) {

            profilesContainer.innerHTML +=
                `<a class="post" href = "/post/detail/index.html?id=${profile.id}">
                          <div class="card">
                              <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                  <div class="card-top">
      
                                      <h5 class="card-title">${profile.title}</h5>
      
                                      <div class="card-details">
                                          <p class="fs-6 text-left">
                                              <i class="fa-solid fa-pen"></i>
                                              ${profile.body}
                                          </p>
                                         
                                          <small>
                                              <i class="fa-solid fa-calendar-days"></i>
                                              ${profile.updated}
                                          </small>
                                      </div>
                                      <div>
                                       <div class="post-image">
                                             <img src="${profile.media}" class="img-fluid rounded" alt="${profile.title}">
                                       </div>
                                       </div>
                                  </div>
                                  <a href="#" class="btn btn-primary">Read More</a>
                              </div>
                          </div>
                       <a/> `


        });


    } catch (error) {
        console.log(error);

    }
};
 */