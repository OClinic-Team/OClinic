const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://online-clinic-project:123321123321@cluster.mjikz.mongodb.net/test?authSource=admin&replicaSet=atlas-10rvle-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
async function connect() {
<<<<<<< HEAD
  const moongoURI ='mongodb+srv://online-clinic-project:123321123321@cluster.mjikz.mongodb.net/test?authSource=admin&replicaSet=atlas-10rvle-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
  const moongo ='mongodb://localhost:27017/online_clinic'
  
  try {
    await mongoose.connect(moongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('ket noi thanh cong');
  } catch (error) {
    console.log('Loi!!!!');
  }
=======
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('ket noi thanh cong');
    } catch (error) {
        console.log('Loi!!!!');
    }
>>>>>>> 5f630530c9008c9ea82637d4077806de7cf8be16
}

module.exports = { connect };