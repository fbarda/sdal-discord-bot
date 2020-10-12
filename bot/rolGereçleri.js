
/**
 * @returns {Promise<void>}
 * @param {DiscordGuildMember} kullanıcı
 * @param {DiscordRole} atanacakRol
 */
async function kullanıcıyaRolAta(kullanıcı, atanacakRol) {
    const kullanıcıRolleri = [...kullanıcı.roles.cache.array()];
    if (kullanıcıRolleri.some(rol => atanacakRol === rol)) return; //Rol zaten atanmış, işleme gerek yok.
    kullanıcıRolleri.push(atanacakRol);
    await kullanıcı.edit({ roles: kullanıcıRolleri });
    return;
}
exports.kullanıcıyaRolAta = kullanıcıyaRolAta;

/**
 * @returns {Promise<void>}
 * @param {DiscordGuildMember} kullanıcı - Rolün kaldırılacağı kullanıcı.
 * @param {DiscordRole} kaldırılacakRol - Kaldırılacak rol.
 */
async function kullanıcıRolünüKaldır(kullanıcı, kaldırılacakRol) {
    const kullanıcıRolleri = kullanıcı.roles.cache.array();
    if (!kullanıcıRolleri.some(rol => rol === kaldırılacakRol)) return; //Kullanıcıda zaten o rol yok, işleme gerek yok.
    await kullanıcı.edit({ roles: kullanıcıRolleri.filter(rol => rol !== kaldırılacakRol) });
    return;
}
exports.kullanıcıRolünüKaldır = kullanıcıRolünüKaldır;


const discordRolİzinleri = require("discord.js").Permissions.FLAGS;
/**@type {DiscordRolVerisi} */
const rolTaslağı = {
    mentionable: false,
    hoist: false,
    permissions: [
        discordRolİzinleri.CONNECT,
        discordRolİzinleri.READ_MESSAGE_HISTORY,
        discordRolİzinleri.SEND_MESSAGES,
        discordRolİzinleri.SPEAK,
        discordRolİzinleri.STREAM,
        discordRolİzinleri.VIEW_CHANNEL
    ]
};

/**
 * @returns {Promise<Role>} Eklenen yeni rol.
 * @param {DiscordRolYöneticisi} rolYöneticisi - Rolün ekleneceği guild'in rol yöneticisi. `guild.roles` ile erişilebilir.
 * @param {string} isim - Yeni rolün ismi.
 * @param {number[]} [ekRoller] - İsteğe bağlı ek roller. Roller `require("discord.js").Permissions.FLAGS` objesinden alınabilir.
 */
async function rolOluştur(rolYöneticisi, isim, ekRoller) {
    /**@type {DiscordRolVerisi} */
    const yeniRolVerisi = { name: isim };
    Object.assign(yeniRolVerisi, rolTaslağı);
    yeniRolVerisi.permissions = [...yeniRolVerisi.permissions];//Referansı kopartarak taslağı değiştirmeyi engelleriz.

    if (ekRoller instanceof Array && ekRoller.every(potansiyelRol => typeof potansiyelRol === "number")) {
        yeniRolVerisi.permissions.push(...ekRoller);
    }

    return rolYöneticisi.create({ data: yeniRolVerisi });
}
exports.rolOluştur = rolOluştur;



//Kısayol atamaları
/**@typedef {import('discord.js').GuildMember} DiscordGuildMember */
/**@typedef {import('discord.js').Guild} DiscordGuild */
/**@typedef {import('discord.js').Role} DiscordRole*/
/**@typedef {import('discord.js').RoleData} DiscordRolVerisi */
/**@typedef {import('discord.js').RoleManager DiscordRolYöneticisi} */
