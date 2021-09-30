module.exports = {
	value: ['invitar.bot', 'bot.invitar', 'config.invitar', 'invite'],
	description: "Que te espera en el destino. :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		message.channel.send(embed({
			title: 'Invitame a tu servidor',
			description: `Puedes invitarme a tu servidor dandole click al titulo de este mensaje: "Invitame a tu servidor."`,
			url: `https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8`,
			footer
		}));
	}
}