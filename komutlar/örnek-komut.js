const Discord = require('discord.js') //botu tanımlıyoruz

exports.run = async (client, message, args) => { //komudu çalıştırmamıza yarayacak olan yeri tanımlıyoruz
	const embed = new Discord.RichEmbed() //şekilli şüküllü kutucuğumuzu yani embedimizi ayarlıyoruz
	.setColor(client.ayarlar.renk) //bot.js de ayarladığımız renk kodunu, kutucuğun rengine define ediyoruz
	.setDescription('Hello world!') //açıklamayı giriyoruz.
	.addField('Hello', 'World') //Bir başlık altında yazı giriyoruz.
	message.channel.send({embed: embed}) //embedi gönderiyoruz
	console.log('hello world, meowww') //konsola gönderiyoruz
}//komudu bitiriyoruz.

 exports.conf = {
  enabled: true, //komut kullanılabilir durumdamı değil mi onu belirtiyoruz true veya false olarak
  guildOnly: true, //sadece sunucuda kullanılabilir olduğunu ayarlıyoruz
  aliases: ["örnekkomut"], //komutu asıl ismi dışında kullanabileceğimiz isimleri yazıyorsunuz
  permLevel: 0, /*Kullanabilecek yetkiyi belirtiyorsunuz bulunan yetkilerin sayıları:
  0 = Yetki gerekmez herkes kullanabilir.
  1 = Mesjları Yönet yetkisi gerekir.
  2 = Üyeleri At yetkisi gerekir.
  3 = Üyeleri Yasakla yetkisi gerekir.
  4 = Rolleri Yönet yetkisi gerekir.
  5 = Yönetici yetkisi gerekir.
  6 = Bot yapımcısı olmak gerekir.
  */
  kategori: "kullanıcı" //Komutun kategorisini belirtiyoruz
};

exports.help = {
  name: "örnek-komut", //Komutun ismini belirtiyoruz
  description: "Açıklama.", //Komutun açıklamasını yazıyoruz
  usage: "Kullanım" //Komutun Doğru Kullanım'ını yazıyoruz
};