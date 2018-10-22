const Discord = require('discord.js');

exports.run = function(client, message, args) {
  let mesajsayisi = parseInt(args.join(' '));
  if (mesajsayisi.length < 1) return message.channel.send('Kaç mesaj silmem gerektiğini belirtmedin.')
  if (mesajsayisi > 99) return message.channel.send('99 adetden fazla mesaj silemem!');
  message.channel.bulkDelete(mesajsayisi);
  const embed = new Discord.RichEmbed()
  .setColor(client.ayarlar.renk)
  .setDescription(`**${mesajsayisi}** adet mesaj başarıyla silindi.`)
  .setFooter('Bu mesaj 5 saniye sonra C4 ile patlatılacaktır.')
  message.channel.send({embed: embed})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 1,
  kategori: 'yetkili'
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktar kadar mesajı siler.',
  usage: 'temizle <temizlenecek mesaj sayısı>'
};
