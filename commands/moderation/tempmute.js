const discord = require("discord.js");
const ms =require ("ms");

module.exports = {
    config: {
        name: "tempmute",
        description: "tempmutes someone from database!",
        usage: "&tempmute @user 1s/m/h/d <reason>",
        category: "moderation",
        accessableby: "Staff",
        aliases: ["softmute"]
    },

run: async (bot, message, args) => {

    //-tempmute @user 1s/m/h/d

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!tomute) return message.reply("Couldn't find user.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
    let muterole = message.guild.roles.cache.find(role => role.name === "Muted");
    //start of create role
    if(!muterole){
      try{
        muterole = await message.guild.roles.create({
            data: {
            name: "Muted",
          color: "#5261f8",
          permissions:[]
        }})
        message.guild.channels.cache.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.reply("You didn't specify a time!");
  
    await(tomute.roles.add(muterole.id));
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
  
    setTimeout(function(){
      tomute.roles.remove(muterole.id);
      message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));
  }
 
    //end of module
}