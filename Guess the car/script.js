// Sample list of objects and their names
const objects = [
    { name: "lambo", imageUrl: "https://w0.peakpx.com/wallpaper/27/513/HD-wallpaper-shiny-black-lamborghini-car-blur-background-lamborghini.jpg" },
    { name: "ferrari", imageUrl: "https://d2hucwwplm5rxi.cloudfront.net/wp-content/uploads/2022/09/08115610/Ferrari-Logo-History-and-Meaning-_-Cover-8-9-22.jpg" },
    { name: "bmw", imageUrl: "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym13JTIwY2FyfGVufDB8fDB8fHww&w=1000&q=80" },
    { name: "bentley", imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Bentley/Continental/7771/1676965640042/front-left-side-47.jpg" },
    { name: "tesla", imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-X/5253/1611841733029/front-left-side-47.jpg" },
    { name: "mercedes", imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Mercedes-Benz/GLA/10849/1690447163011/front-left-side-47.jpg?impolicy=resize&imwidth=480" },
    { name: "porsche", imageUrl: "https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/718ModelImage.jpg&w=872&h=578&q=75&c=1" },
    { name: "mini cooper", imageUrl: "https://cdni.autocarindia.com/ExtraImages/20190513112727_DSC_3895.jpg" },
    { name: "audi", imageUrl: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Audi/Q5/10556/1689594416925/front-left-side-47.jpg?impolicy=resize&imwidth=480" },
    { name: "skoda", imageUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202302/skoda_kushaq-one_one.jpg?VersionId=6FjKW9jRjTvPj2Govfi5IWJPOGxqnOCX" },
    { name: "renault", imageUrl: "https://cdn.group.renault.com/ren/in/renault-kwid/2023-/bs6-2/kvs/overview-page.jpg.ximg.small.jpg/760f17d44e.jpg" },
];

let currentObjectIndex = 0;
const objectImage = document.getElementById("objectImage");
const guessInput = document.getElementById("guessInput");
const feedback = document.getElementById("feedback");

// Function to load the next object
function loadNextObject() {
    if (currentObjectIndex < objects.length) {
        objectImage.src = objects[currentObjectIndex].imageUrl;
        guessInput.value = "";
        feedback.textContent = "";
    } else {
        // End of the game
        objectImage.src = "";
        guessInput.style.display = "none";
        document.getElementById("submitGuess").style.display = "none";
        feedback.textContent = "Game Over!";
    }
}

// Function to check the user's guess
function checkGuess() {
    const userGuess = guessInput.value.toLowerCase();
    const correctObjectName = objects[currentObjectIndex].name.toLowerCase();
    
    if (userGuess === correctObjectName) {
        feedback.textContent = "Correct! It's a " + correctObjectName + ".";
    } else {
        feedback.textContent = "Incorrect. Try again!";
    }
    
    currentObjectIndex++;
    setTimeout(loadNextObject, 2000); // Load the next object after 2 seconds
}

// Event listener for the "Submit Guess" button
document.getElementById("submitGuess").addEventListener("click", checkGuess);

// Initialize the game by loading the first object
loadNextObject();