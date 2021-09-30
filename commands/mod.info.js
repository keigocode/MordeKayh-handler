module.exports = {
	value: ['mod.info', 'config.info', 'infoconfig', 'informacion-configuracion'],
	description: "Mira todas las configuraciones en tu servidor.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('MANAGE_GUILD');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			let info = {
				sugs: message.guild.channels.cache.get(servidor.sugerencias) ? message.guild.channels.cache.get(servidor.sugerencias) : 'No hay canal de sugerencias',
				comandos: message.guild.channels.cache.get(servidor.comandos)
					? message.guild.channels.cache.get(servidor.comandos)
					: 'No hay canal de comandos',
				registros: message.guild.channels.cache.get(servidor.registros)
					? message.guild.channels.cache.get(servidor.registros)
					: 'No hay canal de registros',
				tickets: message.guild.channels.cache.get(servidor.categorytickets)
					? message.guild.channels.cache.get(servidor.categorytickets)
					: 'No hay categoria de tickets.',
				silenciado: message.guild.roles.cache.get(servidor.mute)
					? message.guild.roles.cache.get(servidor.mute)
					: 'No hay rol silenciado.',
				staff: message.guild.roles.cache.get(servidor.staff)
					? message.guild.roles.cache.get(servidor.staff)
					: 'No hay rol de staff.',
				niveles: message.guild.channels.cache.get(servidor.niveles) ? message.guild.channels.cache.get(servidor.niveles) : "No hay canal de niveles.",
				bienvenida: message.guild.channels.cache.get(servidor.bienvenida) ? message.guild.channels.cache.get(servidor.bienvenida) : "No hay canal de bienvenida.",
				adios: message.guild.channels.cache.get(servidor.adios) ? message.guild.channels.cache.get(servidor.adios) : "No hay canal de despedida.",
				superbienvenida: message.guild.channels.cache.get(servidor.superbienvenida) ? message.guild.channels.cache.get(servidor.superbienvenida) : "No hay canal de super bienvenida.",
				superdespedida: message.guild.channels.cache.get(servidor.superdespedida)?message.guild.channels.cache.get(servidor.superdespedida) : "No hay canal de super despedida."
			};
			message.channel.send(
				embed({
					title: 'Información',
					description:
						'Aqui se encuentran los datos que se han guardado en este servidor.',
					fields: [
						{ title: 'Canal de sugerencias', text: info.sugs.toString() },
						{ title: 'Canal de comandos', text: info.comandos.toString() },
						{ title: 'Canal de registros', text: info.registros.toString() },
						{ title: 'Categoria de tickets', text: info.tickets.toString() },
						{ title: 'Rol de staff', text: info.staff.toString() },
						{ title: 'Rol Silenciado', text: info.silenciado.toString() },
						{ title: 'Canal de niveles', text: info.niveles.toString() },
						{ title: 'Canal de bienvenida', text: info.bienvenida.toString() },
						{ title: 'Canal de despedida', text: info.adios.toString() },
						{ title: 'Canal de superbienvenida', text: info.superbienvenida.toString() },
						{ title: 'Canal de superdespedida', text: info.superdespedida.toString() },
					],
					footer
				})
			);
		}
	}
}