const {Thought, User} = require('../models');

const thoughtsController = {

    // To create a new thought
    createThoughts({params, body}, res) {
        console.log(body);
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought with this particular ID!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err)); 
    },
    // To get all available Thoughts
    getAllThoughts(req,res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        // .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // To get a certain thought by Id
    getThoughtsById({params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // To update a thought by ID
    updateThoughts({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
                res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // To delete a thought by Id
    deleteThoughts({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // To add a new reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))

    },

    // To delete a reaction by ID
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'No thoughts with this particular ID!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = thoughtsController;