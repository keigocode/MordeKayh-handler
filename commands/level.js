const {Client, MessageAttachment, MessageEmbed, MessageReaction, ReactionCollector, Message, WebhookClient} = require('discord.js');

module.exports = {
	value: ['level', 'lvl', 'nivel'],
	description: "Que te espera en el destino. :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		const realcanvas = require('canvacord');
		const rank = new realcanvas.Rank()
	  .setAvatar(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
	  .setCurrentXP(usuario.xp)
	  .setRequiredXP(usuario.xpnext)
	  .setStatus("dnd")
	  .setProgressBar("#FFFFFF", "COLOR")
	  .setUsername(message.author.username)
	  .setLevel(usuario.nivel, 'NIVEL', true)
	  .setDiscriminator(message.author.discriminator)
	  .setCustomStatusColor('#919aa1')
	  .setRank(usuario.mensajes/1000);
	  rank.build().then(data => {
		  const attachment = new MessageAttachment(data, "RankCard.png");
			message.channel.send(attachment);
		});
	}
}