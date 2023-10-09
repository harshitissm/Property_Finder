const mongoose = require('mongoose');
const { Schema } = mongoose;

const PropertySchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true, 
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String, 
        required: true,
    },
    country:{
        type: String, 
        required: true,
    },
    bed:{
        type: Number, 
        required: true,
    },
    bathroom:{
        type: Number, 
        required: true,
    },
    area:{
        type: String, 
        required: true,
    },
    available:{
        type: Boolean,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('property', PropertySchema);