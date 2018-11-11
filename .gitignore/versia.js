
const Discord = require('discord.js');

const prefix = "v.";

const ytdl = require('ytdl-core');

var bot = new Discord.Client();
     
bot.on("ready", function() {
       console.log("Versia, Pret !");
       bot.user.setActivity("v.help")
       bot.user.setStatus("online")
});
bot.on('message', message => {

    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#000000")
        .setDescription("for the command Help you have the choice between *v.hadmin/v.hutility/v.hvarious*")
        message.channel.sendMessage(help_embed);
    }
});

bot.on('message', message => {
   
    if(message.content === prefix + "hadmin"){
        var hadmin_embed = new Discord.RichEmbed()
        .setColor("#000000")
        .setTitle("Here are the Command Administrative")
        .setDescription("All Administrative orders will be put there")
        .addField("v.mute", "mute the person ask.")
        .addField("v.unmute", "will no longer be mute.")
        .addField("v.clear [Number]", "allows you to delete a number of messages.")
        .addField("v.kick", "expels the user ask")
        .addField("**More help ?**", "v.hvarious/v.hutility")
        .setFooter("Versia, created by Nefer")
        message.channel.sendMessage(hadmin_embed);
       }
   
   
});

bot.on('message', message => {

    if(message.content === prefix + "hvarious"){
        var hvarious_embed = new Discord.RichEmbed()
        .setColor("#000000")
        .setTitle("Here are some miscellaneous orders.")
        .addField("v.infoserv", "shows you some information about the server.")
        .addField("v.infobot", "who and Versia ?")
        .addField("**More Help ?**", "v.hadmin/v.hutility")
        message.channel.sendMessage(hvarious_embed);
    }
});

bot.on('message', message => {

    if(message.content === prefix + "hutility"){
        var hutility_embed = new Discord.RichEmbed()
        .setColor("#000000")
        .setTitle("all the useful command are here")
        .addField("v.stats", "Want to know more about you ?")
        .addField("**More help ?**", "v.hvarious/v.hadmin")
        message.channel.sendMessage(hutility_embed);
    }

});

bot.on('message', message => {
   
    if(message.content === prefix + "infoserv"){
        var infoserv_embed = new Discord.RichEmbed()

        .setColor("#000000")
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
      .setColor("#000000")
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
      .setColor("#000000")
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

bot.on('message', message => {

    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){
       
        case "kick":

        if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
             message.reply("you do not have permission to use this command.")
        }else{
            var memberkick = message.mentions.members.firsts();
            console.log(memberkick)
            console.log(message.guild.member(member.kick).kickable)
            if(!memberkick){
                message.reply("the user has not been found or can not be evicted.");
            }else{
                if(!message.guild.member(memberkick).kickable){
                    message.reply("I'm not allowed to evictor definitely.");
                }else{
                    message.guild.member(memberkick).kick().then((member) => {
                   message.channel.send(`:warning: the user *${member.displayName} has been successfully expelled by ${message.author.username}*.`);
                }).catch(() => {
                    message.channel.send("kick reject")
                })
            }
        }

        break;
    }
}});

bot.login(process.env.TOKEN);
