const ms = require('ms')
const{MessageEmbed}=require('discord.js')
const{Timers}=require('../../variable')

const { ownerid, ownersid } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "timer",
        description: "sets a timer for eDDy!",
        usage: "s!timer",
        category: "owner",
        accessableby: "Bot owner",
        aliases: ["timers"]
    },

run: async (bot, message, args) => {
    
    if(message.author.id != ownerid + ownersid) return message.channel.send("You are not the bot owner!")

    if(!args[0]){
        return message.channel.send(`You did not specify the amount of time you wish to set a timer for!`)
    }
    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given"

    if(!args[0].endsWith("d")){
        if(!args[0].endsWith("h")){
            if(!args[0].endsWith("m")){
                return message.channel.send(`You did not use the proper format for the the time!`)
            }
        }
    }
    if(isNaN(args[0][0])){
        return message.channel.send(`That is not a number!`)
    }
    Timers.set(message.author.id+" G "+message.guild.name,{
        Guild:message.guild.name,
        Author:{
            Tag:message.author.tag,
            ID:message.author.id
        },
        Time:ms(args[0])
    })
    message.channel.send(`${message.author.tag} you have set a timer for ${args[0]} (${ms(args[0])}MS)`)
    setTimeout(() => {
        let Embed = new MessageEmbed()
        .setTitle(`Timer finished in guild ${message.guild.name}..`)
        .setColor("#f9f9f6")
        .setDescription(`⌛ Timer: ${args[0]}\n⌛ Timer set for: ${reason}`)
        .setFooter("©️ eDDy#5079", bot.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
        message.author.send(Embed)
        Timers.delete(message.author.id+" G "+message.guild.name)
    }, ms(args[0]));
    

}}