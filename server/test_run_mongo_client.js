const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient("mongodb://admin:admin@0.0.0.0:27017/admin");

client.connect().then(mongoClient=>{
    console.log("Подключение установлено");
    // какие-нибудь операции с базой данных MongoDB
    // закрываем подключение
    mongoClient.close().then(()=>console.log("Подключение закрыто"));
});
