export function remaining(listing) {
    const bidEndDate = new Date(listing.endsAt).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = bidEndDate - now;

        if (distance < 0) {
            clearInterval(interval);
            const expired = document.querySelector(".expired");
            if (expired) expired.innerHTML = `<p style="color:#888;font-size:14px">This listing has ended.</p>`;
            const countdown = document.getElementById("countdown");
            if (countdown) countdown.style.display = "none";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;

    }, 1000);
}