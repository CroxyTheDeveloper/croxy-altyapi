const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const embed = new Discord.RichEmbed()
  .setColor(client.ayarlar.renk)
  .setDescription(`Botumu davet etmek için yandaki yazıya tıkla! => [Tıkla](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958591)`)
  message.channel.send({embed: embed})
}

 exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
  kategori: "bot"
};

exports.help = {
  name: "davet",
  description: "Botu sunucunuza davet edersiniz.",
  usage: "davet"
}