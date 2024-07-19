const mongoose = require("mongoose");
const initData = require("./data.js");
const Listning = require("../models/listing.js");

let MONGOOSE_URL = "mongodb://127.0.0.1:27017/clothing";


main()
.then(() => {
    console.log("connected to DataBase");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGOOSE_URL);
}

const initDB = async () => {
    await Listning.deleteMany({});
    initData.data =  initData.data.map((obj) => ({...obj , owner:"669782ee04fc0af610248637"}))
    await Listning.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();













