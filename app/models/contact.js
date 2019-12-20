const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator =require('validator')

const contactSchema = new Schema({
    name: {
        type: String, 
        required: true 
    },
    email: {
        type: String,
        validate:{validator:function(value){
                return validator.isEmail(value)
           },
            message: function(){
               return 'invalid email format'
           }
       }
    }, 
    mobile: {
        type: String, 
        required: true,
        minlength: 10, 
        maxlength: 10 
        // validate:{
        //     validator: function (value){
        //         return validator.isMobile(value)
        //     },
        //     message: function(){
        //         return 'invalid mobile format'
        //     }
        //}
    },
    category: {
        type: String,
        //required: true, 
        enum: ['work', 'home']
    },
user: {
     type:Schema.Types.ObjectId,
     ref:'User',
     required:true
 }
 })



const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact