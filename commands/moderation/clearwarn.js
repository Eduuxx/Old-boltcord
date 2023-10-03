const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

module.exports = {
    config: {
        name: "clearwarn",
        description: "Warns the person",
        usage: "-clearwarn <@user> ",
        category: "Moderation",
        accessableby: "Moderators",
        aliases: ["clearallwarn", "clearwarns", "clearallwarns"]
    },
    run: async (bot, message, args) => {
        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        let user = message.mentions.users.first();
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
        if(message.mentions.users.size < 1) return message.reply('You must mention someone to clear their warns.').catch(console.error);
        if(!user) return message.reply("Couldn't find that user...");
        if(!warns[`${user.id}, ${message.guild.id}`]){
        warns[`${user.id}, ${message.guild.id}`] = {
            warns: 0
        };
    }
        let reason = `${warns[`${user.id}, ${message.guild.id}`].warns} warnings have been cleared for this person`;
        if(warns[`${user.id}, ${message.guild.id}`].warns > 0) {
            warns[`${user.id}, ${message.guild.id}`] = {
            warns: 0
        };
        }else{
            reason = 'This user doesnt have any warns!'
        };
    
        fs.writeFile("./warnings.json", JSON.stringify(warns), err => {
            if(err) throw err;
          });

  let dmsEmbed = new Discord.MessageEmbed()
  .setColor("#5261f8")
  .setAuthor(`[CLEARWARNS] | ${user.username}#${user.discriminator}`)
  .setDescription(`**User:** ${user}\n**Result:** ${reason}\n**Cleared by:** ${message.author} (${message.author.id})`)
  .setTimestamp()
  let sChannel = message.guild.channels.cache.find(c => c.name === "modlogs")
  sChannel.send(dmsEmbed)
  
  message.channel.send(dmsEmbed)
}

}