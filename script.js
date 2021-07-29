const getNewRecipeButton = document.getElementById("getNewRecipe");
const mealContainer = document.getElementById("meal");

function getMeals() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
  .then((response) => response.json())
  .then((response) => {
    createMeal(response.meals[0]);
  })
  .catch((error) => {
    console.warn(error);
  });
}

//add event listeners to window with 'load' method;
window.addEventListener("load", () => {  
  getMeals();
});

//add event listeners to the generate random meals button with "click" method
getNewRecipeButton.addEventListener("click", () => {
  getMeals();
})

const createMeal = (meal) => {
  const ingredients = [];
  
  // Get all ingredients from the object with max 20  items;
  for(let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      // Stop if there are no more ingredients;
      break;
    }
  }

  //creating inner HTML items to display;
  //using ternary operator to check if the properties are available;
  const newInnerHTML = `
        <div class="row">
          <div class="col-5">
              <img src="${meal.strMealThumb}" alt="Meal Image">
              ${
            meal.strCategory
              ? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
              : ''
        }
                  ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
                  ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : '' }
                  <h5>Ingredients:</h5>
                  <ul>
                      ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
                  </ul>
          </div>
            <div class="col-7">
                 <h4>${meal.strMeal}</h4>
                 <p>${meal.strInstructions}</p>
            </div>
        </div>
        ${
            meal.strYoutube ? `
        <div class="row">
            <h5>Video Recipe</h5>
            <div class="videoWrapper">
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"></frame>
            </div>
        </div>`
        : ''
    }
    `;
    mealContainer.innerHTML = newInnerHTML;
};
