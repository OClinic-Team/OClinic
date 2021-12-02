const mongoose = require('mongoose');
//database local
//const MONGO_URI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
//database cloud
//const MONGO_URI = 'mongodb+srv://online-clinic-project:123321123321@cluster.mjikz.mongodb.net/test?authSource=admin&replicaSet=atlas-10rvle-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
async function connect() {
    //const MONGO_URI = 'mongodb+srv://online-clinic-project:123321123321@cluster.mjikz.mongodb.net/Online-Clinic'
    const MONGO_URI = 'mongodb://localhost:27017/online_clinic'

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            // useCreateIndex: true,
        });
        console.log('ket noi thanh cong');
    } catch (error) {
        console.log('Loi!!!!');
    }
}


module.exports = { connect };