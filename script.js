
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArrayUnsplash = [];

// Unsplash API
let count = 5;
const apiKeyUnsplash = 'WyeTpSUb58sp9wEoI0gYUsXqIurIymUUs3ZhfLSKPew';
const apiUrlUnsplash = `https://api.unsplash.com/photos/random?client_id=${apiKeyUnsplash}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }

}

// Helper function to setAttributes
function setAttributes(element, attributes) {
   for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
   }
}


// Create Elements for Links & Photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArrayUnsplash.length;
    // Run function for each object in photosArray
    photosArrayUnsplash.forEach((photo) => {
    //   Create <a> to link to Unsplash
         const item = document.createElement('a');
         setAttributes(item, {
             href: photo.links.html,
             target: '_blank'
         });
    // Create img 
        const img = document.createElement('img');
        setAttributes(img, {
            src:  photo.urls.regular,
            alt:  photo.alt_description,
            title: photo.alt_description
        });
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put img inside <a> element, then both inside image Container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



// Get photos from Unsplash API
async function getPhotosUnsplash() {
    try {
        const response = await fetch(apiUrlUnsplash);
        photosArrayUnsplash = await response.json();
        console.log(photosArrayUnsplash);
        displayPhotos();
    } catch(err) {
        alert (err);
    }
}

// Check to see if scroll is near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
         getPhotosUnsplash();
    }
});

// On Load
getPhotosUnsplash();