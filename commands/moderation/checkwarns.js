const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

module.exports = {
    config: {
        name: "checkwarn",
        description: "Warns the person",
        usage: "-checkwarn <@user> ",
        category: "Moderation",
        accessableby: "Moderators",
        aliases: ["checkallwarn", "checkwarns", "checkallwarns"]
    },
    run: async (bot, message, args) => {
        let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
        let user = message.mentions.users.first();
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("❌**Error:** You don't have the **Kick Members** permission!");
        if(message.mentions.users.size < 1) return message.reply('You must mention someone to check their warns.').catch(console.error);
        if(!user) return message.reply("Couldn't find that user...");
        if(!warns[`${user.id}, ${message.guild.id}`]){
        warns[`${user.id}, ${message.guild.id}`] = {
            warns: 0
        };
    }
       
    
            reason = 'This user doesnt have any warns!'
       

  let dmsEmbed = new Discord.MessageEmbed()
  .setColor("#5261f8")
  .setAuthor(`[CHECKWARNS] | ${user.username}#${user.discriminator}`)
  .setDescription(`**User:** ${user} (${user.id}) has ${warns[`${user.id}, ${message.guild.id}`].warns} warns \n**Checked by:** ${message.author} (${message.author.id})`)
  .setTimestamp()

  message.channel.send(dmsEmbed)
  
}

}