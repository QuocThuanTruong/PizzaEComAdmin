const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

class Side {
    constructor(_id, name, avatar, description, cover, images, price) {
        this._id = _id
        this.category = "side"
        this.name = name
        this.avatar = avatar
        this.description = description
        this.cover = cover
        this.images = images
        this.price = price
    } 
}

exports.list = async () => {
    const sideCollection = db().collection('side');
    const sides = await sideCollection.find({}).toArray();
    
    return sides;
}

exports.get = async (id) => {
    const sideCollection = db().collection('side');
    const side = await sideCollection.findOne({_id: ObjectId(id)})

    return side;
}

exports.insert = async (name, description, price) => {
    const sideCollection = db().collection('side');

    const _ = await sideCollection.insertOne({
        "category": "side",
        "name": name,
        "description": description,
        "price": price,
    })
}

exports.delete = async (id) => {
    const sideCollection = db().collection('side');

    const _ = await sideCollection.deleteOne({ '_id': ObjectId(id)})
}

exports.update = async (id, name, description, price) => {
    const drinkCollection = db().collection('side');

    const _ = await drinkCollection.updateOne({'_id': ObjectId(id)}, {$set :{
        "category": "side",
        "name": name,
        "description": description,
        "price": price,
    }})
}