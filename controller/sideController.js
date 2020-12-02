const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

const sideModel = require('../models/sideModel')

let hbs = require('hbs')

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
    let name = req.body['name']
    let description = req.body['description']
    let price = parseInt(req.body['price'])

    const _ =  await sideModel.insert(name, description, price)

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