const commando = require('discord.js-commando')
const ytdl = require('ytdl-core');
class YoutubePlayMusicCommand extends commando.Command{
    constructor(Cilent){
        super(Cilent,{
            name:'ytplay',
            group:'youtubemusic',
            memberName:'ytplay',
            description:'Ougi plays music with a Youtube link given to her',
            examples:['o!ytplay [Youtube Link]']
        });
    }

    async run(message, args){
        var sender = message.author;
        args= message.content.split(' ');
        console.log(args[1]);
        if(args[1] === undefined) return message.channel.send("I'm sorry "+sender+"-senpai, you have to type a youtube link");
        var song = args[1];
        console.log(song)
        //checks if user is in a voice channel
        const voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) return message.channel.send("I'm so sorry "+sender+"-senpai, you have to be in a voice channel if you want to hear me sing :D");
        //if not ^
        console.log(args)
        try {
            //bot joins
            var connection = await voiceChannel.join();
            message.channel.send("I'll be starting the song now, "+sender+"-senpai!");
        } catch (err) {
            console.error(err);
            return message.channel.send("I'm so sorry "+sender+"-senpai, it seems like I can't play the link you gave me, maybe it be might be"+err+" aswell.");
        }
        
        const dispatcher = connection.playStream(ytdl(song))
            .on('end', ()=>{
                console.log("song end")
                message.channel.send("What a nice song "+sender+"-senpai!");
            })
            .on('error', err =>{
                console.log(err)
                message.channel.send("I'm so sorry "+sender+"-senpai, seems like something went wrong! I think it's "+err);
            })
            .setVolumeLogarithmic(5/5);
    }
}

module.exports = YoutubePlayMusicCommand;