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

exports.insert = async (drink) => {
    const drinkCollection = db().collection('drink');

    const _ = await drinkCollection.insertOne( {
        "_id": ObjectId(drink._id),
        "category": drink.category,
        "name": drink.name,
        "avatar": drink.avatar,
        "description": drink.description,
        "images": drink.images,
        "price": drink.price,
    })
}

exports.delete = async (id) => {
    const drinkCollection = db().collection('drink');

    const _ = await drinkCollection.deleteOne({ '_id': ObjectId(id)})
}

exports.update = async (drink) => {
    const drinkCollection = db().collection('drink');
    
    const _ = await drinkCollection.updateOne({'_id': drink._id}, {$set :{
        "category": drink.category,
        "name": drink.name,
        "avatar": drink.avatar,
        "description": drink.description,
        "images": drink.images,
        "price": drink.price,
    }})
}


exports.modify = (fields) => {
    let id = new ObjectId()
    let name = fields.name
    let description = fields.description
    let price = parseInt(fields.price)

    return {
        _id: id,
        category: "drink",
        name: name,
        avatar: "",
        description: description,
        images: [],
        price: price,
    }
}