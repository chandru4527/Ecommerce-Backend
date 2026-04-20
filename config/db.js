const mongoose = require("mongoose")


const mongourl = process.env.MONGO_URL

const connectDb = async () => {
    try {
        await mongoose.connect(mongourl)
        console.log("db is connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb;