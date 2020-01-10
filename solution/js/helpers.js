
function addToFavs(){

    let data = JSON.parse(window.localStorage.getItem('favorites'));
    // first, check if favorites already exist in local storage
    if (data){
        // if so, store the old favorites first and create a helper array that stores their IDs
        let oldAndNewFavs = [];
        let helperArray = [];
        data.forEach(favItem => {
            oldAndNewFavs.push(favItem);
            helperArray.push(favItem.id)
        });

        // then push current Object to oldAndNewFavs, but only
        if (helperArray.includes(currentObjectInfo.id)){
            alert('this is already stored in favorites')
        }
        else {
            oldAndNewFavs.push(currentObjectInfo);
        }

        // then update local storage
        window.localStorage.setItem('favorites', JSON.stringify(oldAndNewFavs));
    }
    else {
        // we need to init the data structure
        let tmpArray = [];
        tmpArray.push(currentObjectInfo);
        window.localStorage.setItem('favorites', JSON.stringify(tmpArray));
    }
    updateFavs()
}

// helper function to update the current fav count
function updateFavs() {
    let data = JSON.parse(window.localStorage.getItem('favorites'));
    if(data){
        // populate icon
        document.getElementById('favoriteCount').innerHTML = data.length;
    }
    else {
        document.getElementById('favoriteCount').innerHTML = '0';
    }
}

// helper function to clear local storage
function clearStorage() {
    window.localStorage.clear();
    getStoredFavs();
}
