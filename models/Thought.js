const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: Schema.Types.String,
            required: true,
            max_length: 280,
        },
        createdAt: {
            type: Schema.Types.Date,
            default: () => new Date().toLocaleDateString(),
        },
        username: {
            type: Schema.Types.String,
            required: true,
        },
        reactions: [reactionSchema]
    },
)

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;