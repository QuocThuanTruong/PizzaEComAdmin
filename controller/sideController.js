const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

const sideModel = require('../models/sideModel')

exports.index = async (req, res, next) => {
    const sides = await sideModel.list()

    res.render('sides/manage', {sides})
}

exports.add = async (req, res, next) => {
    res.render('sides/add', {})
};

exports.update = async (req, res, next) => {
    res.render('sides/update', {})
};
