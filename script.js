const searchInput = document.getElementById('search');
const searchResultsDiv = document.getElementById('searchResults');
const favoritesDiv = document.getElementById('favorites');
const mealDetailDiv = document.getElementById('mealDetail');

// Initialize an array to store favorite meals
let favoriteMeals = [];

// Event listener for search input
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.trim();
    if (searchTerm !== '') {
        // Call the API to search for meals based on the searchTerm
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                // Display search results
                displaySearchResults(data.meals);
            });
    } else {
        // Clear search results if the search bar is empty
        searchResultsDiv.innerHTML = '';
    }
});

// Function to display search results
function displaySearchResults(meals) {
    if (meals) {
        const mealList = meals.map(meal => {
            return `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <button class="favorite-btn" data-id="${meal.idMeal}">Add to Favorites</button>
                    <button class="detail-btn" data-id="${meal.idMeal}">Details</button>
                </div>
            `;
        }).join('');

        searchResultsDiv.innerHTML = mealList;

        // Add event listeners to favorite buttons
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        favoriteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const mealId = event.target.getAttribute('data-id');
                const selectedMeal = meals.find(meal => meal.idMeal === mealId);
                if (selectedMeal) {
                    // Add the selected meal to favorites
                    favoriteMeals.push(selectedMeal);
                    // Update favorites display
                    displayFavoriteMeals();
                }
            });
        });

        // Add event listeners to detail buttons
        const detailButtons = document.querySelectorAll('.detail-btn');
        detailButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const mealId = event.target.getAttribute('data-id');
                const selectedMeal = meals.find(meal => meal.idMeal === mealId);
                if (selectedMeal) {
                    // Display meal details
                    displayMealDetails(selectedMeal);
                }
            });
        });
    } else {
        // Display a message if no results found
        searchResultsDiv.innerHTML = '<p>No results found.</p>';
    }
}

// Function to display favorite meals
function displayFavoriteMeals() {
    const favoriteList = favoriteMeals.map(meal => {
        return `
            <div class="favorite-meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <button class="remove-favorite-btn" data-id="${meal.idMeal}">Remove from Favorites</button>
            </div>
        `;
    }).join('');

    favoritesDiv.innerHTML = favoriteList;

    // Add event listeners to remove favorite meals by clicking the buttons
    const removeFavoriteButtons = document.querySelectorAll('.remove-favorite-btn');
    removeFavoriteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const mealId = event.target.getAttribute('data-id');
            // Remove the selected meal from favorites
            favoriteMeals = favoriteMeals.filter(meal => meal.idMeal !== mealId);
            // Update favorites display
            displayFavoriteMeals();
        });
    });
}

// Function to display meal details
function displayMealDetails(meal) {
    const mealDetails = `
        <div class="meal-detail">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <p>${meal.strInstructions}</p>
        </div>
    `;

    mealDetailDiv.innerHTML = mealDetails;
}
