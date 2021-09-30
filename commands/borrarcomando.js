module.exports = {
	value: ['borrarcomando', 'eliminarcomando', 'commands.delete', 'deletecommand'],
	description: "Borra los comandos personalizados.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('MANAGE_GUILD');
		if (!permisos) {
			message.channel.send(nopermisos);
		} else {
			let idsearch = message.content.slice(iniciacon.length + 1);
			let buscar = servidor.commandsper.find(ch => ch.id == idsearch);
			if (!buscar) {
				message.channel.send(
					embed({
						title: 'Comandos',
						description: 'Este comando no existe.',
						footer
					})
				);
			} else {
				init.removeComando(buscar, servidor);
				let mensaje = embed({
					title: 'Comando eliminado',
					description: `El comando con el ID ${buscar.id} ha sido eliminado`,
					footer
				});
				message.channel.send(mensaje);
				const registros = message.guild.channels.cache.get(servidor.registros);
				if (registros) {
					registros.send(mensaje);
				}
			}
		}
	}
}