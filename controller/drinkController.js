const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

const drinkModel = require('../models/drinkModel')

let hbs = require('hbs')

exports.index = async (req, res, next) => {
    const drinks = await drinkModel.list()

    res.render('drinks/manage', {drinks})
}

exports.delete = async (req, res, next) => {
    console.log(req.body['id'])

    const _ = await drinkModel.delete(req.body['id'])

    this.index(req, res, next)
}

exports.add = async (req, res, next) => {
    res.render('drinks/add', {})
};

exports.addInfo = async (req, res, next) => {
    let name = req.body['name']
    let description = req.body['description']
    let price = parseInt(req.body['price'])

    const _ =  await drinkModel.insert(name, description, price)

    res.render('drinks/add', {})
};

exports.update = async (req, res, next) => {
    let drinks =  await drinkModel.get(req.params.id)

    res.render('drinks/update', drinks)
};

exports.updateInfo = async (req, res, next) => {
    console.log(req.body);

    let name = req.body['name']
    let description = req.body['description']
    let price = parseInt(req.body['price'])

    const _ = await drinkModel.update(req.params.id, name, description, price)

    this.update(req, res, next)
};