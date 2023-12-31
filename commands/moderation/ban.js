const { MessageEmbed } = require("discord.js")
const { redlight } = require("../../colours.json");

module.exports = {
    config: {
        name: "ban",
        description: "Bans a user from the guild!",
        usage: "k!ban",
        category: "moderation",
        accessableby: "Administrators",
        aliases: ["b", "banish", "remove"]
    },
    run: async (bot, message, args) => {

   if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

   let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")
 
   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

   banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() =>
   message.guild.members.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err))

   message.channel.send(`**${banMember.user.tag}** has been banned`).then(m => m.delete({timeout:5000}));

    let embed = new MessageEmbed()
    .setColor("#f9f9f6")
    .setAuthor(`[BAN]`)
    .setDescription(`**Banned:** ${banMember}\n**Moderator:** ${message.author}\n**Reason:** ${reason}`)
    .setTimestamp()
    
        let sChannel = message.guild.channels.cache.find(c => c.name === "modlogs")
        sChannel.send(embed)
    }
}