const ytdl = require('ytdl-core');

exports.run = async (bot, message, args, ops) => {

    if (!message.member.voiceChannel) return message.channel.send("Please connect to a Voice Channel");
    if (message.guild.me.voiceChannel) return message.channel.send("I'm not ready to connect to the voice channel");
    if (!args[0]) return message.channel.send("please kindly give me a link");
    let validate = await ytdl.validateURL(args[0]);
    if (!validate) return message.channel.send("please kindly give me a **valid** link");
    let info = await ytdl.getInfo(args[0]);
    let connection = await message.member.voiceChannel.join();
    let dispatcher = await connection.play(ytdl(args[0], { filter: 'audioonly'}));
    message.channel.send(`**Now playing**: ${info.title}`);
}