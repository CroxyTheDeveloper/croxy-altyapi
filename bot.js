const Discord = require("discord.js"); //Burada discord.js modülünü tanımlıyoruz
const client = new Discord.Client(); //Burada botu tanımlıyoruz
const chalk = require("chalk"); //Burada chalk modülünü tanımlıyoruz
const fs = require("fs"); //Burada fs modülünü tanımlıyoruz


client.ayarlar = {
  "token": "", //Buraya botunuzun https://discordapp.com/developers/applications sitesindeki tokenini yazınız
  "sahip": "",//Buraya bot sahibinin IDini giriniz
  "renk": "000000",//Buraya embedlerde kullanılacak rengi giriniz
  "klasor": "", //Buraya komutların hangi klasörde olduğunu ayarlayacağız
  "yardimcilar": [""], //Buradaki "" lara botunuzu yaparken size yardım edenleri yazınız
  "prefix": "?", //Burada "?" ni  botunuzun prefixi ile değiştiriniz (Prefix: Komutları kullanırken başa koyulan "!, *, ., b!" vb.)
  "versiyon": "1.0.0", //Buraya botunuzun versiyonunu yazınız
};

client.on("ready", async () => {
  console.log(`Aktif oldum! ${client.guilds.size} sunucuya ve ${client.users.size} kullanıcıya hizmet veriyorum!`)
  client.user.setActivity(`${client.ayarlar.prefix}yardım | ${client.ayarlar.prefix}davet | ${client.guilds.size} sunucudayım!`) 
  /*Burada botunuzun oynuyor durumunu değiştiriniz durum type:"" kısmında yazıyor
  Durumlar:
  STREAMING yazar iseniz durum Yayında olur bunun için url kısmına twich kanal linkinizi de yazınız,
  WATCHING yazar iseniz durum İzliyor olur,
  LISTENING yazar iseniz durum Dinliyor olur,
  PLAYING yazar iseniz durum Oynuyor olur.
  */
});

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir(`./${client.ayarlar.klasor}`, (err, files) => {
  let jsfiles = files.filter(f => f.split(".").pop() === "js")

  if(jsfiles.length <= 0) {
    console.log("Bu klasörde hiç komut yok!")
  } else {
    if (err) {
      console.error("Hata! Bir komutun name veya aliases kısmı yok!")
    }
    console.log(`${jsfiles.length} komut yüklenecek.`)

    jsfiles.forEach(f => {
      let props = require(`./${client.ayarlar.klasor}/${f}`)
      client.commands.set(props.help.name, props)
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name)
      })
      console.log(`Yüklenen komut: ${props.help.name}`)
    })
  }
});

client.on("message", async message => {
  let prefix = client.ayarlar.prefix
 if (!message.guild) return;  
 if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return
  var command = message.content.split(" ")[0].slice(prefix.length)
  var args = message.content.split(" ").slice(1)
  
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  
  if (cmd) {
    
    if (cmd.conf.permLevel === 1) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply(`Bu komutu kullanabilmek için Mesajları Yönet iznine sahip olmalısın!`)
        return
      }
    }
    if (cmd.conf.permLevel === 2) {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        message.reply(`Bu komutu kullanabilmek için Üyeleri At iznine sahip olmalısın!`)

        return
      }
    }
    if (cmd.conf.permLevel === 3) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.reply(`Bu komutu kullanabilmek için Üyeleri Yasakla iznine sahip olmalısın!`)

        return
      }
    }
    if (cmd.conf.permLevel === 4) {
      if (!message.member.hasPermission("MANAGE_ROLES")) {
        message.reply(`Bu komutu kullanabilmek için Rolleri Yönet iznine sahip olmalısın!`)
        return
      }
    }
    if (cmd.conf.permLevel === 5) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.reply(`Bu komutu kullanabilmek için Yönetici iznine sahip olmalısın!`)

        return
      }
    }
    if (cmd.conf.permLevel === 6) {
      if (!client.ayarlar.sahip.includes(message.author.id)) {
        message.reply(`Bu komutu kullanabilmek için Bot Sahibi iznine sahip olmalısın!`)
return
      }
    }
    cmd.run(client, message, args);
    
  }});

client.login(client.ayarlar.token); //Burada bot giriş yapıyor
