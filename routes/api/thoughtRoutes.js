const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// /api/thoughts/:thoughtId/reactions/
router.route('/:thoughtId/reactions').post(addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionid
router.route('/:thoughtId/reactions/:reactionId').put(deleteReaction);

module.exports = router;