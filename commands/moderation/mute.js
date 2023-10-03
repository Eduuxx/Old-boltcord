const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");
const customisation = require("../../hands/customisation.json")

module.exports = {
    config: {
        name: "mute",
        description: "Mutes a member in the discord!",
        usage: "&mute <user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["m", "nospeak"]
    },
    run: async (bot, message, args) => {
        let reason = args.slice(1).join(' ');
        if(!message.mentions.users.first())return message.reply("Please mention someone to mute them")
        let user = message.mentions.users.first();
        let muteRole = bot.guilds.cache.get(message.guild.id).roles.cache.find(val => val.name === 'Muted');
        if(message.mentions.users.first().id === customisation.ownerid) return message.reply('You can\'t mute him you pleblord.:facepalm:')
        if(message.author.id === message.mentions.users.first()) return message.reply("You can't mute yourself:facepalm:");
        if (!muteRole) {
          try {
              muteRole = await message.guild.roles.create({ data: {
                  name:"Muted",
                  color: "#000000",
                  permissions:[]
              }});
      
              message.guild.channels.cache.forEach(async (channel, id) => {
                  await channel.createOverwrite(muteRole, {
                      SEND_MESSAGES: false,
                      MANAGE_MESSAGES: false,
                      READ_MESSAGES: false,
                      ADD_REACTIONS: false
                  });
              });
          } catch(e) {
              console.log(e.stack);
          }
        }
        if (reason.length < 1) reason = 'No reason Supplied';
        if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
      
        if (!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) return message.reply(':x: I do not have the correct permissions.').catch(console.error);
        if (message.guild.member(user).roles.cache.has(muteRole.id)) {
          if(message.content.includes("/mute")) return message.reply("that user has already been muted")
        } 
          
          message.guild.member(user).roles.add(muteRole).then(() => {
            const embed = new MessageEmbed()
            .setColor("#5261f8")
            .setAuthor(`[MUTE] | ${user.username}#${user.discriminator} `)
            .setDescription(`**Muted:** ${user} (${user.id})\n**Moderator:** ${message.author} (${message.author.id})\n**Reason:** ${reason}`)
            .setTimestamp()
            let logchannel = message.guild.channels.cache.find(c => c.name === "modlogs");
            if  (!logchannel){
            message.channel.send({embed})
            }else{
              bot.channels.cache.get(logchannel.id).send({embed});
              message.channel.send({embed})
            } 
            if(user.bot) return;
            message.mentions.users.first().send({embed}).catch(e =>{
              if(e) return 
            });
          });
        }
      };