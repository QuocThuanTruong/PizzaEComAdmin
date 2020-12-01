const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

const pizzaModel = require('../models/pizzaModel');
const { JSDOM } = require('jsdom');

exports.index = async (req, res, next) => {
    const pizza = await pizzaModel.list()

    res.render('pizza/manage', {pizza})
}

exports.add = async (req, res, next) => {
    res.render('pizza/add', {})
};

exports.confirmAdd = async (req, res, next) => {
    let name = req.body['name']
    let description = req.body['description']
    let price = parseInt(req.body['price'])
    let kind = req.body['kind']
    
    console.log()

};

exports.update = async (req, res, next) => {
    res.render('pizza/update', {})
};

