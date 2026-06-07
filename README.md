# Bidly — Auction House

> Previously submitted as "BID it ALL" for Semester Project 2 (Year 1). Upgraded and rebranded for Portfolio 2 (Year 2) with a full redesign, Noroff API v2 migration, and new features.

A full-featured auction platform where users can list items, place bids, and manage their profile.

**Live site:** https://auction-website-semester-project2.netlify.app/  
**GitHub:** https://github.com/lacdart2/semester-project-2-auction-website_lakhdar-hafsi

---

## Screenshots

> Landing page, listing detail, profile page — see live site above.

---

## What Changed in Portfolio 2

- Rebranded from "BID it ALL" to **Bidly**
- Migrated from Noroff API v1 (`nf-api.onrender.com`) to **API v2** (`v2.api.noroff.dev`)
- Full dark theme redesign — new card layout, navbar, auth pages
- Added user dropdown menu with profile, sell and logout
- Added create, edit and delete listing functionality
- Added place bid with live credits update
- Added edit profile (avatar, banner, bio)
- Added search by title or tag
- Added auth guard — profiles and bidding require login
- Fixed all v2 breaking changes: `.data` unwrapping, `{url, alt}` media objects, split auth/auction base URLs, `X-Noroff-API-Key` header

---

## Features

- Browse listings without an account
- Register and login with a Noroff student email
- Create, edit and delete your own listings
- Place bids on active listings with live credit updates
- View and update your profile (avatar, banner, bio)
- Search listings by title or tag
- View all user profiles
- Responsive design — mobile and desktop

---

## Tech Stack

- HTML, SCSS, Vanilla JavaScript (ES Modules)
- Bootstrap 5.2
- Noroff Auction API v2
- Netlify (hosting)

---

## Project Structure

```
├── index.html               # landing page
├── posts/                   # browse all listings
├── post/
│   ├── create/              # create listing
│   ├── detail/              # listing detail + bid
│   └── edit/                # edit listing
├── profile/
│   ├── login/               # login page
│   ├── register/            # register page
│   ├── detail/              # profile detail
│   └── edit/                # edit profile
├── profiles/                # all profiles
├── src/
│   ├── js/
│   │   ├── api_settings/    # API calls (auth, listings, profiles)
│   │   ├── components/      # createMenu, displayMessage
│   │   ├── handlers/        # form listeners
│   │   ├── ui/              # countdown timer
│   │   └── utils/           # localStorage helpers
│   └── scss/
│       └── partials/        # SCSS modules
├── dist/
│   └── css/                 # compiled CSS
└── assets/
    └── images/              # logo and images
```

---

## Getting Started

```bash
git clone https://github.com/lacdart2/semester-project-2-auction-website_lakhdar-hafsi
cd semester-project-2-auction-website_lakhdar-hafsi
git checkout auction-v2-2026
npm install
npm run build
```

Open `index.html` with a local server (e.g. Live Server in VS Code).

---

## Environment

No `.env` file needed — the API key is included in the source code for this student project. The Noroff API key used is public and shared across all students.

---

## Branch Structure

- `master` — original Year 1 submission (preserved as reference)
- `auction-v2-2026` — Portfolio 2 upgrade: full redesign + API v2 migration

---

## API

Uses [Noroff Auction API v2](https://v2.api.noroff.dev). Registration requires a `@stud.noroff.no` or `@noroff.no` email address. All requests require an `X-Noroff-API-Key` header.

---

## Known Limitations

- Credits in navbar may show 0 briefly on first load while fresh data fetches
- Listing countdown shows negative values for expired listings
- No real-time bid notifications (API limitation)
- Only `@stud.noroff.no` and `@noroff.no` emails can register

---

## Author

Lakhdar Hafsi — [github.com/lacdart2](https://github.com/lacdart2)
