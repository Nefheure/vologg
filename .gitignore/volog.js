
const Discord = require('discord.js');

const prefix = "v.";

var bot = new Discord.Client();
     
bot.on("ready", function() {
       console.log("Versia, Pret !");
       bot.user.setActivity("v.help")
       bot.user.setStatus("dnd")
});

bot.on('message', message => {
   
    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#2EFEF7")
        .setTitle("Command panels")
        .setDescription("All orders will be stored here.")
        .addField("v.help", "Show you the control panel.")
        .addField("v.stats", "Shows you your statistics.")
        .addField("v.infobot", "Shows you information about the bot.")
        .addField("v.infoserv", "shows you information about the server.")
        .addField("v.mute", "mute the person ask.")
        .addField("v.unmute", "will no longer be mute.")
        .addField("v.clear [Number]", "allows you to delete a number of messages.")
        .addField("v.kick", "expels the user ask")
        .addField("v.ban", "expelled the person definitely asks.")
        .setFooter("Versia, created by Nefer")
        message.channel.sendMessage(help_embed);
       }
   
   
});

bot.on('message', message => {
   
    if(message.content === prefix + "infoserv"){
        var infoserv_embed = new Discord.RichEmbed()

        .setColor("#2EFEF7")
        .setTitle("here is some information about the server.")
        .setDescription("these information may be modified or changed including for all information.")
        .addField("Number of members", message.guild.members.size)
        .addField("Number of category and salon", message.guild.channels.size)
        .setFooter("Versia, created by Nefer")
        message.channel.sendMessage(infoserv_embed);
}});

bot.on('message', message => {

    if(message.content === prefix + "infobot"){


      var infobot_embed = new Discord.RichEmbed()
      .setColor("#2EFEF7")
      .setTitle("here is some information about me.")
      .setDescription("these information may be modified or changed including for all information.")
      .addField("Bot tag.", `${bot.user.tag}`, true)
      .addField("Discriminator of the bot.", `#${bot.user.discriminator}`)
      .addField("Bot ID.", `${bot.user.id}`)
      .addField("about me...", "I am here to help you in your Discord or Moderation server project, I can mutate or play music, I am constantly evolving, I am happy to be part of your server.")
      .setFooter("Versia, created by Nefer")
      message.channel.sendMessage(infobot_embed);
}})



bot.on('message', message => {
    if(message.content === prefix + "stats"){

    var userCreateDate = message.author.createdAt.toString().split(" ");
    var msgauthor = message.author.id;
    
     var stats_embed = new Discord.RichEmbed()
      .setColor("#2EFEF7")
      .setDescription("these information may be modified or changed including for all information.")
      .setTitle(`Statistics of ${message.author.username}`)
      .addField("you created your account the", userCreateDate[1] + ' ' + userCreateDate[2] + " " + userCreateDate[3])
      .addField(`your identifiers are the following`, msgauthor, true)
      .setFooter("Versia, created by Nefer")
      .setThumbnail(message.author.avatarURL)
      message.reply("you can watch your private messages, your Statistics have been sent to you.")
      message.author.send({embed: stats_embed}); 
}});

bot.on('message', message => {

    if(message.content === prefix + "invite"){
        var invite_embed = new Discord.RichEmbed()
        .setColor("#2EFEF7")
        .setTitle("Here is my invitation link.")
        .setDescription("link: https://discordapp.com/oauth2/authorize?client_id=506180344375148556&scope=bot&permissions=2146958847")
        message.channel.search(invite_embed)
    }
})

bot.on('message', message => {
 
    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission.");

        if(message.mentions.users.size === 0) {
            return message.reply("you have to mention a user.");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.reply("the user was not found.");        
        }
        if(!message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) return message.channel.send("I do not have permission.");
        message.channel.overwritePermissions(mute, { SEND_MESSAGE: false}).then(member => {
           message.reply(`${mute.user.username} is mute. *GG*`);
        })
    }
})
bot.on('message', message => {

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply("You do not have permission.");

        if(message.mentions.users.size === 0) {
            return message.reply("you have to mention a user.");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.reply("the user was not found.");        
        }
        if(!message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) return message.channel.send("I do not have permission.");
        message.channel.overwritePermissions(mute, { SEND_MESSAGE: true}).then(member => {
           message.reply(`${mute.user.username} no longer mute.`);
        })
    }
})
bot.on('message', message => {

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("You do not have permission.");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("you must specify a number of messages.")
        message.channel.bulkDelete(args[0]).then(() => {
            message.reply(`${args[0]} message have been removed.`);
        })
        
    }
})

bot.on("guildMemberAdd", member => {

    let role = member.guild.roles.find("name", "Villageois Basic");
    member.guild.channels.find("name", "village").send(`${member} Joined us! :hugging: , I invite you to watch the living room démarche.`)
    
    member.addRole(role)
})

bot.on('guildMemberRemove', member => {

   member.guild.channels.find("name", "village").send(`:scream: ${member} abandoned us ...`)
   
})

bot.on('message', message => {
   let command = message.content.split(" ")[0];
   const args = message.content.slice(prefix.lenght).split(/ +/);
   command = args.shift().toLowerCase();

   if (command === prefix + "kick") {
       let modRole = message.guild.roles.find("name", "Games Masters");
       if(!message.member.roles.has(modRole.id)) {
           return message.reply("you do not have permission to use this command.").catch(console.error);
       }
       if(message.mentions.users.size === 0) {
           return message.reply("thank you for mentioning a user.").catch(console.error);
       }
       let kickMember = message.guild.member(message.mentions.users.first());
       if(!kickMember) {
           return message.reply("this user cannot be found or can not be evicted.")
       }
       if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
           return message.reply("I do not have permission KICK_MEMBERS to do this.").catch(console.error);
       }
       kickMember.kick().then(member => {
           message.reply(`${member.user.username} was expelled. *GG*`).catch(console.error);
       })
   }

   if (command === prefix + "ban") {
       let modRole = message.guild.roles.find("name", "Games Masters");
       if(!message.member.roles.has(modRole.id)) {
           return message.reply("you do not have permission to use this command.").catch(console.error);
       }
       const member = message.mentions.members.first();
        if (!member) return message.reply("thank you for mentioning a user.");
        member.ban().then(member => {
            message.reply(`${member.user.username} was banned from the server. *GG*`).catch(console.error);
        })
   }
});
bot.login(process.env.TOKEN);




