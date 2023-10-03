const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "unmute",
        description: "Unmutes a member in the discord!",
        usage: "&unmute <@user> <reason>",
        category: "moderation",
        accessableby: "Members",
        aliases: ["unm", "speak"]
    },
    run: async (bot, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You dont have permission to use this command.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES"])) return message.channel.send("I don't have permission to add roles!")

//define the reason and unmutee
let member = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!member) return message.channel.send("Please supply a user to be muted!");

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given"

//define mute role and if the mute role doesnt exist then send a message
let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
if(!muterole) return message.channel.send("There is no mute role to remove!")

//remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
member.roles.remove(muterole.id).then(() => {
    
    message.channel.send(`**${member}** was unmuted!`)
})

//send an embed to the modlogs channel
let embed = new MessageEmbed()
.setColor("#5261f8")
.setAuthor(`[UNMUTED] | ${member.user.username}#${member.user.discriminator}`)
.setDescription(`**Unmuted:** ${member} (${member.id}) \n**Moderator:** ${message.author} (${message.author.id}) \n**Reason:** ${reason}`)
.setTimestamp()

let sChannel = message.guild.channels.cache.find(c => c.name === "modlogs")
sChannel.send(embed)
member.send(embed)
    }
}