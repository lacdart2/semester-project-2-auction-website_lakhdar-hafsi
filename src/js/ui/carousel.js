/* 
const profilesContainer = document.querySelectorAll(".");
const nxtBtn = document.querySelectorAll(".nxt-btn");
const preBtn = document.querySelectorAll(".pre-btn");


export function slide() {


    profilesContainer.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener("click", () => {
            item.scrollLeft += containerWidth;
        })
        preBtn[i].addEventListener("click", () => {
            item.scrollLeft -= containerWidth;
        })
    })
} */