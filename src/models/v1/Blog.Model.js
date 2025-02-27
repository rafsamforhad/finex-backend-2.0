const mongoose = require("mongoose");


const blogSectionSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        default:""
    },
    titleBn:{
        type:String,
        require:true,
        default:""
    },
    discraption:{
        type:String,
        require:true,
        default:""
    },
    discraptionBn:{
        type:String,
        require:true,
        default:""
    },
    image:{
        type:String,
        require:true,
        default:""
    },
    link:{
        type:String,
        require:true,
        default:""
    },
    id:{
        type:String,
        require:true,
      
    }

},{ _id: false });




const blogSchema = new mongoose.Schema({
    author:{
        type:Object,
        require:true,
        name:{
            type:String,
            require:true,
        },
        role:{
            type:String,
            require:true,
        },
    },
    title:{
        type:String,
        require:true,
        default:""
    },
    
    titleBn:{
        type:String,
        require:true,
        default:""
    },
    blog:[blogSectionSchema]

}, {
  timestamps: true,
});

module.exports = mongoose.model("Blog", blogSchema);
