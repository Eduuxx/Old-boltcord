const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "kick",
        description: "Kick a user from the guild!",
        usage: "&kick <@user> {reason}",
        category: "moderation",
        accessableby: "Moderator",
        aliases: ["k"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["KICK_MEMBERS"])) return message.channel.send("You dont have permission to perform this command!")

    let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    if(!kickMember) return message.channel.send("Please provide a user to kick!")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["KICK_MEMBERS"])) return message.channel.send("I dont have permission to do this!")
    
kickMember.send(`Hello, you have been kicked from ${message.guild.name} for: ${reason}`).catch((err) => console.log(`I can't send message to this fucker eitehr he blocked me or hes a bot like everyone else.`))
    await kickMember.kick()

    

    message.channel.send(`${kickMember} has been kicked`)

    let embed = new MessageEmbed()
    .setAuthor(`[KICK] | ${kickMember.user.username}#${kickMember.user.discriminator}`)
    .setColor("#5261f8")
    .setDescription(`**Kicked:** ${kickMember} (${kickMember.id})\n**Moderator:** ${message.author} (${message.author.id})\n**Reason:** ${reason}`)
    .setTimestamp()

    let sChannel = message.guild.channels.cache.find(c => c.name === "modlogs")
        sChannel.send(embed)

    }
}