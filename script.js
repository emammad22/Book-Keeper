const showModal = document.getElementById('show-modal');
const closeModal = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const webName = document.getElementById('website-name');
const webUrl = document.getElementById('website-url');
const bookMarkForm = document.getElementById('bookmark-form');
const bookMarksContainer = document.getElementById('bookmarks-container');

showModal.addEventListener('click', (e) => {
    modal.classList.add('show-modal');
})

closeModal.addEventListener('click', (e) => {
    modal.classList.remove('show-modal');
})

window.addEventListener("load", (event) => {
    // showSavedItems();
    const item = showSavedItems();
    for (let j = 0; j < item.length; j++) {
        bookMarksContainer.append(item[j]);
    }
});


function formIsValid() {
    const url = webUrl.value;
    const urlName = webName.value;

    var urlR = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

    if (!(urlR.test(url))) {
        return false;
    }

    if (urlName === " ") {
        return false;
    }

    return true;
}

bookMarkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!formIsValid()) return;

    appendBookMark();

    modal.classList.remove('show-modal');


})


function appendBookMark() {
    const url = webUrl.value;
    const urlName = webName.value;

    const bookMarkItem = createBookMarkItem(url, urlName);
    bookMarksContainer.append(bookMarkItem);

}

function createBookMarkItem(url, urlName) {
    const item = document.createElement('div');
    item.className = 'item';
    const deleteMark = document.createElement('i');
    deleteMark.className = 'fas fa-times';
    deleteMark.setAttribute('title', 'Delete BookMark');
    item.appendChild(deleteMark);



    const name = document.createElement('div');
    name.classList.add('name');
    const websiteName = document.createElement('img');
    websiteName.setAttribute('alt', 'Favicon');
    websiteName.src = `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
    name.appendChild(websiteName);

    const link = document.createElement('a');
    link.src = `${url}`;
    link.target = '_blank';
    link.innerText = `${urlName}`;
    name.appendChild(link);
    item.appendChild(name);


    localStorage.setItem(`${urlName}`, JSON.stringify(setToLocal(url, urlName)));

    deleteMark.addEventListener('click', () => {
        item.remove();
    })
    return item;
}

function setToLocal(url, urlName) {
    let item = [];
    let itemObj = {
        link: url,
        linkName: urlName
    }

    item.push(itemObj);
    return item;
}

function getFromLocal() {
    let localStObj = [];
    for (let i = 0; i < localStorage.length; i++) {
        localStObj.push(JSON.parse(localStorage.getItem(localStorage.key(i)))[0]);
    }
    return localStObj;
}

function showSavedItems() {
    const savedItems = getFromLocal();
    const bookmarks = [];

    for (let i = 0; i < savedItems.length; i++) {
        const item = document.createElement('div');
        item.className = 'item';
        const deleteMark = document.createElement('i');
        deleteMark.className = 'fas fa-times';
        deleteMark.setAttribute('title', 'Delete BookMark');
        item.appendChild(deleteMark);



        const name = document.createElement('div');
        name.classList.add('name');
        const websiteName = document.createElement('img');
        websiteName.setAttribute('alt', 'Favicon');
        websiteName.src = `https://s2.googleusercontent.com/s2/favicons?domain=${savedItems[i].link}`;
        name.appendChild(websiteName);

        const link = document.createElement('a');
        link.src = `${savedItems[i].link}`;
        link.target = '_blank';
        link.innerText = `${savedItems[i].linkName}`;
        name.appendChild(link);
        item.appendChild(name);

        deleteMark.addEventListener('click', () => {
            item.remove();
        })

        bookmarks.push(item);
    }
    return bookmarks;
    // console.log(bookmarks);
}

document.body.addEventListener('click',(e)=> {
    const bookmarks = showSavedItems();
    const targettedItem = e.target.parentElement.className;
    for (let i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].className == targettedItem){
            localStorage.removeItem(`${bookmarks[i].children[1].children[1].innerText}`);
        }
    }
}
)

console.log(getFromLocal());






