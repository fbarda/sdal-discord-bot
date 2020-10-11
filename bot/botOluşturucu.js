const discord = require("discord.js"), { discordToken } = require("../ayarlar");

const bot = new discord.Client();
bot.on("ready", () => console.log("Bot kullanıma hazır!"));
bot.login(discordToken)
    .then(() => console.log("Başarıyla giriş yapıldı"),
        e => { console.error("Giriş yaparken bir hata oluştu!"); throw e; });

module.exports = exports = bot;
