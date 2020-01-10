// initial console.log
console.log('init console.log');

// function that does the logging once called
function logging() {
    console.log('logging');
}

// calling the function named logging
logging();

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