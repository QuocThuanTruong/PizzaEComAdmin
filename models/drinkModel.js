const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

class Drink {
    constructor(_id, name, avatar, description, cover, images, price) {
        this._id = _id
        this.category = "drink"
        this.name = name
        this.avatar = avatar
        this.description = description
        this.cover = cover
        this.images = images
        this.price = price
    } 
}

exports.list = async () => {
    const drinkCollection = db().collection('drink');

    const drinks = await drinkCollection.find({}).toArray();

    return drinks;
}

exports.get = async (id) => {
    const drinkCollection = db().collection('drink');

    const drink = await drinkCollection.findOne({_id: ObjectId(id)})

    return drink;
}