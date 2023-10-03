const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "unban",
        description: "Unban a user from the guild!",
        usage: "k!unban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["ub", "unbanish"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

		
	if(isNaN(args[0])) return message.channel.send("You need to provide an ID.")
    let bannedMember = await bot.users.fetch(args[0])
        if(!bannedMember) return message.channel.send("Please provide a user id to unban someone!")

    let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command!")|
    message.delete()
    try {
        message.guild.members.unban(bannedMember, reason)
        message.channel.send(`**${bannedMember.tag}** has been unbanned from the guild!`)
    } catch(e) {
        console.log(e.message)
    }

    let embed = new MessageEmbed()
    .setColor("#f9f9f6")
    .setAuthor(`[UNBAN]`)
    .setDescription(`**Unbanned:** ${bannedMember}\n**Moderator:** ${message.author}\n**Reason:** ${reason}`)
    .setTimestamp()
    
        let sChannel = message.guild.channels.cache.find(c => c.name === "modlogs")
        sChannel.send(embed)

    }
}
