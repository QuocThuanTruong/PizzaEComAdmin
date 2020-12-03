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

exports.insert = async (side) => {
    const sideCollection = db().collection('side');

    const _ = await sideCollection.insertOne( {
        "_id": ObjectId(side._id),
        "category": side.category,
        "name": side.name,
        "avatar": side.avatar,
        "description": side.description,
        "images": side.images,
        "price": side.price,
    })
}

exports.delete = async (id) => {
    const sideCollection = db().collection('side');

    const _ = await sideCollection.deleteOne({ '_id': ObjectId(id)})
}

exports.update = async (side) => {
    const sideCollection = db().collection('side');
    
    const _ = await sideCollection.updateOne({'_id': side._id}, {$set :{
        "category": side.category,
        "name": side.name,
        "avatar": side.avatar,
        "description": side.description,
        "images": side.images,
        "price": side.price,
    }})
}

exports.modify = (fields) => {
    let id = new ObjectId()
    let name = fields.name
    let description = fields.description
    let price = parseInt(fields.price)

    return {
        _id: id,
        category: "side",
        name: name,
        avatar: "",
        description: description,
        images: [],
        price: price,
    }
}