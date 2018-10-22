const Discord = require("discord.js");

exports.run = async (client, message, args) => {

if(!args[0]) {
  let embed = new Discord.RichEmbed()
   .setColor(client.ayarlar.renk)
   .setTitle(`${client.user.username} | Yardım Sistemi`)
   .setThumbnail(client.user.avatarURL)
   .setDescription(`${client.user.username} yardım sistemine hoş geldiniz.
Lütfen aşağıdaki menülerden birini seçiniz.

\`\`\`[1] Kullanıcı Komutları
[2] Bot Komutları
[3] Yetkili Komutları
[4] Yapımcı Komutları

Herhangi bir menüye girmek için doğru kullanım:
${client.ayarlar.prefix}yardım [1/4]\`\`\`

Toplam komut sayısı: ${client.commands.size}`)
   message.channel.send({embed: embed})
   return
}
if (args[0] === '1') {
  let embed = new Discord.RichEmbed()
  .setColor(client.ayarlar.renk)
  .setTitle('Kullanıcı Komutları')
  .setThumbnail(client.user.avatarURL)
  .setDescription(client.commands.filter(c => c.conf.kategori === "kullanıcı").map(cmd => `\`${cmd.help.name}\` = ${cmd.help.description}`).join("\n"))
  return message.channel.send({embed})
}
if (args[0] === '2') {
  let embed = new Discord.RichEmbed()
  .setColor(client.ayarlar.renk)
  .setTitle('Bot Komutları')
  .setThumbnail(client.user.avatarURL)
  .setDescription(client.commands.filter(c => c.conf.kategori === "bot").map(cmd => `\`${cmd.help.name}\` = ${cmd.help.description}`).join("\n"))
  return message.channel.send({embed})
}
if (args[0] === '3') {
  let embed = new Discord.RichEmbed()
  .setColor(client.ayarlar.renk)
  .setTitle('Yetkili Komutları')
  .setThumbnail(client.user.avatarURL)
  .setDescription(client.commands.filter(c => c.conf.kategori === "yetkili").map(cmd => `\`${cmd.help.name}\` = ${cmd.help.description}`).join("\n"))
  return message.channel.send({embed})
}
if (args[0] === '4') {
  let embed = new Discord.RichEmbed()
  .setColor(client.ayarlar.renk)
  .setTitle('Yapımcı Komutları')
  .setThumbnail(client.user.avatarURL)
  .setDescription(client.commands.filter(c => c.conf.kategori === "yapımcı").map(cmd => `\`${cmd.help.name}\` = ${cmd.help.description}`).join("\n"))
  return message.channel.send({embed})
}

var komut = client.commands.get(args[0]) ? client.commands.get(args[0]) : client.commands.get(client.aliases.get(args[0]))
  
if (args[0]) {
    
    if (client.commands.has(args[0]) ? client.commands.has(args[0]) : client.aliases.has(args[0])) {
      
  var perm = komut.conf.permLevel.toString()
     .replace("0", `Yetki gerekmiyor.`)
      .replace("1", `Mesajları Yönet yetkisi gerekiyor.`)
      .replace("2", `Üyeleri At yetkisi gerekiyor.`)
      .replace("3", `Üyeleri Yasakla yetkisi gerekiyor.`)
      .replace("4", `Yönetici yetkisi gerekiyor.`)
      .replace("5", 'Rolleri Yönet yetkisi gerekiyor.')
      .replace("6", `Bot Yapımcısı yetkisi gerekiyor.`)
      
      const embed = new Discord.RichEmbed()
      .addField("Komut Adı", komut.help.name)
      .addField("Açıklaması", komut.help.description || "Bulunmuyor")
      .addField("Kategorisi", komut.conf.kategori || "Bulunmuyor")
      .addField("Gerekli Yetki", perm || "Bulunmuyor")
      .addField("Doğru Kullanımı", komut.help.usage || "Bulunmuyor")
      .addField("Komutun Diğer Adları", komut.conf.aliases.join(', ') ||"Bulunmuyor")
      .setColor(client.ayarlar.renk)
       message.channel.send({embed: embed})
      
    } else {
      const embed = new Discord.RichEmbed()
        .setDescription(`Botta ${args[0]} isminde bir komut bulunamadı! Botun tüm komutlarını ${client.ayarlar.prefix}yardım yazarak görebilirsin!`)
        .setColor(client.ayarlar.renk)
      message.channel.send({embed: embed})
    }
}
};

exports.conf = {
  enable: true,
  guildOnly: true,
  aliases: ["help", "h", "y"],
  permLevel: 0,
  kategori: "bot"
};

exports.help = {
  name: "yardım",
  description: "Tüm komutları listeler.",
  usage: "yardım veya yardım <komut adı>"
};
