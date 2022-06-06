
// Stop form from reloading the page on submit
// Method From:
// https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit
let reviewForm = document.getElementById("reviewForm");
function handleForm(e) {
    e.preventDefault();
    postReview();
}

reviewForm.addEventListener("submit", handleForm);

// Define parts of the review for submit
let reviews = document.getElementById("reviews");
let range = document.getElementById("Range");
let review = document.getElementById("Review");

function postReview() {
    // Create the div
    if (review.value != "") {

    let reviewDiv = document.createElement("div");
    reviewDiv.setAttribute("class", "reviewBox")
    // Put the Rating and Review into the div
    reviewDiv.innerHTML = `<h3>${range.value}/5</h3><p>${review.value}</p>`;
    // Add the div to the page and put the review into session storage (Temp storage until the page is shut)
    reviews.appendChild(reviewDiv);
    sessionStorage.setItem(`review${sessionStorage.length}`, range.value + "&/e" + review.value);
    review.value = "";
    }
    
    else {
        alert("Please enter a review");
    }
}

// Add the review to the page in temporary storage (session storage)
for (let i = 0; i < sessionStorage.length; i++) {
    // Grab all reviews from session storage
    // and place both the review and rating into the Div
    let review = sessionStorage.getItem(`review${i}`).split("&/e");
    let reviewDiv = document.createElement("div");
    reviewDiv.setAttribute("class", "reviewBox")
    reviewDiv.innerHTML = `<h3>${review[0]}/5</h3><p>${review[1]}</p>`;
    // Add the review to the page
    reviews.appendChild(reviewDiv);
}