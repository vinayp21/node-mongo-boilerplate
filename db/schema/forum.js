var mongoose = require('mongoose');
var Schema = mongoose.Schema;


let forumSchema= new Schema({
  question:String,
  topic:String,
  askedBy:String,
  dateTime:Date,
  answer:[{
    id:String,
    answer:String,
    answerBy:String,
    dateTime:Date
  }]
});

forumSchema.statics={
  getAllLaptops: () => {
    
  },
  getAllPrinter: () => {

  }

}

let forum = mongoose.model('forum',forumSchema);
module.exports= forum;
