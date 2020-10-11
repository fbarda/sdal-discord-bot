const testEt = require("../üniteTestleri/ayarlar");
const { env } = require("process");

/**
 * @returns {Ayarlar}
 */
function ayarlarıGetir() {
    const buluttaMı = env.buluttaMı;
    let ayarlar = { buluttaMı };
    const genelAyarlar = genelAyarlarıGetir();
    Object.assign(ayarlar, genelAyarlar);
    if (buluttaMı) {
        const bulutAyarları = bulutAyarlarınıGetir();
        Object.assign(ayarlar, bulutAyarları);
    } else {
        const yerelAyarlar = yerelAyarlarıGetir();
        Object.assign(ayarlar, yerelAyarlar);
        if (typeof ayarlar !== "object") throw "Ayarlar dosyasını gözden geçirin, yersiz değişim yapılmış.";
    }
    testEt(ayarlar);
    return ayarlar;
}

function yerelAyarlarıGetir() {
    return require("./yerelAyarlar.json");
}

function bulutAyarlarınıGetir() {
    return {
        discordToken: env.discordToken,
        postgreURL: env.DATABASE_URL
    };
}

function genelAyarlarıGetir() {
    require("./genelAyarlar.json");
}

module.exports = exports = ayarlarıGetir();

/**@typedef Ayarlar - Botun kullanacağı bütün ayarlar burada belirtilir.
 * @property {boolean} buluttaMı - Botun şu anda bulutta olup olmadığını belirler.
 * @property {string} discordToken - Botun Discord'a bağlanmak için kullandığı tokeni belirtir.
 * @property {string} postgreURL - Botun PostgreSQL veritabanına bağlanmak için kullanacağı URL'yi belirtir.
 *
 * @property {[{Sınıf}]} sınıflar - Botun kullanacağı sınıfları ve sınıf şubelerini belirler.
 * @property {string} önek - Botun komut mesajlarında arayacığı ön-eki belirtir
 */

/**@typedef Sınıf
 * @property {number} yıl - Sınıfın kaçıncı öğretim yılı olduğunu belirtir.
 * @property {string[]} şubeler - Sınıfın şubelerini listeler
 */
