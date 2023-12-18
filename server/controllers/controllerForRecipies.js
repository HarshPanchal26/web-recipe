const { saveRecipies,
    fetchDetailRecipies,
    fetchQueryRecipies,
    fetchDetailMultipleRecipies,
    fetchAllRecipies,
    removeRecipiesFromList } = require('../services/serviceForRecipies');

const controllerForRecipies = async (req, res) => {
    try {
        const result = await fetchAllRecipies();
        res.status(201).json({
            recipies: result,
            message: "Fetched Data"
        })
    } catch (error) {
        res.status(401).json({
            recipies: null,
            message: error
        })
    }
}

const controllerForSearchRecipies = async(req ,res)=>{
    const searchtext = req.query.item; 
    try {
        const result = await fetchQueryRecipies(searchtext);
        res.status(201).json({
            recipies: result,
            message: "Fetched Data"
        })
    } catch (error) {
        res.status(401).json({
            recipies: null,
            message: error
        })
    }   
}

const controllerForFullRecipies = async (req, res) => {
    const searchId = req.query.search;
    console.log("Recipe", searchId)
    try {
        if (searchId) {
            const recipe = await fetchDetailRecipies(searchId);
            console.log("Recipe", recipe.data)
            res.status(201).json({
                message: 'Fetches Recipe',
                recipe: recipe.data
            })
        } else {
            res.status(401).json({
                message: 'Not valid string',
                recipe: null
            })
        }
    } catch (error) {
        console.log("Error is" , error)
        res.status(401).json({
            recipe: null,
            message: error
        })
    }
}

const controllerForMultipleFullRecipies = async (req, res) => {
    const ArrayOfId = req.body;
    try {
        if (ArrayOfId) {
            const recipe = await fetchDetailMultipleRecipies(ArrayOfId);
            let ArrayToSendClient = recipe.data.map((item) => {
                return {
                    id: item.id,
                    image: item.image,
                    title: item.title
                }
            });
            res.status(201).json({
                message: 'Fetches Recipe',
                recipies: ArrayToSendClient
            })
        } else {
            res.status(401).json({
                message: 'Not valid string',
                recipe: null
            })
        }
    } catch (error) {
        console.log("Error is " , error)
        res.status(401).json({
            recipe: null,
            message: error
        })
    }
}

const controllerForSaveRecipe = async (req, res) => {
    try {
        const result = await saveRecipies(req.body.recipe_id, res.locals.uid);
        res.status(201).json({
            message: "Saved Successfully",
            result: result
        })
    } catch (error) {
        res.status(401).json({
            message: error,
            result: false
        })
    }
}
const controllerForUnSaveRecipe = async (req, res) => {
    try {
        const result = await removeRecipiesFromList(req.body.recipe_id, res.locals.uid);
        res.status(201).json({
            message: "Saved Successfully",
            result: result
        })
    } catch (error) {
        res.status(401).json({
            message: error,
            result: false
        })
    }
}

module.exports = {
    controllerForRecipies,
    controllerForSearchRecipies,
    controllerForFullRecipies,
    controllerForSaveRecipe,
    controllerForUnSaveRecipe,
    controllerForMultipleFullRecipies
}