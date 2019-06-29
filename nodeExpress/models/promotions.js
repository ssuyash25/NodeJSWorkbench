const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const promoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true    
    },
    featured: {
        type: Boolean,
        default:false      
    }
}, {
    timestamps: true
});

var Promos = mongoose.model('Promo', promoSchema);

module.exports = Promos;