// Get references to the search input and search button
const searchInput = document.getElementById("searchInput");
const btnSearch = document.getElementById("btnSearch");

// Function to handle search
function handleSearch() {
  // Get the user input and convert it to lowercase
  const userInput = searchInput.value.toLowerCase();

  // Fetch data from the JSON file
  fetch("travel_recommendation_api.json") // Ensure this is the correct file path
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Initialize array to store recommendations
      let recommendations = [];

      // Check if the user input matches any city name in countries
      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(userInput)) {
            recommendations.push(city);
          }
        });
      });

      // Check if the user input matches any temple name
      data.temples.forEach((temple) => {
        temple.cities.forEach((templeCity) => {
          if (templeCity.name.toLowerCase().includes(userInput)) {
            recommendations.push(templeCity);
          }
        });
      });

      // Check if the user input matches any beach name
      data.beaches.forEach((beach) => {
        beach.cities.forEach((beachCity) => {
          if (beachCity.name.toLowerCase().includes(userInput)) {
            recommendations.push(beachCity);
          }
        });
      });

      if (recommendations.length === 0) {
        console.log("No matching result found.");
        return;
      }

      // Display recommendations
      const resultsContainer = document.querySelector(".search-results");
      resultsContainer.innerHTML = ""; // Clear previous results

      recommendations.forEach((place) => {
        // Create HTML elements for each recommendation
        const placeElement = document.createElement("div");
        placeElement.classList.add("place");

        const imageElement = document.createElement("img");
        imageElement.src = place.imageUrl;
        imageElement.alt = place.name;
        imageElement.onerror = () => {
          imageElement.src = 'default_image.jpeg'; // Fallback image in case of an error
        };

        const nameElement = document.createElement("h2");
        nameElement.textContent = place.name;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = place.description;

        // Append elements to the results container
        placeElement.appendChild(imageElement);
        placeElement.appendChild(nameElement);
        placeElement.appendChild(descriptionElement);
        resultsContainer.appendChild(placeElement);
      });
    })
    .catch((error) => {
      console.error("There was a problem fetching the data:", error);
    });
}

// Event listener for the search button click
btnSearch.addEventListener("click", handleSearch);

// Get reference to the reset button
const resetButton = document.querySelector(".reset-button");

// Function to handle reset
function handleReset() {
  // Clear the content of the search results container
  const resultsContainer = document.querySelector(".search-results");
  resultsContainer.innerHTML = "";
}

// Event listener for the reset button click
resetButton.addEventListener("click", handleReset);
