const mongoose = require('mongoose')
const recordSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productId: {
   type: String,
   required: true
  },
  productDesc: {
    type: String,
    required: true
   },
   userId:{
    type: String,
    required: true
   }
})
module.exports = mongoose.model('Record', recordSchema)