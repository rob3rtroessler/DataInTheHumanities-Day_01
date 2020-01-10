/* * * * * * * * * *
       SEARCH
* * * * * * * * * */

// global variables
const API_KEY = "722548a0-d4a1-11e9-b067-bfceffa95218";
let htmlString_Search;
let dataTable;

// when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    // init data table and favCount
    dataTable = $('#dtBasicExampleFour').DataTable();
    updateFavs();
});


// SEARCH FUNCTION #1  - GRAB INPUT AND PREPARE QUERY URL
function search() {

    // grab needed info from html elements
    let
        // radio buttons - booleans!
        optionOne = document.getElementById('option1').checked,
        optionTwo = document.getElementById('option2').checked,
        optionThree = document.getElementById('option3').checked,
        optionFour = document.getElementById('option4').checked,
        // input field - string!
        searchFieldString = document.getElementById('searchField').value;


    // prepare individual fetch urls

    // #1 SEARCH: BY GALLERY ID
    if (optionOne) {
        // create url
        let url = `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&gallery=${searchFieldString}`;
        // reset dataTable, fetch data, and populate dataTable
        dataTable.clear().draw();
        fetchAndFill(url);
    }

    // #2 SEARCH: BY TITLE
    else if (optionTwo) {

        // create url
        let apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
        let queryString = $.param({
            apikey: API_KEY,
            title: searchFieldString
        });
        let url = apiEndpointBaseURL + "?" + queryString;

        // reset dataTable, fetch data, and populate dataTable
        dataTable.clear().draw();
        fetchAndFill(url);
    }

    // #3 BY PERSON
    else if (optionThree) {

        let apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
        let queryString = $.param({
            apikey: API_KEY,
            person: searchFieldString
        });
        let url = apiEndpointBaseURL + "?" + queryString;

        // reset dataTable, fetch data, and populate dataTable
        dataTable.clear().draw();
        fetchAndFill(url);
    }

    // #4 BY CULTURE
     else if (optionFour) {
        let apiEndpointBaseURL = "https://api.harvardartmuseums.org/object/";
        let queryString = $.param({
            apikey: API_KEY,
            person: 'culture:' +searchFieldString
        });
        let url = apiEndpointBaseURL + "?" + queryString;

        // reset dataTable, fetch data, and populate dataTable
        dataTable.clear().draw();
        fetchAndFill(url);
    }
}

// SEARCH FUNCTION #2  - FETCH DATA AND POPULATE DATA TABLE
function fetchAndFill(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.records.forEach( item => {

                // info to be displayed
                let title = item.title,
                    id = item.id,
                    img = `<img src="${item.primaryimageurl}" onerror="src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'" class="gallery-list-img">`;

                // add new row to data table
                dataTable.row.add( [title, id, img] ).draw()
            });

            // call function again if more data available
            if (data.info.next) {
                fetchAndFill(data.info.next);
            }
        });
}