document.getElementById("fetchRecipeBtn").addEventListener("click", fetchRandomRecipe);

function fetchRandomRecipe() {
    fetch("http://localhost:5000/random-recipe") // Ensure backend is running on port 5000
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data); // Debugging
            
            if (!data || !data.title) {
                document.getElementById("randomRecipeResult").innerHTML = "<p>Error fetching recipe. Try again!</p>";
                return;
            }

            // Construct recipe HTML
            const recipeHTML = `
                <h2>${data.title}</h2>
                <img src="${data.image}" alt="${data.title}" style="width: 300px; border-radius: 10px;">
                <h3>Instructions:</h3>
                <p>${data.instructions ? data.instructions : "No instructions available."}</p>
            `;

            document.getElementById("randomRecipeResult").innerHTML = recipeHTML;
        })
        .catch(error => {
            console.error("Error fetching recipe:", error);
            document.getElementById("randomRecipeResult").innerHTML = "<p>Failed to load recipe. Check console.</p>";
        });
}
