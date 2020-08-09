const mongoose = require('mongoose');


const dbConection = async() => {

    try {
       await mongoose.connect('mongodb://localhost:27017/calendar', 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify: false
        });
        console.log('db corriendo');
    } catch (error) {
       throw new Error(error);   
    }


};

module.exports = {
    dbConection
}
