const mongoose = require('mongoose')


const TableDataSchema = new mongoose.Schema({
    tableData: {
      type: Array,
      required: true,
    }
  })
  
module.exports = mongoose.model('database', TableDataSchema)
