const commando = require('discord.js-commando')
var messagelimit = 0;
class BotLeaveCommand extends commando.Command{
    constructor(cilent){
        super(cilent,{
            name:'leave',
            group: 'adminonly',
            memberName:'leave',
            description:'Makes Ougi disconnect from the channel'
        });
    }

   async run(message, args){
        var sender = message.author;
        
        while(messagelimit == 0){
            message.channel.send("I'll meet you again next time, "+sender+"-senpai!");
            messagelimit=1;
        }
        setTimeout(function(){
            ThisFunctionDoesNotExistAndWasOnlyMadeForTheSolePurposeOfStoppingTheProgram();

        },1000);
    }
}

module.exports = BotLeaveCommand;
