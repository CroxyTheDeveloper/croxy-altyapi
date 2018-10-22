const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, msg, args) => {
	let loglar = msg.guild.channels.find('name', "kayıtlar")
    let kullanici = msg.mentions.members.first();
    let sebep = args.slice(1).join(' ');
    if(!kullanici || !sebep) {
        return msg.reply(`\`${client.ayarlar.prefix}yardım ${exports.help.name}\` yazarak doğru kullanıma bakabilirsin!`)
    }
    if(kullanici.hasPermission('KICK_MEMBERS')) {
        return msg.reply('Bu kullanıcıyla aynı yetkide olduğun için bu kullanıcıyı sunucudan atamam.')
    }
    if(!loglar) {
    	return msg.reply('Sunucuda `kayıtlar` isminde bir kanal olmadığı için bu işlemi gerçekleştiremem!')
    }
    const embed = new Discord.RichEmbed()
    .setColor(client.ayarlar.renk)
    .setTitle('Birisi Sunucudan Atıldı!')
    .addField('Atılan', kullanici.user.username)
    .addField('Atan', msg.author.tag)
    .addField('Sebep', sebep)
    loglar.send({embed: embed})
    kullanici.kick(sebep)
    msg.reply('Başarılı! :white_check_mark:')
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['at'],
  permLevel: 2,
  kategori: 'yetkili'
};

exports.help = {
  name: 'kick',
  description: 'Etiketlediğiniz kullanıcıyı sunucudan atarsınız..',
  usage: 'kick [kullanıcı] [sebep]'
};