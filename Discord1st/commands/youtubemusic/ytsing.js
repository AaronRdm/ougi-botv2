const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');
class YoutubeSingCommand extends commando.Command{
    constructor(Cilent){
        super(Cilent,{
            name:'sing',
            group:'youtubemusic',
            memberName:'sing',
            description:'Ougi sings one of her songs: "Dark Cherry Mystery" or "Decent Black"',
            examples:['o!sing DecentBlack','o!sing DarkCherry']
        });
    }

    async run(message, args){
        var sender = message.author;
        args= message.content.split(' ');
        console.log(args[1])
        if(args[1] === undefined) return message.channel.send("I'm sorry "+sender+"-senpai, that is not one of my songs! Either type 'DARKCHERRY' or 'DECENTBLACK'");
        var song = args[1].toUpperCase();
        console.log(song)
        //checks if user is in a voice channel
        const voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) return message.channel.send("I'm so sorry "+sender+"-senpai, you have to be in a voice channel if you want to hear me sing :D");
        //if not ^
        console.log(args)
        try {
            //bot joins
            var connection = await voiceChannel.join();
            message.channel.send("I'll be singing now, "+sender+"-senpai! I hope you like it!");
        } catch (err) {
            console.error(err);
            return message.channel.send("I'm so sorry "+sender+"-senpai, seems like something went wrong! I think it's "+err);
        }
        if (song === 'DECENTBLACK'){
            const dispatcher = connection.playStream(ytdl('https://www.youtube.com/watch?v=B0OhjYYngEQ'))
            .on('end', ()=>{
                console.log("song end")
                message.channel.send("I hope you liked my singing"+sender+"-senpai!");
            })
            .on('error', err =>{
                console.log(err)
                message.channel.send("I'm so sorry "+sender+"-senpai, seems like something went wrong! I think it's "+err);
            })
            .setVolumeLogarithmic(5/5);
        } else if (song=== 'DARKCHERRY'){
            const dispatcher = connection.playStream(ytdl('https://www.youtube.com/watch?v=HAPSDPZZIpw'))
            .on('end', ()=>{
                console.log("song end")
                message.channel.send("I hope you liked my singing"+sender+"-senpai!");
            })
            .on('error', err =>{
                console.log(err)
                message.channel.send("I'm so sorry "+sender+"-senpai, seems like something went wrong! I think it's "+err);
            })
            .setVolumeLogarithmic(5/5);
        } else {
            return message.channel.send("I'm sorry "+sender+"-senpai, that is not one of my songs! Either type 'DARKCHERRY' or 'DECENTBLACK'")
        }
    }
}

module.exports = YoutubeSingCommand;