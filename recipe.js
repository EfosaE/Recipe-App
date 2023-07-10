let recipes = getSavedRecipes()

let filters = {
    searchText : ''
}
const recipeInput = document.querySelector('#recipe-input')

console.log(recipes)



const renderRecipes = function (recipes, filters) {
    let filteredRecipes = recipes.filter((recipe)=>{
        return (recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    })

    document.querySelector('#recipe-data').innerHTML= ''

    filteredRecipes.forEach((recipe) => {
        recipeDom(recipe)
    });      
}

document.querySelector('#filter-recipe').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderRecipes(recipes, filters)
})

renderRecipes(recipes, filters)

// ADD RECIPES TO THE ARRAY
document.querySelector('form').addEventListener('submit', (e) =>{

    e.preventDefault()
    if (recipeInput.value === ''){
        alert('Fill out a recipe title')
        return false
    }
    
    recipes.push({
        id: uuidv4(),
        title: recipeInput.value,
        steps:'',
        summary: '',
        ingredients: []
    })
   

    saveRecipes(recipes)
    renderRecipes(recipes, filters)

    recipeInput.value = ''

    console.log(recipes)
})
