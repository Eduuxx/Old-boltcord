const {MessageEmbed} = require('discord.js')
const {formatDate} = require('../../functions')
const { green } = require('../../colours.json')


module.exports = {
    config: {
        name: "avatar",
        description: "Sends peoples avatar from database!",
        usage: "s!avatar [user mention]",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["avatars", "av"]
    },

 run: async (bot, message, args) =>{
    let Embed = new MessageEmbed()
  
    let User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    
    Embed.setTitle(`${bot.users.cache.get(User.id).tag}'s avatar!`)
    Embed.setColor("#5261f8")
    Embed.setImage(bot.users.cache.get(User.id).displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    Embed.setFooter(`Requested by: ${message.author.tag}`)
    return message.channel.send(Embed)
 }}

