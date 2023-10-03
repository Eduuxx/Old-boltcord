const { Client, Collection, MessageEmbed, Discord} = require("discord.js");
const ytdl = require('ytdl-core');
const { token } = require("./botconfig.json");
const botconfig = require("./botconfig.json");
const random = require('random');
const chalk = require('chalk');
const fs = require('fs');
const jsonfile = require('jsonfile');
const { green } = require("./colours.json")
const bot = new Client();


["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));


bot.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.cache.find(channel => channel.name === "⌠🔔⌡welcome");
    if(!channel) return;
    
    channel.send(`${member} just joined **${channel.guild.name}!**`)


});

bot.on('guildMemberRemove', member =>{

    const channel = member.guild.channels.cache.find(channel => channel.name === "⌠🔔⌡welcome");
    if(!channel) return;
    
    channel.send(`${member} just left the **${channel.guild.name}!**`)

});
  

  
bot.login(token);
