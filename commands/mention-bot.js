module.exports = {
	value: "855875300259528735",
	description: "Al mencionar al bot, este dira el prefijo de ese servidor y algun dato mas.",
	type: "mention",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon) => {
		message.channel.send(embed({
			title: `${bot.user.username}`,
			description: `${bot.user.username} ¿Necesitas ayuda?`,
			fields: [
				{ title: 'Prefijo en este servidor', text: servidor.prefix },
				{title: "Invitación del bot", text: "https://discord.com/oauth2/authorize?client_id=855875300259528735&scope=bot&permissions=8"}
			],
			footer
		}));
	}
}