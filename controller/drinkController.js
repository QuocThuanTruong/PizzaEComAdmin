const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

const drinkModel = require('../models/drinkModel')

exports.index = async (req, res, next) => {
    const drinks = await drinkModel.list()

    res.render('drinks/manage', {drinks})
}

exports.add = async (req, res, next) => {
    res.render('drinks/add', {})
};

exports.update = async (req, res, next) => {
    res.render('drinks/update', {})
};
