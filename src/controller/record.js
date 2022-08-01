const Record = require('../models/record')
const mongoose = require('mongoose')
const _ = require('lodash')

function create(req, res, next) {
    const productId = req.body.productId;
    const productName = req.body.productName;
    const productDesc = req.body.productDesc;
    const userId = req.user.userId;
    const record = new Record({
        productId,
        productName,
        productDesc,
        userId,
    })
    record.save().then((data) => {
        res.send({ success: "Saved Record" })
    })
}

function view(req, res, next) {
    const userId = req.user.userId;
    Record.find({userId}).then((data) => {
        res.send({ data: data})
    })
}

function update(req, res, next) {
    Record.findByIdAndUpdate(req.params.id, req.body, (err, record) => {
        if (err) {
            return res.status(500).send({ error: "Problem with Updating the recored " })
        };
        res.send({ success: "Updation successfull"});
    })
}

function remove(req, res, next) {
    Record.findByIdAndDelete(req.params.id, req.body, (err, record) => {
        if (err) {
            return res.status(500).send({ error: "Problem with Updating the recored " })
        };
        res.send({ success: "Deletion successfull" });
    })
}

async function deleteByIds(req,res,next){
    const productIds= req.body.deleteByIds
    const userId = req.user.userId;
    Record.deleteMany({ _id : { $in: productIds }}).then(data=> {
        res.send({ success: "Deletion successfull" });
    })
}
module.exports.create = create
module.exports.view = view
module.exports.update = update
module.exports.remove = remove
module.exports.deleteByIds = deleteByIds