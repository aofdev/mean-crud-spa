var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    name: String,
    email: String,
    number:String
});

module.exports = mongoose.model('Test',testSchema);