const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
}).then(con => {
    console.log(`MongoDB connected: ${con.connection.host}`);
})
};
mongoose.set('strictQuery', true);
module.exports = connectDatabase;