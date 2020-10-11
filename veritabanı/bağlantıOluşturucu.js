const postgre = require("pg"), { postgreURL } = require("../ayarlar");

const veritabanı = new postgre.Client({ connectionString: postgreURL, connectionTimeoutMillis: 3000 });
veritabanı.connect().then(() => console.log("Veritabanına bağlandı!"),
    hata => console.log("Veritabanına bağlanırken bir hata oluştu!\n", hata));

module.exports = exports = veritabanı;
