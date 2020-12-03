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

exports.insert = async (pizza) => {
    const pizzaCollection = db().collection('pizza');

    const _ = await pizzaCollection.insertOne( {
        "_id": ObjectId(pizza._id),
        "category": pizza.category,
        "name": pizza.name,
        "avatar": pizza.avatar,
        "description": pizza.description,
        "images": pizza.images,
        "price": pizza.price,
        "kind": pizza.kind,
        "size": pizza.size,
        "dough": pizza.dough,
        "toping": pizza.toping
    })
}

exports.delete = async (id) => {
    const pizzaCollection = db().collection('pizza');

    const _ = await pizzaCollection.deleteOne({ '_id': ObjectId(id)})
}

exports.update = async (pizza) => {
    const pizzaCollection = db().collection('pizza');

    const _ = await pizzaCollection.updateOne({'_id': pizza._id}, {$set :{
        "category": pizza.category,
        "name": pizza.name,
        "avatar": pizza.avatar,
        "description": pizza.description,
        "images": pizza.images,
        "price": pizza.price,
        "kind": pizza.kind,
        "size": pizza.size,
        "dough": pizza.dough,
        "toping": pizza.toping
    }})
}

exports.modify = (fields) => {
    let id = new ObjectId()
    let name = fields.name
    let description = fields.description
    let price = parseInt(fields.price)
    let kind = fields.kind

    let sizes = []

    if (fields.size1 == 'on') {
        sizes.push({
            radius: "25",
            weight: "250g"
        })
    }

    if (fields.size2 == 'on') {
        sizes.push({
            radius: "30",
            weight: "450g"
        })
    }

    if (fields.size3 == 'on') {
        sizes.push({
            radius: "40",
            weight: "550g"
        })
    }

    let doughs = []

    if (fields.dough1 == 'on') {
        doughs.push({
            name: "mỏng",
        })
    }

    if (fields.dough2 == 'on') {
        doughs.push({
            name: "dày",
        })
    }

    let topings = []

    if (fields.toping1 == 'on') {
        topings.push({
            name: "ớt chuông",
            image: "toping-1.jpg"
        })
    }

    if (fields.toping2 == 'on') {
        topings.push({
            name: "thịt xông khói",
            image: "toping-2.jpg"
        })
    }

    if (fields.toping3 == 'on') {
        topings.push({
            name: "nấm",
            image: "toping-3.jpg"
        })
    }

    if (fields.toping4 == 'on') {
        topings.push({
            name: "cải xà lách",
            image: "toping-4.jpg"
        })
    }

    return {
        _id: id,
        category: "pizza",
        name: name,
        avatar: "",
        description: description,
        images: [],
        price: price,
        kind: kind,
        size: sizes,
        dough: doughs,
        toping: topings
    }
}