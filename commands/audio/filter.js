const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const filters = [
    "clear",
    "lowbass",
    "bassboost",
    "purebass",
    "8D",
    "vaporwave",
    "nightcore",
    "phaser",
    "tremolo",
    "vibrato",
    "reverse",
    "treble",
    "normalizer",
    "surrounding",
    "pulsator",
    "subboost",
    "surround",
    "karaoke",
    "flanger",
    "gate",
    "haas",
    "mcompand"
]
exports.run = async (client, message, args) => {
    try {
        const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
        if (!channel)
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.wrongcolor)
                    .setFooter(config.footertext, config.footericon)
                    .setTitle(`❌ ERROR | Please join a Channel first`)
                ]
            });
        if (!client.distube.getQueue(message))
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.wrongcolor)
                    .setFooter(config.footertext, config.footericon)
                    .setTitle(`❌ ERROR | I am not playing Something`)
                    .setDescription(`The Queue is empty`)
                ]
            });
        if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.wrongcolor)
                    .setFooter(config.footertext, config.footericon)
                    .setTitle(`❌ ERROR | Please join **my** Channel first`)
                    .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
                ]
            });
        if (!args[0])
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.wrongcolor)
                    .setFooter(config.footertext, config.footericon)
                    .setTitle(`❌ ERROR | Please add a Filtertype`)
                    .setDescription(`Usage: \`${config.prefix}filter <Filtertype>\`\nExample: \`${config.prefix}filter bassboost\``)
                ]
            });
        if (!filters.join(" ").toLowerCase().split(" ").includes(args[0].toLowerCase()))
            return message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor(config.wrongcolor)
                    .setFooter(config.footertext, config.footericon)
                    .setTitle(`❌ ERROR | Not a valid Filtertype`)
                    .setDescription(`Usage: \`${config.prefix}filter <Filtertype>\`\nFilter types:\n> \`${filters.join("`, `")}\``.substr(0, 2048))
                ]
            });
        client.distube.setFilter(message, args[0]);

        message.channel.send({
            embeds: [new MessageEmbed()
                .setColor(config.color)
                .setFooter(config.footertext, config.footericon)
                .setTitle(`✅ Successfully set Filter to: \`${args[0]}\``)
            ]
        }).then(msg => setTimeout(() => msg.delete(), 5000))
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send({
            embeds: [new MessageEmbed()
                .setColor(config.wrongcolor)
                .setFooter(config.footertext, config.footericon)
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            ]
        });
    }
}
exports.help = {
    name: "filter",
    description: "Changes the audio Filter",
    usage: "<prefix>filter",
    example: "~filter"
}
exports.conf = {
    aliases: ["filter"],
    cooldown: 5
}