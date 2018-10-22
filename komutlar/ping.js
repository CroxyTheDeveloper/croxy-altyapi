const Discord = require('discord.js')

exports.run = async (client, message, args) => {
	const msg = await message.channel.send("Bekle biraz. Gerekli verileri hesaplıyorum...");
    let msgping1 = new Date();

    let botping = new Date() - message.createdAt;
  
    let authorping = Date.now() - message.createdTimestamp

    let msgping2 = Math.round(message.createdTimestamp - message.createdTimestamp)

    let pingembed = new Discord.RichEmbed()
        .setColor(client.ayarlar.renk)
        .addField('API Pingi : ', Math.floor(client.ping) + 'ms')
        .addField('Bot Pingi : ', Math.floor(botping) + 'ms')
        .addField('Mesaj Pingi : ', Math.round(msgping2) + 'ms')
        .setTimestamp(new Date())

	msg.edit(pingembed)
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: 0,
	kategori: 'bot'
}

exports.help = {
	name: 'ping',
	description: 'Botun gecikme süresini gösterir.',
	usage: 'ping'
}
