const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    config: {
        name: "slowmode",
        description: "Unmutes a member in the discord!",
        usage: "slowmode",
        category: "moderation",
        accessableby: "Members",
        aliases: ["slowmode"]
    },
    run: async (bot, message, args) => {
        
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You do not have **MANAGE_CHANNELS** permission!').then(m => m.delete({ timeout: 5000 }));

        if (!args[0]) return message.channel.send('You did not specify a time!').then(m => m.delete({ timeout: 5000}));

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.channel.send('Channel cooldown is already off').then(m => m.delete({ timeout: 5000 }));
            const newembed = new MessageEmbed()

            .setTitle('Slowmode Disabled')
                .setColor('#5261f8')
                .setDescription(`**Disabled by:** ${message.author} (${message.author.id}) \n**Reason:** ${reason} `)
                .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));
                message.channel.send(newembed)   
        
            return message.channel.setRateLimitPerUser(0, reason)

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('not a valid time, please try again!').then(m => m.delete({ timeout: 5000 }));

        if (time >= 21600) return message.channel.send('That slowmode limit is too high, please enter anything lower than 6 hours.').then(m => m.delete({ timeout: 5000 }));

        if (currentCooldown === time) return message.channel.send(`Slowmode is already set to ${args[0]}`);

        embed.setTitle('Slowmode Enabled')
            .addField('Slowmode: ', args[0])
            .addField('Issued by:', message.author)
            .addField('Reason: ', reason)
            .setColor('#5261f8');

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed)); 
        let sChannel = message.guild.channels.cache.find(c => c.name === "modlogs")
        sChannel.setRateLimitPerUser(time, reason).then(m => m.send(embed)); 


    }
}