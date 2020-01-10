document.addEventListener("DOMContentLoaded", () => {
    getStoredFavs();
});


function getStoredFavs() {

    let data = JSON.parse(window.localStorage.getItem('favorites'));

    let htmlString = '';

    if(data){
        data.forEach(favItem => {
            htmlString += `<tr class="object-row">
                  <td>${favItem.title}</td>
                  <td>${favItem.name}</td>   
                  <td>${favItem.id}</td>   
                  <td><img src="${favItem.url}" class="gallery-list-img"></td>          
                </tr>`
        });
        // populate & render
        document.getElementById("fav-container").innerHTML = '';
        document.getElementById("fav-container").innerHTML = `
                    <table id="dtBasicExampleThree" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                        <thead>
                        <tr>
                            <th class="th-sm">title
                            </th>
                            <th class="th-sm">artist
                            </th>

                            <th class="th-sm">id
                            </th>
                            <th class="th-sm">image
                            </th>
                        </tr>
                        </thead>
                        <tbody id="fav-table">
                        </tbody>
                    </table>`;


        document.getElementById('favoriteCount').innerHTML = data.length;
        document.getElementById('fav-table').innerHTML = htmlString;
        $('#dtBasicExampleThree').DataTable();
    }
    else {

        document.getElementById("fav-container").innerHTML = '';
        document.getElementById("fav-container").innerHTML = `
                    <table id="dtBasicExampleThree" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                        <thead>
                        <tr>
                            <th class="th-sm">title
                            </th>
                            <th class="th-sm">artist
                            </th>

                            <th class="th-sm">id
                            </th>
                            <th class="th-sm">image
                            </th>
                        </tr>
                        </thead>
                        <tbody id="fav-table">
                        </tbody>
                    </table>`;

        document.getElementById('favoriteCount').innerHTML = "0";
        document.getElementById('fav-table').innerHTML = htmlString;
        $('#dtBasicExampleThree').DataTable();
    }
}