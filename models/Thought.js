const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

/* Declare reaction schema */
const reactionSchema = new Schema(
    {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now,
        get: (createdAtDT) => moment(createdAtDT).format('MMM DD, YYYY [at] hh:mm a')
    }
    },
    {
    toJSON: {
        getters: true
    } 
    }
);

/* Declare thought schema */
const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // using moment to convert date time
        get: (createdAtDT) => moment(createdAtDT).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    // Use reactionSchema to validate data
    reactions: [reactionSchema]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
)

// To get the total number of reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// To create the Thought model using the ThoughtSchema
const Thought = model('Thought', thoughtSchema);

// Export Thoughts Module
module.exports = Thought;