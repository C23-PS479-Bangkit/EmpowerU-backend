const { Router } = require("express");
const postController = require("../controllers/postController");

const router = Router();

router.get('/get_list_location', postController.get_list_location);
router.post('/create_location', postController.create_location);
router.post('/create_comment', postController.create_comment);
router.get('/get_location', postController.get_location);
module.exports = router;
