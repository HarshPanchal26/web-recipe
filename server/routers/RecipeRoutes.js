const experess = require('express');
const { isValidUser, isAutorized } = require('../middlewares/middlewareForAuthentication');
const { controllerForFullRecipies,
    controllerForRecipies,
    controllerForSaveRecipe,
    controllerForMultipleFullRecipies,
    controllerForSearchRecipies
} = require('../controllers/controllerForRecipies')
const router = experess.Router();

router.post('/multiple', isAutorized, controllerForMultipleFullRecipies);
router.get('/detailedrecipies', isAutorized, controllerForFullRecipies);
router.get('/search', isAutorized, controllerForSearchRecipies);
router.get('/all', isAutorized, controllerForRecipies);
router.post('/save', isAutorized, controllerForSaveRecipe);
router.post('/unsave', isAutorized, controllerForSaveRecipe);

module.exports = router;

