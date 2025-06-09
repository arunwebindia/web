const mongoose = require('mongoose');
const db_connection = (url)=>{
    mongoose.connect(url,{dbName:'arunweb_DB'})
    .then(()=>console.log('Data base connected.'))
    .catch((e)=>console.log("Database does not connect showing this error:",e));
}

module.exports = db_connection;