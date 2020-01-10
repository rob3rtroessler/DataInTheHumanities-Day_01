
// API key
const API_KEY = "722548a0-d4a1-11e9-b067-bfceffa95218";
let url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;

// sample data structure - an array with 5 elements
let sampleArray = ['a string',1,2,3,4];

// when the dom content is loaded, do the following:
document.addEventListener("DOMContentLoaded", () => {

    fetchAllGalleries(url);

});

// helper functions - data fetching
function fetchAllGalleries(url) {
    // get all galleries
    fetch(url)
        .then(response => response.json())
        .then(data => {

            // log
            console.log(data);

            // populate
            populateAllGalleriesTable(data.records);

            // check -> if next===true -> more fetching
            if(data.info.next){
                fetchAllGalleries(data.info.next)
            }
        });
}
function populateAllGalleriesTable(data) {

    // init an empty, tmp html string
    let html = ``;

    // loop over the data structure
    data.forEach(function(d,i){

        // and for each of these elements in the data structure, add the following lines of html code to the tmp string
        html += `<tr>
                     <td>${d.name}</th>
                     <td>${d.gallerynumber}</td>
                     <td>${d.objectcount}</td>
                     <td>link</td>
                </tr>`;
    });

    // lastly, insert that html string into the DOM at the right position
    document.querySelector("#galleries-table").innerHTML += html;
}

// helper functions - navigation
function showGallery() {
    console.log('showing gallery, hiding others');

    // hide and show
    document.querySelector("#allGalleries").style.display = "none";
    document.querySelector("#selectedGallery").style.display = "block";
    document.querySelector("#selectedItem").style.display = "none";
}
function showItem() {
    console.log('showing item, hiding others');

    // hide and show
    document.querySelector("#allGalleries").style.display = "none";
    document.querySelector("#selectedGallery").style.display = "none";
    document.querySelector("#selectedItem").style.display = "block";
}
function showAllGalleries() {
    console.log('showing all Galleries, hiding others');

    // hide and show
    document.querySelector("#allGalleries").style.display = "block";
    document.querySelector("#selectedGallery").style.display = "none";
    document.querySelector("#selectedItem").style.display = "none";
}