module.exports = {
	value: ['servidor', 'server', 'guild', 'infoserver', 'server-de-mierda'],
	description: "Mira la información basica del servidor.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		var server = message.guild;
		message.channel.send(embed({
			title: message.guild.name,
			description: `Aqui esta toda la info del servidor. \n\n **Miembros: **(${server.members.cache.map(ch => ch).length}) \n **Canales:** ${server.channels.cache.map(ch => ch).length} \n **Roles: **${server.roles.cache.map(ch => ch).length} \n **Dueño del servidor: **<@!${server.ownerID}> \n **Emojis: **${server.emojis.cache.map(ch => ch).length} \n **ID:** ${server.id}`
		}));
		console.log(server);
	}
}