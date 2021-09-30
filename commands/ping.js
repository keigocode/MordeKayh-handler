module.exports = {
	value: ['ping', 'speedtest', 'pinga'],
	description: "Mira que la velocidad de la API y de nuestro host barato. ",
	type: "info",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon) => {
		message.channel.send(embed({
			title: "Ping servicio",
			description: `**Host ping:** ${Date.now() - message.createdTimestamp}ms \n\n **API Ping: ** ${Math.round(bot.ws.ping)}ms`,
			footer
		}))
	}
}