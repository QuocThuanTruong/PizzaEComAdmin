const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

const sideModel = require('../models/sideModel')

const formidable = require('formidable');
const fs = require('fs')
const path = require('path');
const rimraf = require('rimraf')
const mkdirp = require('mkdirp')
const hbs = require('hbs')

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

    await form.parse(req, async (err, fields, files) => {
        if (err) {
            return
        }

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
        } else {
            side.images.push({src: ""})
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
        } else {
            side.images.push({src: ""})
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
        } else {
            side.images.push({src: ""})
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
        } else {
            side.images.push({src: ""})
        }
    
        console.log(side)
        const _ = await sideModel.insert(side)

        rimraf.sync(path.join(__dirname, '..', 'tempImages'))
    })

    res.render('sides/add', {})
};

exports.update = async (req, res, next) => {
    let side =  await sideModel.get(req.params.id)

    hbs.handlebars.registerHelper("hasImage", () => {
        return side.images.length > 0
    })

    res.render('sides/update', side)
};

exports.updateInfo = async (req, res, next) => {
    fs.mkdirSync(path.join(__dirname, '..', 'tempImages'), { recursive: true })
    const form = formidable({multiples: true, keepExtensions: true, uploadDir : path.join(__dirname, '..', 'tempImages')})

    let oldside =  await sideModel.get(req.params.id)

    await form.parse(req, async (err, fields, files) => {
        if (err) {
            return
        }

        let side = sideModel.modify(fields);
        side._id = ObjectId(req.params.id)

        const avatarPicker = files.avatarPicker
        if (avatarPicker) {
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
            else {
                side.avatar = ""
            }
        } else {
            side.avatar = oldside.avatar
        }

        const descriptionPicker1 = files.descriptionPicker1
        if (descriptionPicker1) {
            if (descriptionPicker1.name) {
                await cloudinary.uploader.upload(descriptionPicker1.path,
                    {
                        folder: 'WebFinalProject/Images/side/'+side._id,
                        public_id: 'description-1',
                        overwrite: true
                    }, (err, res) => {
                        side.images[0] = {src: res.secure_url}
                    })
            }
            else {
                side.images[0] = {src: ""}
            }
        } else {
            side.images[0] = oldside.images[0]
        }
    
        const descriptionPicker2 = files.descriptionPicker2
        if (descriptionPicker2) {
            if (descriptionPicker2.name) {
                await cloudinary.uploader.upload(descriptionPicker2.path,
                    {
                        folder: 'WebFinalProject/Images/side/'+side._id,
                        public_id: 'description-2',
                        overwrite: true
                    }, (err, res) => {
                        side.images[1] = {src: res.secure_url}
                    })
            }
            else {
                side.images[1] = {src: ""}
            }
        } else {
            side.images[1] = oldside.images[1]
        }
    
        const descriptionPicker3 = files.descriptionPicker3
        if (descriptionPicker3) {
            if (descriptionPicker3.name) {
                await cloudinary.uploader.upload(descriptionPicker3.path,
                    {
                        folder: 'WebFinalProject/Images/side/'+side._id,
                        public_id: 'description-3',
                        overwrite: true
                    }, (err, res) => {
                        side.images[2] = {src: res.secure_url}
                    })
            }
            else {
                side.images[2] = {src: ""}
            }
        } else {
            side.images[2] = oldside.images[2]
        }
    
        const descriptionPicker4 = files.descriptionPicker4
        if (descriptionPicker4) {
            if (descriptionPicker4.name) {
                await cloudinary.uploader.upload(descriptionPicker4.path,
                    {
                        folder: 'WebFinalProject/Images/side/'+side._id,
                        public_id: 'description-4',
                        overwrite: true
                    }, (err, res) => {
                        side.images[3] = {src: res.secure_url}
                    })
            }
            else {
                side.images[3] = {src: ""}
            }
        } else {
            side.images[3] = oldside.images[3]
        }
    
        //console.log(side)
        const _ = await sideModel.update(side)

        rimraf.sync(path.join(__dirname, '..', 'tempImages'))

        this.update(req, res, next)
    })

    //console.log(req.body)
   
};