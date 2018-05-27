const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command{
    constructor(cilent){
        super(cilent,{
            name: 'roll',
            group: 'misctasks',
            memberName: 'roll',
            description: 'rolls a six-sided die'
        });
    }

    async run(message, args){
        var sender = message.author;
        var roll = Math.floor(Math.random()*6)+1;
        message.channel.send("You rolled a "+roll+", "+sender+'-senpai');
    }
}

module.exports = DiceRollCommand;