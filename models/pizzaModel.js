const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

class Pizza {
    constructor(_id, name, avatar, description, cover, images, price, kind, size, dough, toping) {
        this._id = _id
        this.category = "pizza"
        this.name = name
        this.avatar = avatar
        this.description = description
        this.cover = cover
        this.images = images
        this.price = price
        this.kind = kind
        this.size = size
        this.dough = dough
        this.toping = toping
    } 
}

exports.list = async () => {
    const pizzaCollection = db().collection('pizza');

    const pizzas = await pizzaCollection.find({}).toArray();

    return pizzas;
}

exports.get = async (id) => {
    const pizzaCollection = db().collection('pizza');

    const pizza = await pizzaCollection.findOne({_id: ObjectId(id)})

    return pizza;
}

exports.delete = async (id) => {
    const pizzaCollection = db().collection('pizza');

    const _ = await pizzaCollection.deleteOne({ '_id': ObjectId(id)})
}

exports.update = async (id, name, description, price, kind, sizes, doughs, topings) => {
    const pizzaCollection = db().collection('pizza');

    const _ = await pizzaCollection.updateOne({'_id': ObjectId(id)}, {$set :{
        "category": "pizza",
        "name": name,
        "description": description,
        "price": price,
        "kind": kind,
        "size": sizes,
        "dough": doughs,
        "toping": topings
    }})
}