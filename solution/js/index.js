
// global variables
const API_KEY = "722548a0-d4a1-11e9-b067-bfceffa95218";
let currentObjectInfo = {};

// dataTables
let dtAllGalleries,
    dtSelectedGalleryObjects;


/* * * * * * * * * * * * * *
*           INIT           *
* * * * * * * * * * * * *  */

// once the dom is loaded, call showGalleries()
document.addEventListener("DOMContentLoaded", () => {

    // init both dataTables with proper classes for all rows and click functionality

    // dataTable for all galleries
    dtAllGalleries = $('#dtAllGalleries').DataTable({  // read the API: https://datatables.net/reference/option/createdRow
        "createdRow": function( row, data, dataIndex ) {
                $(row).addClass('gallery-row');
        }
    });
    dtAllGalleries.on('click', 'tbody tr', function () { // read the API/Forum: https://datatables.net/forums/discussion/52897/on-row-click-not-working
        let row = dtAllGalleries.row($(this)).data();
        showGallery(row[1]);
    });

    // dataTable for all objects in selected gallery
    dtSelectedGalleryObjects = $('#dtSelectedGalleryObjects').DataTable({  // read the API: https://datatables.net/reference/option/createdRow
        "createdRow": function( row, data, dataIndex ) {
            $(row).addClass('object-row');
        }
    });
    dtSelectedGalleryObjects.on('click', 'tbody tr', function () { // read the API/Forum: https://datatables.net/forums/discussion/52897/on-row-click-not-working
        let myRow = dtSelectedGalleryObjects.row($(this)).data();
        showItem(myRow[1]);
    });

    // update fav count
    updateFavs();

    // prepare query url, then fetch data and fill all galleries
    let url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;
    fetchAndFillAllGalleries(url);
});


/* * * * * * * * * * * * * *
*        FUNCTIONS         *
* * * * * * * * * * * * *  */

// LEVEL #1 - ALL GALLERIES
function fetchAndFillAllGalleries(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.records.forEach(gallery => {
                let name = gallery.name,
                    id = gallery.id,
                    count = gallery.objectcount;
                dtAllGalleries.row.add([name,id,count]).draw();
            });

            if (data.info.next) {
                fetchAndFillAllGalleries(data.info.next);
            }
        })
}

// LEVEL #2 - SELECTED GALLERY 1/2
function showGallery(id) {

  // prepare query string - see API documentation with jquery: https://github.com/harvardartmuseums/api-docs
  let apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
  let queryString = $.param({
    apikey: "70177d30-b77e-11e8-a4d1-69890776a30b",
    gallery: id
  });

  // finalizing query string
  let FullQueryString =  apiEndpointBaseURL + "?" + queryString;

  // fetch and include all gallery objects
  fetchAndFillSelectedGalleryObjects(FullQueryString);

  // hide and show
  document.querySelector("#all-galleries").style.display = "none";
  document.querySelector("#all-objects").style.display = "block";
  document.querySelector("#addToFav").style.display = "none";
  document.querySelector("#object").style.display = "none";
  document.querySelector("#backToGallery").style.display = "none";
}

// LEVEL #2 -  SELECTED GALLERY 2/2
function fetchAndFillSelectedGalleryObjects (urlString){

  // fetch data
  fetch(urlString)
      .then(response => response.json())
      .then(data => {

        // populate allGalleriesArray
        data.records.forEach(item => {
            let name = item.title,
                id = item.id,
                img = `<img src="${item.primaryimageurl}" class="gallery-list-img">`;
            dtSelectedGalleryObjects.row.add([name,id,img]).draw();
            //dtSelectedGalleryObjects.row.add([name,id,img]).draw();
        });
        if (data.info.next) {
            fetchAndFillSelectedGalleryObjects(data.info.next);
        }
      });
}


// LEVEL #3 - SELECTED OBJECT
function showItem (id) {

  // create fetch url
  const url = `https://api.harvardartmuseums.org/object/${id}?apikey=${API_KEY}`;
  let nameString ='Artist(s): ';
  fetch(url)
      .then(response => response.json())
      .then(data => {
          // get people + error checking
          if (data.people){
              data.people.forEach(item => {
                  nameString += item.name + ' '
              })
            }
          else {
              nameString += ' unknown'
          }

        // populate info
        document.getElementById('objectTitle').innerHTML = data.title;
        document.getElementById('objectImage').src = data.primaryimageurl;
        document.getElementById('objectArtist').innerHTML = nameString;

        // store info in
        currentObjectInfo = {
          title: data.title,
          name: nameString,
          url: data.primaryimageurl,
          id: data.objectid
        }
      });

  // hide and show
  document.querySelector("#all-galleries").style.display = "none";
  document.querySelector("#all-objects").style.display = "none";
  document.querySelector("#object").style.display = "block";
  document.querySelector("#addToFav").style.display = "block";
  document.querySelector("#backToGallery").style.display = "block";

}

function backToGallery(){
  // hide and show
  document.querySelector("#all-galleries").style.display = "none";
  document.querySelector("#all-objects").style.display = "block";
  document.querySelector("#object").style.display = "none";
  document.querySelector("#addToFav").style.display = "none";
  document.querySelector("#backToGallery").style.display = "none";
}
