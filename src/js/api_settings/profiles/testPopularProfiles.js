export async function readAllPopular() {

    for (i = 0; i < json.length; i++) {
        if (json[i]._count.listings > 0) {
            if (i > 10 && i < 14) {
                mostActiveProfiles.innerHTML +=

                    `
           
                          <div class="carousel-item active" data-bs-interval="10000">
                                <img src="${profile.avatar}" class="d-block w-25" alt="...">
                                <div class="carousel-caption d-none d-md-block">
                                    <h5>${profile.name}</h5>

                                    <p>having ${profile._count.listings} listings</p> / <p>wins :</p>
                                </div>
                            </div>
                           
           
                 
                             <div class="carousel-item" data-bs-interval="2000">
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
                            </div>`
            }

        }
    }




}