export function checkEndsDate(listing) {
    // listing end date :
    const endsDate = listing[4].endsAt.toLocaleString();
    const splitEndDate = endsDate.split("T");
    console.log(splitEndDate);
    const ends = splitEndDate[0];
}