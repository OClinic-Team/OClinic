const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/online_clinic', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('ket noi thanh cong');
  } catch (error) {
    console.log('Loi!!!!');
  }
}

module.exports = { connect };
