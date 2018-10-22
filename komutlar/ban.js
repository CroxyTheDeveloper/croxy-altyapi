const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, msg, args) => {
    let loglar = msg.guild.channels.find('name', "kayıtlar")
    let kullanici = msg.mentions.members.first();
    let sebep = args.slice(1).join(' ');
    if(!kullanici || !sebep) {
        return msg.reply(`\`${client.ayarlar.prefix}yardım ${exports.help.name}\` yazarak doğru kullanıma bakabilirsin!`)
    }
    if(kullanici.hasPermission('BAN_MEMBERS')) {
        return msg.reply('Bu kullanıcıyla aynı yetkide olduğun için bu kullanıcıyı sunucudan yasaklayamam.')
    }
    if(!loglar) {
      return msg.reply('Sunucuda `kayıtlar` isminde bir kanal olmadığı için bu işlemi gerçekleştiremem!')
    }
    const embed = new Discord.RichEmbed()
    .setColor(client.ayarlar.renk)
    .setTitle('Birisi Sunucudan Yasaklandı!')
    .addField('Yasaklanan', kullanici.user.username)
    .addField('Yasaklayan', msg.author.tag)
    .addField('Sebep', sebep)
    loglar.send({embed: embed})
    kullanici.ban(sebep)
    msg.reply('Başarılı :white_check_mark:')
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasakla'],
  permLevel: 3,
  kategori: 'yetkili'
};

exports.help = {
  name: 'ban',
  description: 'Etiketlediğiniz kullanıcıyı sunucudan atarsınız..',
  usage: 'ban [kullanıcı] [sebep]'
};