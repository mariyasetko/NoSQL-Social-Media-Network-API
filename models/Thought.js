const { Schema, model, Types } = require('mongoose');

//REACTIONS ON POSTS BY USERS
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: time => dateFormat(time)
    }
});

//USER POSTS
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
            default: Date.now(),
            get: time => dateFormat(time)
        },
        username: {
            type: String, 
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });
    thoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
    });
    
    const Thought = model('Thought', thoughtSchema);
    module.exports = Thought
