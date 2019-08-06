console.log('Product rating app running ...');

let months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
}
let parentCard = document.getElementById('parent-card');
let comment;
let name;

let rateList = new Set();
let id = 0;
let reviewList = [];
parentCard.addEventListener('click', function (e) {
    console.log(e.target.checked, e.target.id);
    if (e.target.checked) {
        rateList.add(e.target.id);
    } else {
        rateList.delete(e.target.id);
    }
    console.log(rateList)
});

let likeCount = new Set();

function handleLikeBtn(e) {
    console.log('likes ', e.id)
    if (reviewList && reviewList.length) {
        reviewList.forEach((item) => {
            if (item.id == e.id && !item.isLikes) {
                item.likes = item.likes + 1;
                item.isLikes = true;
            }
            if (item.id == e.id && item.unlikes && item.unlikes >= 1) {
                item.unlikes = item.unlikes - 1;
                item.isUnLikes = false;
            }
        });
    }
    setLocalStorage(reviewList);
    console.log('------', reviewList);
    // removeULList();
    removeElementByIds();
    showReviews(reviewList);
}

function handleUnLikeBtn(e) {
    console.log('unlikes ', e.id)
    if (reviewList && reviewList.length) {
        reviewList.forEach((item) => {
            if (item.id == e.id && !item.isUnLikes) {
                item.unlikes = item.unlikes + 1;
                item.isUnLikes = true;
            }
            if (item.id == e.id && item.isLikes && item.likes >= 1) {
                item.likes = item.likes - 1;
                item.isLikes = false;
            }
        });
    }
    setLocalStorage(reviewList);
    console.log('------', reviewList);
    // removeULList();
    removeElementByIds();
    showReviews(reviewList);
}

function removeULList() {
    let ulList = document.getElementById('review-ul');
    console.log(ulList.parentNode.removeChild(ulList));
    showReviews(reviewList);
    // if (ulList && ulList.parentNode) {
    //     console.log('rating card', ulList.parentNode.removeChild(ulList));
    // }
}

function removeElementByIds() {
    console.log('removing emails ', );
    reviewList.forEach((item) => {
        let element = document.getElementById(item.id);
        if (element && element.parentNode) {
            element.parentNode.removeChild(element)
        }
    });
}

function showReview(rateObj) {
    let reviewUL = document.getElementById('review-ul');
    console.log(reviewUL);
    let liItem = `<li id=${rateObj.id}>
        <h4>${rateObj.comment}</h4>
        <h4>Rating: ${rateObj.rate}</h4>
        <span>${rateObj.name}</span> |
        <span>${rateObj.createdAt}</span>|
        <span><input id=${rateObj.id} class="unlike-btn" type="button" onclick=handleLikeBtn(this) value="Like"></span>|
        <span>${rateObj.likes}</span>
        <span><input id=${rateObj.id} class="like-btn" type="button" onclick=handleUnLikeBtn(this) value="UnLike"></span>
        <span>${rateObj.unlikes}</span>
        </li>
    `;
    reviewUL.insertAdjacentHTML('afterbegin', liItem);
}

function addReview() {
    console.log('adding review');
    let rating = Array.from(rateList).length;
    let todayDate = new Date();
    let reviewObj = {
        id: id,
        comment: comment.value,
        name: name.value,
        rate: rating,
        createdAt: months[todayDate.getMonth()] + " " + todayDate.getFullYear(),
        likes: 0,
        isLikes: false,
        isUnLikes: false,
        unlikes: 0
    }
    id += 1;
    rateList = new Set();
    reviewList.push(reviewObj);
    setLocalStorage(reviewList);
    console.log(reviewList);
    showReviews(reviewList);
}

function showReviews(data) {
    data.forEach((item) => {
        showReview(item);
    });
}

function showRatingCard() {
    let prodCard = document.getElementById('prod-card');
    if (prodCard && prodCard.parentNode) {
        console.log('rating card', prodCard.parentNode.removeChild(prodCard));
    }

    let productCard = `
    <div id="prod-card" class="product-comment">
        <label>Rate it</label>
        <input id=1 type="checkbox">
        <input id=2 type="checkbox">
        <input id=3 type="checkbox">
        <input id=4 type="checkbox">
        <input id=5 type="checkbox"><br><br>
        <input id='comment' value="" placeholder="write review" type="text" /><br><br>
        <input id='name' value="" placeholder="write your name" type="text" /><br>
        <br>
        <button onclick="addReview()">Rate </button>
        <hr>
    </div>`;
    parentCard.insertAdjacentHTML('afterbegin', productCard);
    comment = document.getElementById('comment');
    name = document.getElementById('name');
}


function setLocalStorage(data) {
    localStorage.setItem('reviews', JSON.stringify(data));
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem('reviews'));
}


function restoringData() {
    let data = getLocalStorage();

    if (data && data.length) {
        reviewList = data;
        console.log('onlaoding .......', data)
        showReviews(data);
    }
}
window.onload = restoringData();