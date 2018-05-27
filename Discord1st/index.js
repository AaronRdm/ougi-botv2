console.log("I'm in!");
console.log(__dirname);


var fs = require('fs');
var data = fs.readFileSync('variables.json');
var variables = JSON.parse(data);

var data2 = fs.readFileSync('Facts.json');
var facts = JSON.parse(data2)
const prefix = 'o!'
const commando = require('discord.js-commando');
const bot = new commando.Client({
    commandPrefix:'o!'
});
console.log(data);



bot.registry.registerGroup('misctasks','Misc Tasks');
bot.registry.registerGroup('adminonly','Admin Only');
bot.registry.registerGroup('youtubemusic','Youtube Music');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname+"/commands");


bot.on('message', (message) => {
    //when someone types something
    console.log(message.content)
    if(message.author.bot) return;
    if(message.content.startsWith(bot.commandPrefix)) return;
    var sender = message.author;
    var msg  = message.content.toUpperCase();
    if(msg === "HELLO"){
        message.channel.send('Ah, hello there, '+sender+'-senpai');
    }

    
});

bot.on('ready', () => {
    //on start
    var NotifyChannel = bot.channels.find("id",variables.Channels.general);
    console.log("Im in")
    NotifyChannel.send("Ah, hello there, @everyone! I'm back!");

    setTimeout(function(){
        NotifyChannel.send("Everyone! be sure to give me permissions for voice channels! That way, I can be at my maximum potential :D");
    },5000);

    setInterval(RandomFact,1800000);
    
});

bot.on('disconnect',() => {
    //disconnected
    var NotifyChannel = bot.channels.find("id",variables.Channels.general);
    console.log("Disconnected from "+NotifyChannel);
    NotifyChannel.send("I'm sorry, it seems that something made me disconnect. I'll see @everyone later!");
});

bot.on('reconnecting',() => {
    //reconnecting
    var NotifyChannel = bot.channels.find("id",variables.Channels.general);
    console.log("Reconnecting to "+NotifyChannel);
    NotifyChannel.send("Hai hai! I'm back @everyone!");
});


function RandomFact(){
    var NotifyChannel = bot.channels.find("id",variables.Channels.general);
    var RndNum = Math.floor(Math.random()*facts.Length);
    var RndFact = facts.Facts[RndNum];
    console.log(RndNum);
    NotifyChannel.send("Hey @everyone, think about it, "+RndFact);
}
bot.login(variables.BotToken);       
//https://www.youtube.com/watch?v=RQmEERvqq70   