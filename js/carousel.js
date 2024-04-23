// Function to shuffle the array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async function fetchRandomImages() {
    try {
        const response = await fetch('https://api.unsplash.com/photos/random?count=15&client_id=VRVmkKd3BhEYiufjOrI-pPgIXRvJyyPV7obbaqO3KEs');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const imageProfiles = data.map(photo => [photo.urls.regular, photo.user.username]);
        // Shuffle the imageProfiles array
        const shuffledImageProfiles = shuffleArray(imageProfiles);
        return shuffledImageProfiles;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

fetchRandomImages()
    .then(imageProfiles => {
        if (imageProfiles) {
            console.log(imageProfiles); // Output the shuffled array of image profiles
            // Use the image profiles to populate the story container
            const storyContainer = document.querySelector('.owl-carousel.items');
            if (storyContainer) {
                imageProfiles.forEach(profile => {
                    const parentDiv = document.createElement('div');
                    parentDiv.classList.add('item_s');
                    parentDiv.innerHTML = `
                        <img src="${profile[0]}">
                        <p>${profile[1]}</p>
                    `;
                    storyContainer.appendChild(parentDiv);
                });
                $(document).ready(function(){
                    $(".owl-carousel").owlCarousel();
                });
                $('.owl-carousel').owlCarousel({
                    loop:true,
                    margin:5,
                    responsiveClass:true,
                    responsive:{
                        0:{
                            items:5,
                            nav:true
                        },
                        500:{
                            items:7,
                            nav:false
                        }
                    }
                });
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
