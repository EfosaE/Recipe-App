const recipeTitle = document.querySelector('#recipe-title')
const recipeIngredient = document.querySelector('#ingredient-input')
const form = document.querySelector('form')
const recipeTextarea = document.querySelector('#cooking-steps')

const recipeId = window.location.hash.substring(1)
let recipes = getSavedRecipes()

let recipe = recipes.find((recipe) => {
    return recipe.id === recipeId
})
if (recipe === undefined){
    location.assign('/index.html')
}

recipeTitle.innerHTML = `${recipe.title}`


recipeTextarea.value = recipe.steps
recipeTextarea.addEventListener('input', (e)=>{
    recipe.steps = e.target.value
    saveRecipes(recipes)
})


const generateSummary = () => {
    let filteredIngredients = recipe.ingredients.filter((ingredient)=>{
        if(ingredient.present){
            return ingredient
        } 
    })

    if (filteredIngredients.length === recipe.ingredients.length && recipe.ingredients.length >= 1){
        return `You have all the ingredients`   
    }else if(filteredIngredients.length === 0 || recipe.ingredients.length === 0){
        return `You don't have any ingredients`
    }else {
        return `You have ${filteredIngredients.length} out of ${recipe.ingredients.length} ingredients`
    }
}


const toggleIng = (id) => {
    let ingredient = recipe.ingredients.find((ingredient) => {
        return ingredient.id === id
    })
    if (ingredient !== undefined){
        ingredient.present = !ingredient.present
    }
    recipe.summary = generateSummary()
}

const deleteIng = function (id){
    let ingIndex = recipe.ingredients.findIndex(function(ingredient){
        return ingredient.id===id
    })
    if (ingIndex > -1){
        recipe.ingredients.splice(ingIndex, 1)
    }
    recipe.summary = generateSummary()
}

const deleteRecipe = function(id) {
    let recipeIndex = recipes.findIndex(function(recipe){
        return recipe.id === id
    })
    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
    }
}


const renderIngredients = () => {
    document.querySelector('#ingredients-data').innerHTML= ''
    recipe.ingredients.forEach((ingredient) => {
        ingredientsDom(ingredient)
    })
    recipe.summary = generateSummary()
}

renderIngredients()

form.addEventListener( 'submit', (e)=>{
    e.preventDefault()
    if (recipeIngredient.value === '') {
        alert('Fill out the ingredient field')
        return false
    }
    recipe.ingredients.push({
        id: uuidv4(),
        title: recipeIngredient.value,
        present: false
    })
    recipe.summary = generateSummary()
    renderIngredients()
    saveRecipes(recipes)
    recipeIngredient.value = ''
})

document.querySelector('#delete-recipe').addEventListener('click', () => {
    let text = 'You are about to delete this recipe\n Do you want to continue?!'
    if (confirm(text)){
        deleteRecipe(recipe.id)
        location.assign('/index.html')
        saveRecipes(recipes)
    }
    
})

