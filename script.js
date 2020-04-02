const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealEl = document.getElementById('single-meal');


function searchMeal(e){
    e.preventDefault();

    //clear single meal
    singleMealEl.innerHTML = '';

    //get search value
    const val = search.value;

    //check if search input is empty
    if(val.trim()){
       fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
       .then(res => res.json())
       .then(data => {
           console.log(data);
           resultHeading.innerHTML = `<h2>Search results for '${val}':</h2>`

           if (data.meals === null) {
            resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
           } else {
             mealsEl.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                </div>
                `
                ).join('');
           }
       });
    } else {
        alert('Please enter a search value')
    }
}


// Event listeners
submit.addEventListener('submit', searchMeal);
// random.addEventListener('click', getRandomMeal);