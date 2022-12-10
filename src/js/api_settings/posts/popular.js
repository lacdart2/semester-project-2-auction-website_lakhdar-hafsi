import * as json from "./read.js";
export function placeListings(post) {
    let popularListings = [...json];
    let listingWithBids = popularListings._count.bids;
    console.log(listingWithBids);

    if (listingWithBids > 0) {
        popularListings = jsonLatest.shift(listingWithBids)
    }
    console.log(popularListings);
}
