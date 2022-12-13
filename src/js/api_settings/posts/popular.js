/* import * as json from "./read.js";
export function placeListings(post) {
    let popularListings = [...json];
    let listingWithBids = popularListings._count.bids;
    console.log(listingWithBids);

    if (listingWithBids > 0) {
        popularListings = jsonLatest.shift(listingWithBids)
    }
    console.log(popularListings);
} */

export function setupSearch(posts, container) {
    const searchFrom = document.querySelector("form#search")

    searchFrom.addEventListener("input", onSearch)

}
function onSearch(event) {
    event.preventDefault()

    const form = event.target;
    const searchTerm = firm.term.value
    // term is input name =""
    const term = searchTerm.toLowerCase();

    const filteredPosts = posts.filter(function (post) {
        const title = post.title.toLowerCase();
        const body = post.body.toLowerCase();
        const author = post.author.name.toLowerCase();

        const tagsMatch = Boolean(post.tags.map(tag => tag.toLowerCase()).filter(tag => tag.includes(term)).length)



        if (filteredPosts.length > 0) {
            renderPostThumbnails(filteredPosts, container)

        } else {
            renderPostThumbnailsError("there is no results , please search again", "danger", container)
        }



        return title.includes(term) || body.includes(term) || tagsMatch || author.includes(term);



        renderPostThumbnails(filteredPosts,)
        // function to innerhtml stuff, to render results inside a container.

    })
}