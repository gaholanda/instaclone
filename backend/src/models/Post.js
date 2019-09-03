const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

PostSchema.plugin(paginate)

const PostModel = mongoose.model('Post', PostSchema)

module.exports = PostModel