document.getElementById('error-message').style.display = 'none';
const searchFood = () => {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    inputField.value = '';
    if(inputValue == ''){
        document.getElementById('error-message').style.display = 'block';
        const searchResult = document.getElementById('search-result');
        const singleFoodCard = document.getElementById('single-food');
        singleFoodCard.textContent = '';
        searchResult.textContent = '';
    }else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayFood(data.meals))
            .catch(error => displayError(error))
        document.getElementById('error-message').style.display = 'none';
    }
}

const displayError = error => {
    const singleFoodCard = document.getElementById('single-food');
    singleFoodCard.textContent = '';
    document.getElementById('error-message').style.display = 'block';
}

const displayFood = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    meals.forEach(meal => {
        const searchDiv = document.createElement('div');
        searchDiv.classList.add('col');
        searchDiv.innerHTML = `
            <div class="card">
                <img src="${meal.strMealThumb}">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                <button onclick="loadSingleDetail(${meal.idMeal})">Details</button>
            </div>
            </div>
        `
        searchResult.appendChild(searchDiv);
    })
}

const loadSingleDetail = meal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySingleDetail(data.meals[0]))
}

const displaySingleDetail = mealDetail => {
    const singleFoodCard = document.getElementById('single-food');
    singleFoodCard.textContent = '';
    const singleFoodDiv = document.createElement('div');
    singleFoodDiv.classList.add = 'single-card';
    singleFoodDiv.innerHTML = `
        <img src="${mealDetail.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${mealDetail.strMeal}</h5>
          <p class="card-text">${mealDetail.strInstructions.slice(0, 100)}</p>
          <a href="${mealDetail.strYoutube}" class="btn">Go Youtube</a>
        </div>
    `
    singleFoodCard.appendChild(singleFoodDiv);
}