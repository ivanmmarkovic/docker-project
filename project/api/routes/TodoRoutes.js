const express = require('express');
const router = express.Router();
const TodoControllers = require('../controllers/TodoControllers');

router
    .route("/")
        .get(TodoControllers.findAll)
        .post(TodoControllers.create);
    
router
    .route("/:id")
        .patch(TodoControllers.update)
        .delete(TodoControllers.destroy);


module.exports = router;

