
const Discord = require('discord.js');

const prefix = "v.";

const ms = require('ms');

const ytdl = require('ytdl-core');

const queue = new Map();

var servers = {};

var bot = new Discord.Client();
  
let statuses = ['v.help', 'Ready !', 'Versia'];

bot.on('ready', () => {
       setInterval(function() {
             let status = statuses[Math.floor(Math.random()*statuses.length)];
             bot.user.setPresence({ game: { name: status }, status: 'online'});
         }, 10000)
       

})

bot.on('message', message => {

    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#000000")
        .setDescription("for the command Help you have the choice between ```v.hadmin/v.hutility/v.hvarious```")
        message.channel.sendMessage(help_embed);
    }
});

bot.on('message', message => {
   
    if(message.content === prefix + "hadmin"){
        var hadmin_embed = new Discord.RichEmbed()
        .setColor("#000000")
        .setTitle("Here are the Command Administrative")
        .setDescription("All Administrative orders will be put there")
        .addField("``v.mute``", "mute the person ask.")
        .addField("``v.unmute``", "will no longer be mute.")
        .addField("``v.clear`` [Number]", "allows you to delete a number of messages.")
        .addField("``v.kick``", "expels the user ask")
        .addField("**More help ?**", "v.hvarious/v.hutility")
        .setFooter("Versia, created by Nefer")
        .setTimestamp()
        message.channel.sendMessage(hadmin_embed);
       }
   
   
});

bot.on('message', message => {

    if(message.content === prefix + "hvarious"){
        var hvarious_embed = new Discord.RichEmbed()
        .setColor("#000000")
        .setTitle("Here are some miscellaneous orders.")
        .addField("``v.vcs``[YourMessage]", "the message would be seen by any server or I am, make sure you have created a salon``vcs-versia``")
        .addField("v.help-poll", "this command will help you use the polls")
        .addField("**More Help ?**", "v.hadmin/v.hutility")
        .setFooter("Versia, created by Nefer")
        .setTimestamp()
        message.channel.sendMessage(hvarious_embed);
    }
});

bot.on('message', message => {

    if(message.content === prefix + "hutility"){
        var hutility_embed = new Discord.RichEmbed()
        .setColor("#000000")
        .setTitle("all the useful command are here")
        .addField("``v.stats``", "Want to know more about you ?")
        .addField("``v.infobot``", "who and Versia ?")
        .addField("``v.infoserv``", "shows you some information about the server.")
        .addField("``v.ping``", "Shows you your ping and that of the bot")
        .addField("**More help ?**", "``v.hvarious/v.hadmin``")
        .setFooter("Versia, created by Nefer")
        .setTimestamp()
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
        .addField("Name of Discord", message.guild.name)
        .addField("Date of creation of the server", message.guild.createdAt)
        .addField(`here is the date you joined the server ${message.author.tag}`, message.member.joinedAt)
        .setFooter(`ask By ${message.author.tag}`)
        .setTimestamp()
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
      .setTimestamp()
      message.channel.sendMessage(infobot_embed);
}})

bot.on('message', message => {

    if(message.content === prefix +  "help-poll") {
        var embed = new Discord.RichEmbed()
        .setAuthor("help poll")
        .setDescription("to use this command make sure you have two important things")
        .addField("an administrative right", "have administrative permission, or just be the founder of the server")
        .addField("create a salon ``versia-poll``", "it's important to create a salon ``versia-poll``, otherwise the bot will not interrogate")
        .addField("the command", "when these two steps are complete, you can use ``v.poll``[YourMessage] in any living room of your server")
        .setFooter(`ask by ${message.author.tag}`)
        .setTimestamp()
        message.channel.sendMessage(embed);
    }
});

bot.on('message', message => {

    if (message.content.startsWith(prefix + "poll")) {
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        var embed = new Discord.RichEmbed()
        .setDescription("Poll")
        .addField(thingToEcho, "Reply by :white_check_mark: or :x:")
        .setColor("#000000")
        .setTimestamp()
        message.guild.channels.find("name", "versia-poll").sendEmbed(embed)
        .then(function (message) {
            message.react(":x:")
            message.react(":white_check_mark:")
        }).catch(function() {
        });
    }else{
        return message.reply("you do not have the right to use this command")
        
    }

});

bot.on('message', message => {
    if(message.content === prefix + "stats"){

    var userCreateDate = message.author.createdAt.toString().split(" ");
    var msgauthor = message.author.id;
    
     var stats_embed = new Discord.RichEmbed()
      .setColor("#000000")
      .setDescription("these information may be modified or changed including for all information.")
      .setTitle(`Statistics of ${message.author.username}`, bot.user.avatarURL)
      .addField("you created your account the", userCreateDate[1] + ' ' + userCreateDate[2] + " " + userCreateDate[3])
      .addField(`your identifiers are the following`, msgauthor, true)
      .setFooter("Versia, created by Nefer")
      .setThumbnail(message.author.avatarURL)
      .setTimestamp()
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

    if (message.content.startsWith(prefix + "vcs")) {
        message.delete(message.author);
        let argson = message.content.split(" ").slice(1);
        let vcsmsg = argson.join(" ")
        if(!message.guild.channels.find("name", "vcs-versia")) return message.reply(":warning: Error404, ``vcs-versia`` and not found create a salon under the name ``vcs-versia``.");
        if(message.channel.name !== "vcs-versia") return message.reply("command to be performed in ``vcs-versia``");
        if(!vcsmsg) return message.reply("Thank you for sending a message that would be seen in all servers or I am");
        //-------------
        var replys = [
            '#FF0000',
            '#000000',
            '#00FF00',
            '#00FFFF',
            '#0000FF',
            '#FFFF00',
            '#FAFAFA',
            '#FE0177'
        ];
        //-------------
        let reponse = (replys[Math.floor(Math.random() * replys.lenght)])
        var embed = new Discord.RichEmbed()
        .setColor(reponse)
        .setAuthor("Versia - VCS", bot.user.avatarURL)
        .addField("server:", message.guild.name, true)
        .addField("User:", message.author.tag, true)
        .addField("Message:", vcsmsg)
        .setFooter("Versia, created by Nefer")
        .setTimestamp()
        bot.channels.findAll('name', 'vcs-versia').map(channel => channel.send(embed))

    }
});

bot.on('message', message => {

    if(message.content.startsWith(prefix + "ping")) {
        let startTime = Date.now();
        let embed = new Discord.RichEmbed()
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setColor('#000000')
        .setAuthor("Ping...")
        .setTitle("__Here are the ping of the bot.__")
        .addField("Local ping", `Ping = ${Math.round(Date.now() - startTime)} ms`, true)
        .addField("API (Me)", `Ping = ${Math.round(bot.ping).toFixed(0)} ms`, true)
        .setFooter(`ask by ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(embed)
    }
});



function play(connection, message) {
    var server = serveer[message.guild.id];
    //-----------//
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
    //-----------//
    server.queue.shift();
    //-----------//
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);

        else connection.disconnect();
        //-----------//
    });

}

bot.login(process.env.TOKEN);


