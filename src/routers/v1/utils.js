const {
    allCountryController,
    createCountryController,
    singleCountryController,
    updateCountryController,
    deleteCountryController,
    allFeedbackController,
    createFeedbackController,
    singleFeedbackController,
    updateFeedbackController,
    deleteFeedbackController,
    allContactController,
    createContactController,
    singleContactController,
    updateContactController,
    deleteContactController,
    allVisitorController,
    createVisitorController,
    singleVisitorController,
    updateVisitorController,
    deleteVisitorController,} = require('../../controllers/v1/utils.controller');
const adminCheck = require('../../middlewares/v1/Admin');
const checkAuth = require('../../middlewares/v1/Auth');

const router = require("express").Router();

router.get("/country",allCountryController)
router.get("/country/:id",singleCountryController)
router.post("/country",createCountryController)
router.put("/country/:id",updateCountryController)
router.delete("/country/:id",deleteCountryController)

router.get("/feedback",allFeedbackController)
router.get("/feedback/:phone",checkAuth,singleFeedbackController)
router.post("/feedback/:phone",createFeedbackController)
router.put("/feedback/:id",checkAuth,updateFeedbackController)
router.delete("/feedback/:phone",checkAuth,deleteFeedbackController)

router.get("/contact",allContactController)
router.get("/contact/:id",singleContactController)
router.post("/contact",createContactController)
router.put("/contact/:id",updateContactController)
router.delete("/contact/:id",deleteContactController)

router.get("/visitor",allVisitorController)
router.get("/visitor/:id",singleVisitorController)
router.post("/visitor",createVisitorController)
router.put("/visitor/:id",updateVisitorController)
router.delete("/visitor/:id",deleteVisitorController)


module.exports = router;