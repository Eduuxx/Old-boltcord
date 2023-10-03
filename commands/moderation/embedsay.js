const { MessageEmbed } = require('discord.js')

module.exports = {
    config: {
        name: "embedsay",
        description: "sends a message that was inputted to a channel",
        usage: "-embedsay",
        category: "moderation",
        accessableby: "Staff",
        aliases: ["embedannouce", "eannouce", "esay"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You can not use this command!")
    
    let argsresult;
    let mChannel = message.mentions.channels.first()

    message.delete()
    if(mChannel) {
        argsresult = args.slice(1).join(" ")
        let embed = new MessageEmbed()
      .setColor("#5261f8")
      .setDescription(`${argsresult}`)
        mChannel.send(embed)
        
    } else {
        argsresult = args.join(" ")

      let embed = new MessageEmbed()
      .setColor("#5261f8")
      .setDescription(`${argsresult}`)
        message.channel.send(embed)
    }

    }
}