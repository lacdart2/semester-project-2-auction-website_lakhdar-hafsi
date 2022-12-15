
/* 
import { read } from "../api_settings/posts/read.js";
read(); */
let filteredListings = json;

const listingsContainer = document.querySelector('.listings-container');



export async function filter() {



    const displayListings = () => {
        if (filteredListings.length < 1) {
            listingsContainer.innerHTML = `<h6>Sorry, no listings matched your search</h6>`;
            return;
        }

        listingsContainer.innerHTML = filteredProducts
            .map((listing) => {
                const { id, title, media, tags } = listing;
                return
                `<a a class="listing" href = "/post/detail/index.html?id=${listing.id}" >
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
                                <a href="/post/detail/index.html?id=${listing.id}" class="">
                                    @ ${listing.seller.name}
                                </a>
                            </div>
                        </div>
                        <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-primary mb-2">Place a Bid</a>
                        <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-secondary">totals bids:${listing._count.bids} </a>
                    </div>
                </div>
             </a > 
            
            
            `;
            })
            .join('');
    };

    displayListings();

    // Text Filter

    /* const form = document.querySelector('.input-form'); */
    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('keyup', (event) => {
        console.log(event);
        const inputValue = searchInput.value;
        filteredListings = listings.filter((listing) => {
            return listing.title.toLowerCase().includes(inputValue);
        });
        displayListings();
    });
}
// console.log(
//   products.filter((product) => {
//     return product.title.toLowerCase().includes('');
//   })
// );

// Filter Buttons
/* 
const companiesDOM = document.querySelector('.companies');

const displayButtons = () => {
    const buttons = [
        'all',
        ...new Set(products.map((product) => product.company)),
    ];
    // console.log(buttons);
    companiesDOM.innerHTML = buttons
        .map((company) => {
            return `<button class='company-btn' data-id="${company}">${company}</button>`;
        })
        .join('');
};

displayButtons();

companiesDOM.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('company-btn')) {
        if (el.dataset.id === 'all') {
            filteredProducts = [...products];
        } else {
            filteredProducts = products.filter((product) => {
                return product.company === el.dataset.id;
            });
        }
        searchInput.value = '';
        displayListings();
    }
});
 */