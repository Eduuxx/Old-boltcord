const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

module.exports = {
    config: {
        name: "warn",
        description: "Warns the person",
        usage: "&warn <@user> {reason}",
        category: "Moderation",
        accessableby: "Moderators",
        aliases: ["warn"]
    },
    run: async (bot, message, args) => {
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();
      let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
      //let logchannel = message.guild.channels.cache.find(x => x.name = 'logs');
      if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
      if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
      if (message.mentions.users.first().id === message.author.id) return message.reply('You cant warn urself!');
      if (message.mentions.users.first().id === "377509867923046404") return message.reply("You can't warn Super-admin");
      //if (!logchannel) return message.channel.send('I cannot find a logs channel');
      if (reason.length < 1) reason = 'No reason supplied.';
      
      if(!warns[`${user.id}, ${message.guild.id}`]) warns[`${user.id}, ${message.guild.id}`] = {
        warns: 0
      };
    
      warns[`${user.id}, ${message.guild.id}`].warns++;
    
      fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
        if(err) throw err;
      });

  let dmsEmbed = new Discord.MessageEmbed()
  .setColor("#5261f8")
  .setTimestamp()
  .addField('Action:', 'Warning')
  .addField('User:', `${user.username}#${user.discriminator}`)
  .addField('Warned by:', `${message.author.username}#${message.author.discriminator}`)
  .addField('Number of warnings:', warns[`${user.id}, ${message.guild.id}`].warns)
  .addField('Reason', reason)
  .setTimestamp()
  let sChannel = message.guild.channels.cache.find(c => c.name === "modlogs")
  sChannel.send(dmsEmbed)
  
  message.channel.send(dmsEmbed)
}

}