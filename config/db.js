const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    // use try catch block to see if there are any errors connecting to mongodb atlas
    try {

        // since 'mongoose.connect();' returns a promise, we are using 'await' to wait for the promise to resolve
        await mongoose.connect(db, {
            useCreateIndex : true,
            useNewUrlParser : true,
            useFindAndModify: false
        });

        console.log("MongoDB Connected...");

    } catch(err) {
        console.log(err.message);

        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;