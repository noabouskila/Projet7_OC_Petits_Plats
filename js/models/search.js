
// Moteur de recherche principal
const mainSearchEngine = document.getElementById("mainSearchEngine")
mainSearchEngine.addEventListener("input",searchRecipe)

// fonction de recherche moteur de recherche principale
function searchRecipe(e){
    console.log("coucou")
    
    // mot clé tapé par le user
    let searchTerm = e.target.value.trim().replace(/\s+/g, ' ').toLowerCase()
    console.log(searchTerm)

    // verification  motclé > de 3 caracteres et  motclé valide
    if(searchTerm.length !== '' && searchTerm.length >= 3 && validateEntry(searchTerm)){
        console.log("+ que 3 caracteres")

        // FONCTION FILTER : filterRecipe
        const filterRecipe = recipes.filter(recipe =>{
           const filterName = recipe.name.toLowerCase()
           const filterDescription = recipe.description.toLowerCase()
           const filterIngredient = recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase());
           
           return filterName.includes(searchTerm) || filterDescription.includes(searchTerm) || filterIngredient.includes(searchTerm);
        })
        console.log(filterRecipe)

        // affichage du contenu ET du nombre total de recettes
        if (filterRecipe.length === 0) {
            sectionCards.innerHTML = `Aucune recette ne contient '${searchTerm}'avec les éléments selctionnés. Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;
            countRecipes.innerHTML = `${filterRecipe.length} recettes`;
        }
        else{
            updateRecipeDisplay(filterRecipe);
        }
    }
    else{
        console.log("- que 3 caracteres")
        resetRecipeDisplay();
    }
}

// Fonction pour l'affichage des recettes filtrées
function updateRecipeDisplay(filterRecipe) {
    sectionCards.innerHTML = "";
    createRecipeCards(filterRecipe);
    countRecipes.innerHTML = `${filterRecipe.length} recettes`;
}

// Fonction pour réinitialiser l'affichage des recettes
function resetRecipeDisplay() {
    sectionCards.innerHTML = "";
    createRecipeCards(recipes);
    countRecipes.innerHTML = `${recipes.length} recettes`;
}

//Fonction pour verifier les caractères non autorisés
function validateEntry(str) {
    var letters =
      /[^a-zA-Z'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ ]+/;
    if (str.match(letters)) {
      return false;
    }
    return true;
}

