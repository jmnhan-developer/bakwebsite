const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title:String,
    description:String,
    brand:String,
    kidsAge:String,
    price:String,
    shippingFees:String,
    category:String,
    subCategory:String,
    state:String,
    articleSold:Boolean,
    sellerToken:String,
    images:String,
    creationDate:Date,
    isVisible:Boolean
})

const articleModel = mongoose.model('articles',articleSchema)

module.exports = articleModel