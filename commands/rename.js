module.exports = {
	value: ["rename", "renombrar"],
	description: "Renombra canales con este comando.",
	type: "Config",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon) => {
		let managechannels = message.member.hasPermission('MANAGE_CHANNELS')
		let permisos = managechannels ? managechannels : message.member.hasPermission('ADMINISTRATOR');
		if(!permisos){
			nopermsdelete(message);
		}else {
			let objetos = message.content.split(' ', 2);
			let canal = message.guild.channels.cache.get(objetos[1]);
			if(!canal){
				message.channel.send(embed({
					title: "Renombrar canales",
					description: "Parece que este canal no existe.",
					footer
				}))
			}else {
				let newname = message.content.slice(objetos[0].length + objetos[1].length + 1);
				if(!newname) return message.channel.send(embed({
					title: "Renombrar canales",
					description: "Inserte el nuevo nombre para el canal.",
					footer
				}));
				canal.setName(newname).then(() => {
					message.channel.send(embed({
						title: "Renombrar canales",
						description: `Se ha cambiado el nombre del canal ${canal.id} por: ${newname}`,
						footer
					}))
				})
			}
		}
	}
}