const ms = require('ms');
module.exports = {
    config: { 
        name: "unlock",
        description: "Unmutes a member in the discord!",
        usage: "unlock",
        category: "moderation",
        accessableby: "Members",
        aliases: ["unlock"]
    },
    run: async (bot, message, args) => {
        if (!bot.lockit) bot.lockit = [];
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return msg.reply("❌**Error:** You don't have the permission to do that!");
      
          message.channel.createOverwrite(message.guild.id, {
            SEND_MESSAGES: null
          }).then(() => {
            message.channel.send('Lockdown unlocked <:hype:845658420283179008>');
            delete bot.lockit[message.channel.id];
          }).catch(error => {
            console.log(error);
          })
        }};