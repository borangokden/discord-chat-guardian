const Discord = require("discord.js")
const client = new Discord.Client();
const db = require("quick.db");
const config = require("./config.json");
const map = new Map();
const lımıt = 5;
const TIME = 10000;
const DIFF = 2000;

client.on("ready", () => {
    client.user.setPresence({ activity: { name: (config.bot.BotDurum) }, status: "online" })
    client.channels.cache.get(config.bot.BotSesKanalı).join()
})

//----------------------------REKLAM ENGEL-----------------------------------||

client.on("messageUpdate", async msg => {

    const reklam = [`discord.gg`, `.gg/`, `.gg /`, `. gg /`, `. gg/`, `discord .gg /`, `discord.gg /`, `discord .gg/`, `discord .gg`, `discord . gg`, `discord. gg`, `discord gg`, `discordgg`, `discord gg /`, `gg`, `wwww`, `.com`, `https`]
        if (küfür.some(word => message.content.toLowerCase().includes(word))) {
            let warnCount = client.adBlock.get(message.author.id) || 0
            client.adBlock.set(message.author.id, warnCount + 1)
            if (warnCount >= 3) {
                message.reply("bu sunucuda reklam engeli bulunmakta!")
                message.member.kick()
                message.delete()
            } else {
                let totalWarnCount = 345345345345345 - warnCount
                message.reply("bu sunucuda reklam engeli bulunmakta!")
                message.delete()
            }
            setTimeout(() => {
                client.adBlock.delete(message.author.id)
            }, ms("30s"))
        }
    });

//----------------------------REKLAM ENGEL-----------------------------------||

//----------------------------CAPS-LOCK ENGEL-----------------------------------||

client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
    if (msg.author.bot) return;
    if (msg.content.length > 1) {
        let caps = msg.content.toUpperCase();
        if (msg.content == caps) {
          if (!msg.member.permissions.has("ADMINISTRATOR")) {
            if (!msg.mentions.users.first()) {
              msg.delete();
              return msg.channel.send(`${msg.member}, mesajlarında %70'i aşan büyük harf kullanımı tespit edildi!`).then(borangkdn => borangkdn.delete({timeout: 10000}))
                
            }
          }
        }
    }
  });

//----------------------------CAPS-LOCK ENGEL-----------------------------------||

//----------------------------KÜFÜR ENGEL-----------------------------------||

client.on("messageUpdate", async msg => {

    const küfür = [
        "anan","oruspu","piç","siktir","yarram","fuck",
    "orosbu","sikeyim","sikiyim","anneni","ananı",
    "Koduğum","yarak","mcık", "yarrak","oç","anaskm",
    "sikerim","sikik","mına","pezevenk","yavşak","orospu",
    "göt","pipi","sokuk","orspu","skm", "Sikicem", "sikicem", "evladı", "evladi",
    "siktim", "anasnı", "anasını", "anasini", "siktiğimin", "sigimin", "siktiğmin", "sikim", "kitabini", 
    "atani", "sikgimin", "atanı", "sikm", "allahını"]
        if (küfür.some(word => message.content.toLowerCase().includes(word))) {
            let warnCount = client.adBlock.get(message.author.id) || 0
            client.adBlock.set(message.author.id, warnCount + 1)
            if (warnCount >= 3) {
                message.reply("bu sunucuda küfür/argo kelime engeli bulunmakta!")
                message.member.kick()
                message.delete()
            } else {
                let totalWarnCount = 345345345345345 - warnCount
                message.reply("bu sunucuda küfür/argo kelime engeli bulunmakta!")
                message.delete()
            }
            setTimeout(() => {
                client.adBlock.delete(message.author.id)
            }, ms("30s"))
        }
    });

//----------------------------KÜFÜR ENGEL-----------------------------------||

//----------------------------ETİKET ENGEL-----------------------------------||

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.member.hasPermission('ADMINISTRATOR')) return;

    if (message.mentions.users.size >= 3) {
        const mutedrole = message.guild.roles.cache.get(config.general.MutedRol)
        message.member.roles.add(mutedrole);
        message.channel.send("Sunucumuzda çoğu kişiyi etiketleme sebebi ile 15 dakikalığına susturuldun!");
        setTimeout(() => {
            message.member.roles.remove(mutedrole);
            message.channel.send("Susturulman açıldı umarım bir daha böyle bir uyuzluk yapmazsın.")
        }, 900000);//9000000
        if (message.deletable) message.delete({ timeout: 0030 }).catch(console.error);
    }
});

//----------------------------ETİKET ENGEL-----------------------------------||

//----------------------------SPAM ENGEL-----------------------------------||

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    if (message.member.roles.cache.get(config.general.MutedRol)) return;
    if (map.has(message.author.id)) {
        const userData = map.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if (difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                map.delete(message.author.id);
            }, TIME);
            map.set(message.author.id, userData)
        }
        else {
            msgCount++;
            if (parseInt(msgCount) === lımıt) {
                const mutedrole = message.guild.roles.cache.get(config.general.MutedRol)
                message.member.roles.add(mutedrole);
                message.channel.send("Spam yaptığın için 15 dakikalığına susturuldun!").then(borangkdn => borangkdn.delete({timeout: 10000}))

                setTimeout(() => {
                    if (!message.member.roles.cache.get(config.general.MutedRol)) return;
                    message.member.roles.remove(mutedrole);
                    message.channel.send("Susturulman açıldı umarım bir daha spam yapmazsın.").then(borangkdn => borangkdn.delete({timeout: 10000}))
                }, 900000);//9000000
            } else {
                userData.msgCount = msgCount;
                map.set(message.author.id, userData)
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            map.delete(message.author.id)
        }, TIME);
        map.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        })
    }
});

//----------------------------SPAM ENGEL-----------------------------------||

//----------------------------TOKEN-----------------------------------||

client.login(config.bot.Token).then(() => console.log(`Bot ${client.user.username} olarak giriş yaptı!`)).catch(() => console.log("Bot giriş yaparken bir hata oluştu!"))

//----------------------------TOKEN-----------------------------------||
