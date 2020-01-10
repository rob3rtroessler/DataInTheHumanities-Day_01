
// sample data structure - an array with 5 elements
let sampleArray = ['a string',1,2,3,4];

// when the dom content is loaded, do the following:
document.addEventListener("DOMContentLoaded", () => {
    fillTable(sampleArray);
});

function fillTable(data) {

    // init an empty, tmp html string
    let html = ``;

    // loop over the data structure
    data.forEach(function(d,i){

        // and for each of these elements in the data structure, add the following lines of html code to the tmp string
        html += `<tr>
                     <td>name</th>
                     <td>id</td>
                     <td>${d}</td>
                </tr>`;
    });

    // lastly, insert that html string into the DOM at the right position
    document.querySelector("#galleries-table").innerHTML = html;
}


/* * * * * * * * * * *
*         OLD        *
* * * * * * * * * * */

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