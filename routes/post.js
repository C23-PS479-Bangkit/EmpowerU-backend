const { Router } = require("express");
const postController = require("../controllers/postController");

const router = Router();

router.get('/get_list_location', postController.get_list_location);
router.get('/get_location', postController.get_location);
router.post('/create_location', postController.create_location);
router.get('/get_list_comment', postController.get_list_comment);
router.post('/create_comment', postController.create_comment);

module.exports = router;
