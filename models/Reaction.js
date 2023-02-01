const {Schema} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
        },
        reactionBody: {
            type: Schema.Types.String,
            required: true,
            max_length: 280,
        },
        username: {
            type: Schema.Types.String,
            required: true,
        },
        createdAt: {
            type: Schema.Types.Date,
            default: () => new Date().toLocaleDateString(),
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

module.exports = reactionSchema;