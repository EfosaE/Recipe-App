// SAVING TO LOCAL STORAGE
let saveRecipes = (recipe) => {
    localStorage.setItem('recipe', JSON.stringify(recipe))
}

// GETTING MY SAVED RECIPES
let getSavedRecipes = () => {
    let recipesJSON = localStorage.getItem('recipe')
    
    if (recipesJSON !== null && recipesJSON !== undefined) {
        return JSON.parse(recipesJSON)
    }else{
        return []
}
}

const recipeDom = (recipe) => {
    console.log(recipe)
    const divEl = document.createElement('div');
    divEl.className = 'recipe-card';

    const recipeEl = document.createElement('p');
    recipeEl.textContent = `${recipe.title}`;
    divEl.appendChild(recipeEl);

    const summaryEl = document.createElement('p');
    if(recipe.summary.length > 0){
        summaryEl.textContent = `${recipe.summary}`
    }else {
        summaryEl.textContent = 'You have not listed any ingredients' 
    }
  
    divEl.appendChild(summaryEl);

        recipeEl.addEventListener('click', () => {
        location.assign(`edit.html?#${recipe.id}`)
  })

    document.querySelector('#recipe-data').appendChild(divEl);
}

const ingredientsDom = (ingredient) => {
    const ingDivEl = document.createElement('div')
    ingDivEl.className = 'ingredient-div'

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = ingredient.present
    checkbox.addEventListener('change', (e) => {
        toggleIng(ingredient.id)
        saveRecipes(recipes)
        renderIngredients()   
    })

    const label = document.createElement('label')
    label.appendChild(checkbox)
    label.appendChild(document.createTextNode(`${ingredient.title}`))
    ingDivEl.appendChild(label)

    const button = document.createElement('button')
    button.innerHTML = 'x'
    button.addEventListener('click', function() {
    deleteIng(ingredient.id)
    saveRecipes(recipes)
    renderIngredients()
    })
    ingDivEl.appendChild(button)

    document.querySelector('#ingredients-data').appendChild(ingDivEl)
}

