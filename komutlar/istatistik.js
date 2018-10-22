const Discord = require("discord.js");
const moment = require('moment');
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');

exports.run = async (client, message, args) => {
  const bot = await client.fetchApplication()

  if(client.ayarlar.yardimcilar[0]) {
    var yardimcilar = ''
    for (var i = 0; i < client.ayarlar.yardimcilar.length; i++) {
      var ayarliolanlar = client.users.get(client.ayarlar.yardimcilar[i]).tag;
      if (i === 0) {
        yardimcilar += ayarliolanlar
      }
      else if (i === client.ayarlar.yardimcilar.length - 1) {
        yardimcilar += " ve " + ayarliolanlar;
      } else {
        yardimcilar += ", " + ayarliolanlar
      }
    }
  }


  var m = await message.channel.send(`İstatistikler hesaplanıyor...`)
  
  var osType = await os.type();

    if (osType === 'Darwin') osType = 'macOS'
    else if (osType === 'Windows') osType = 'Windows'
    else osType = os.type();
  
   
  
    var osBit = await os.arch();
  
    if (osBit === 'x64') osBit = '64 Bit'
    else if (osBit === 'x82') osBit = '32 Bit'
    else osBit = os.arch();
  
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const uptime = moment.duration(client.uptime).format("D [gün], H [saat], m [dakika], s [saniye]");
      
      setTimeout(() => {
        const s = new Discord.RichEmbed()
        .setColor(client.ayarlar.renk)
        .setAuthor(`${client.user.username} | İstatistikler`, client.user.avatarURL)
        .addField('Bot Sahibi', `${bot.owner.tag}`)
        .addField('Yardım Edenler', `${yardimcilar || 'Bilinmiyor'}`)
        .addField("Gecikme Süreleri", `Measj Gecikmesi: ${new Date().getTime() - message.createdTimestamp} \nBot Gecikmesi: ${client.ping}`)
        .addField("Çalışma Süresi", `${uptime}`)
        .addField("Genel İstatistikler", stripIndents`
        **Müzik Çalan Sunucu Sayısı:** ${client.voiceConnections.size.toLocaleString()}
        **Kullanıcı Sayısı:** ${client.users.size.toLocaleString()}
        **Sunucu Sayısı:** ${client.guilds.size.toLocaleString()}
        **Kanal Sayısı:** ${client.channels.size.toLocaleString()}
        `)
        .addField("Versiyonlar", stripIndents`
        **Bot:** v${client.ayarlar.versiyon || "Bilinmiyor"}
        **Discord.JS:** v${Discord.version}
        **Node.JS:** ${process.version}
        `)
        .addField("Bellek Kullanımı", `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toLocaleString()} MB`)
        .addField("İşletim Sistemi", `${osType} ${osBit}`)
        .addField("İşlemci Kullanımı", `%${percent.toFixed(2)}`)
        .addField("İşlemci", `\`\`\`xl\n${os.cpus().map(i => `${i.model}`)[0]}\n\`\`\``)
        return m.edit(s)
        
        }, 3000)
        
    });
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["i", "stat", "istatistikler", "stats"],
  permLevel: 0,
  kategori: "bot"
};

exports.help = {
  name: "istatistik",
  description: "Botun istatistiklerini gösterir..",
  usage: "istatistik"
};