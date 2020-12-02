const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

const pizzaModel = require('../models/pizzaModel');

exports.index = async (req, res, next) => {
    const pizza = await pizzaModel.list()


    res.render('pizza/manage', {pizza})
}

exports.add = async (req, res, next) => {
    res.render('pizza/add', {})
};

exports.addInfo = async (req, res, next) => {
    let name = req.body['name']
    let description = req.body['description']
    let price = parseInt(req.body['price'])
    let kind = req.body['kind']

    let sizes = []

    if (req.body['size1'] == 'true') {
        sizes.push({
            radius: "25",
            weight: "250g"
        })
    }

    if (req.body['size2'] == 'true') {
        sizes.push({
            radius: "30",
            weight: "450g"
        })
    }

    if (req.body['size3'] == 'true') {
        sizes.push({
            radius: "40",
            weight: "550g"
        })
    }

    let doughs = []

    if (req.body['dough1'] == 'true') {
        doughs.push({
            name: "mỏng",
        })
    }

    if (req.body['dough2'] == 'true') {
        doughs.push({
            name: "dày",
        })
    }

    let topings = []

    if (req.body['toping1'] == 'true') {
        topings.push({
            name: "ớt chuông",
            image: "toping-1.jpg"
        })
    }

    if (req.body['toping2'] == 'true') {
        topings.push({
            name: "thịt xông khói",
            image: "toping-2.jpg"
        })
    }

    if (req.body['toping3'] == 'true') {
        topings.push({
            name: "nấm",
            image: "toping-3.jpg"
        })
    }

    if (req.body['toping4'] == 'true') {
        topings.push({
            name: "cải xà lách",
            image: "toping-4.jpg"
        })
    }

    const pizzaCollection = db().collection('pizza');

    const result = await pizzaCollection.insertOne( {
        "category": "pizza",
        "name": name,
        "description": description,
        "price": price,
        "kind": kind,
        "size": sizes,
        "dough": doughs,
        "toping": topings
    })

    console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    );

    res.render('pizza/add', {})
};

exports.update = async (req, res, next) => {
    let pizza =  await pizzaModel.get(req.params.id)

    hbs.handlebars.registerHelper("isTraditional", () => {
        return pizza.kind === "Truyền thống"
    })
    
    hbs.handlebars.registerHelper("isSea", () => {
        return pizza.kind === "Hải sản"
    })
    
    hbs.handlebars.registerHelper("isMixed", () => {
        return pizza.kind === "Thập cẩm"
    })

    hbs.handlebars.registerHelper("size1", () => {
        return pizza.size.filter(s => s.radius === '25').length > 0
    })

    hbs.handlebars.registerHelper("size2", () => {
        return pizza.size.filter(s => s.radius === '30').length > 0
    })

    hbs.handlebars.registerHelper("size3", () => {
        return pizza.size.filter(s => s.radius === '40').length > 0
    })

    hbs.handlebars.registerHelper("dough1", () => {
        return pizza.dough.filter(d => d.name === 'mỏng').length > 0
    })

    hbs.handlebars.registerHelper("dough2", () => {
        return pizza.dough.filter(d => d.name === 'dày').length > 0
    })

    hbs.handlebars.registerHelper("toping1", () => {
        return pizza.toping.filter(t => t.name === 'ớt chuông').length > 0
    })

    hbs.handlebars.registerHelper("toping2", () => {
        return pizza.toping.filter(t => t.name === 'thịt xông khói').length > 0
    })

    hbs.handlebars.registerHelper("toping3", () => {
        return pizza.toping.filter(t => t.name === 'nấm').length > 0
    })

    hbs.handlebars.registerHelper("toping4", () => {
        return pizza.toping.filter(t => t.name === 'cải xà lách').length > 0
    })

    res.render('pizza/update', pizza)
};

exports.updateInfo = async (req, res, next) => {
    console.log(req.body);

    let name = req.body['name']
    let description = req.body['description']
    let price = parseInt(req.body['price'])
    let kind = req.body['kind']

    let sizes = []

    if (req.body['size1'] == 'true') {
        sizes.push({
            radius: "25",
            weight: "250g"
        })
    }

    if (req.body['size2'] == 'true') {
        sizes.push({
            radius: "30",
            weight: "450g"
        })
    }

    if (req.body['size3'] == 'true') {
        sizes.push({
            radius: "40",
            weight: "550g"
        })
    }

    let doughs = []

    if (req.body['dough1'] == 'true') {
        doughs.push({
            name: "mỏng",
        })
    }

    if (req.body['dough2'] == 'true') {
        doughs.push({
            name: "dày",
        })
    }

    let topings = []

    if (req.body['toping1'] == 'true') {
        topings.push({
            name: "ớt chuông",
            image: "toping-1.jpg"
        })
    }

    if (req.body['toping2'] == 'true') {
        topings.push({
            name: "thịt xông khói",
            image: "toping-2.jpg"
        })
    }

    if (req.body['toping3'] == 'true') {
        topings.push({
            name: "nấm",
            image: "toping-3.jpg"
        })
    }

    if (req.body['toping4'] == 'true') {
        topings.push({
            name: "cải xà lách",
            image: "toping-4.jpg"
        })
    }

    const _ = await pizzaModel.update(req.params.id, name, description, price, kind, sizes, doughs, topings)

    this.update(req, res, next)
};
