
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { remainingAll } from "../../ui/allCountDown.js";

const action = "/listings";
const getListingsURL = `${API_AUCTION_URL}${action}`;


export async function read() {
     
    const postsContainer = document.querySelector(".posts-container");

    try {
        const response = await fetchToken(getListingsURL)
        const json = await response.json();
           let latestJson = json.reverse();
        
        console.log(json[1].endsAt);
        const event = new Date(latestJson.endsAt);
        console.log(json[1].endsAt);

        postsContainer.innerHTML = "";

    
        latestJson.forEach(function (post) {
            postsContainer.innerHTML +=
                `<a class="post" href = "/post/detail/index.html?id=${post.id}">
                        <div class="card">
                            <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                <div class="card-top">
    
                                    <h5 class="card-title">${post.title}</h5>
    
                                    <div class="card-details">
                                        <p class="fs-6 text-left">
                                            <i class="fa-solid fa-pen"></i>
                                            ${post.description}
                                        </p>
                                       
                                        <small>
                                            <i class="fa-solid fa-calendar-days"></i>
                                            ${post.created.toLocaleString().split('T')}
                                        </small>
                            
                                    </div>
                                  
                                     <div class="post-image">
                                            <img src="${post.media}" class="img-fluid rounded" alt="${post.title}">
                                     </div>        
                                </div>
                                <a href="/post/detail/index.html?id=${post.id}" class="btn btn-primary">Place a Bid</a>
                            </div> 
                        </div>
                     </a> ` 
          
        
        }); 
        remainingAll(post);
        
    } catch (error) {
        console.log(error);

    }
   
};


    
    /* 
    
                <div class="count-down-section" id="count-down-section" data-count ="count">
                                    <div class="countdown-wrapper">
                                         <div class="countdown-container h-100">
                                           <p>Time Left<i class="fa-solid fa-timer"></i></p>
                                                <div class="countdown" id="countdown">
                                                    <div class="time">
                                                        <p class="days"></p>
                                                        <small>days</small>
                                                    </div>
                                                    <div class="time">
                                                        <p class="hours"></p>
                                                        <small>hours</small>
                                                    </div>
                                                    <div class="time">
                                                        <p class="minutes"></p>
                                                        <small>minutes</small>
                                                    </div>
                                                    <div class="time">
                                                        <p class="seconds"></p>
                                                        <small>seconds</small>
                                                    </div>
                                            </div>
                                         </div>
                                   </div>
                               </div> 
    */

{/* <div class="count-down-section" id="count-down-section" data-count="count">
    <div class="countdown-wrapper">
        <div class="countdown-container h-100">
            <p>Time Left<i class="fa-solid fa-timer"></i></p>
            <div class="countdown" id="countdown">
                <div class="timeD">

                </div>
                <div class="timeH">

                </div>
                <div class="timeM">

                </div>
                <div class="timeS">

                </div>
            </div>
        </div>
    </div>
</div>  */}