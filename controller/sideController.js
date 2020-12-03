const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

const sideModel = require('../models/sideModel')

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

exports.index = async (req, res, next) => {
    const sides = await sideModel.list()

    res.render('sides/manage', {sides})
}

exports.delete = async (req, res, next) => {
    console.log(req.body['id'])

    const _ = await sideModel.delete(req.body['id'])

    this.index(req, res, next)
}

exports.add = async (req, res, next) => {
    res.render('sides/add', {})
};

exports.addInfo = async (req, res, next) => {
    fs.mkdirSync(path.join(__dirname, '..', 'tempImages'), { recursive: true })

    const form = formidable({multiples: true, keepExtensions: true, uploadDir : path.join(__dirname, '..', 'tempImages')})

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return
        }

        console.log(fields)
        let side = sideModel.modify(fields);
        
        const avatarPicker = files.avatarPicker
        if (avatarPicker.name) {
            await cloudinary.uploader.upload(avatarPicker.path,
                {
                    folder: 'WebFinalProject/Images/side/'+side._id,
                    public_id: 'avatar',
                    overwrite: true
                }, (err, res) => {
                    side.avatar = res.secure_url
                })
        }

        const descriptionPicker1 = files.descriptionPicker1
        if (descriptionPicker1.name) {
            //upload description
            await cloudinary.uploader.upload(descriptionPicker1.path,
                {
                    folder: 'WebFinalProject/Images/side/'+side._id,
                    public_id: 'description-1',
                    overwrite: true
                }, (err, res) => {
                    side.images.push({src: res.secure_url})
                })
        }
    
        const descriptionPicker2 = files.descriptionPicker2
        if (descriptionPicker2.name) {
            //upload description
            await cloudinary.uploader.upload(descriptionPicker2.path,
                {
                    folder: 'WebFinalProject/Images/side/'+side._id,
                    public_id: 'description-2',
                    overwrite: true
                }, (err, res) => {
                    side.images.push({src: res.secure_url})
                })
        }
    
        const descriptionPicker3 = files.descriptionPicker3
        if (descriptionPicker3.name) {
            //upload description
            await cloudinary.uploader.upload(descriptionPicker3.path,
                {
                    folder: 'WebFinalProject/Images/side/'+side._id,
                    public_id: 'description-3',
                    overwrite: true
                }, (err, res) => {
                    side.images.push({src: res.secure_url})
                })
    
        }
    
        const descriptionPicker4 = files.descriptionPicker4
        if (descriptionPicker4.name) {
            //upload description
            await cloudinary.uploader.upload(descriptionPicker4.path,
                {
                    folder: 'WebFinalProject/Images/side/'+side._id,
                    public_id: 'description-4',
                    overwrite: true
                }, (err, res) => {
                    side.images.push({src: res.secure_url})
                })
        }
    
        console.log(side)
        const _ = await sideModel.insert(side)

        rimraf.sync(path.join(__dirname, '..', 'tempImages'))
    })

    res.render('sides/add', {})
};

exports.update = async (req, res, next) => {
    let sides =  await sideModel.get(req.params.id)

    res.render('sides/update', sides)
};

exports.updateInfo = async (req, res, next) => {
    console.log(req.body);

    let name = req.body['name']
    let description = req.body['description']
    let price = parseInt(req.body['price'])

    const _ = await sideModel.update(req.params.id, name, description, price)

    this.update(req, res, next)
};