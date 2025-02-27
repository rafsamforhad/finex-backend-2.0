const dotenv = require("dotenv")
dotenv.config("../../../")
const mongoose = require("mongoose")

const configDB=()=>{
    // database url
    let url = `mongodb+srv://mdforhadul44:ekFxmiH72E47vAVH@finex.bpgbkzb.mongodb.net/?retryWrites=true&w=majority&appName=finex`
    
    mongoose
      .connect(url)
      .then((response) => {
        console.log(`database connections successfull`);
      })
      .catch((error) => {
        console.log(`database not connections`);
      });
}

module.exports = configDB