const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

const formidable = require('formidable');
const fs = require('fs')
const path = require('path');
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')

const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

const pizzaModel = require('../models/pizzaModel');

let hbs = require('hbs')

exports.index = async (req, res, next) => {
    const pizza = await pizzaModel.list()

    res.render('pizza/manage', {pizza})
}

exports.delete = async (req, res, next) => {
    console.log(req.body['id'])

    const _ = await pizzaModel.delete(req.body['id'])

    this.index(req, res, next)
}

exports.add = async (req, res, next) => {
    res.render('pizza/add', {})
};

exports.addInfo = async (req, res, next) => {
    fs.mkdirSync(path.join(__dirname, '..', 'tempImages'), { recursive: true })
    const form = formidable({multiples: true, keepExtensions: true, uploadDir : path.join(__dirname, '..', 'tempImages')})

    let a = await form.parse(req, async (err, fields, files) => {
        if (err) {
            return
        }

        let pizza = pizzaModel.modify(fields);
        
        const avatarPicker = files.avatarPicker
        if (avatarPicker.name) {
            await cloudinary.uploader.upload(avatarPicker.path,
                {
                    folder: 'WebFinalProject/Images/pizza/'+pizza._id,
                    public_id: 'avatar',
                    overwrite: true
                }, (err, res) => {
                    pizza.avatar = res.secure_url
                })
        }

        const descriptionPicker1 = files.descriptionPicker1
        if (descriptionPicker1.name) {
            //upload description
            await cloudinary.uploader.upload(descriptionPicker1.path,
                {
                    folder: 'WebFinalProject/Images/pizza/'+pizza._id,
                    public_id: 'description-1',
                    overwrite: true
                }, (err, res) => {
                    pizza.images.push({src: res.secure_url})
                })
        }
    
        const descriptionPicker2 = files.descriptionPicker2
        if (descriptionPicker2.name) {
            //upload description
            await cloudinary.uploader.upload(descriptionPicker2.path,
                {
                    folder: 'WebFinalProject/Images/pizza/'+pizza._id,
                    public_id: 'description-2',
                    overwrite: true
                }, (err, res) => {
                    pizza.images.push({src: res.secure_url})
                })
        }
    
        const descriptionPicker3 = files.descriptionPicker3
        if (descriptionPicker3.name) {
            //upload description
            await cloudinary.uploader.upload(descriptionPicker3.path,
                {
                    folder: 'WebFinalProject/Images/pizza/'+pizza._id,
                    public_id: 'description-3',
                    overwrite: true
                }, (err, res) => {
                    pizza.images.push({src: res.secure_url})
                })
    
        }
    
        const descriptionPicker4 = files.descriptionPicker4
        if (descriptionPicker4.name) {
            //upload description
            await cloudinary.uploader.upload(descriptionPicker4.path,
                {
                    folder: 'WebFinalProject/Images/pizza/'+pizza._id,
                    public_id: 'description-4',
                    overwrite: true
                }, (err, res) => {
                    pizza.images.push({src: res.secure_url})
                })
        }
    
        console.log(pizza)
        const _ = await pizzaModel.insert(pizza)

        rimraf.sync(path.join(__dirname, '..', 'tempImages'))
    })

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
