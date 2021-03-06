const router = require('express').Router();

const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// -- Directs to: /api/thoughts <GET>
router.route('/').get(getAllThoughts);

// -- Directs to: /api/thoughts <POST>
router.route('/:userId').post(createThoughts);

// -- Directs to: /api/thoughts/:id <GET, PUT>
router.route('/:id').get(getThoughtsById).put(updateThoughts)

// -- Directs to: /api/thoughts/:userId/:thoughtId <DELETE>
router.route('/:userId/:thoughtId').delete(deleteThoughts); 

// -- Directs to: /api/thoughts/:thoughtId/reactions <POST>
router.route('/:thoughtId/reactions').post(addReaction);

// -- Directs to: /api/thoughts/:thoughtId/reactionId <DELETE>
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export module router
module.exports = router;