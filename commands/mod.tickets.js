module.exports = {
	value: ['mod.tickets', 'category.tickets', 'config.tickets'],
	description: "Elige la categoria en la que sé crear. :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		const permisos = message.member.hasPermission('ADMINISTRATOR');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			const mensaje = message.content.slice(iniciacon.length + 1);
			// RESET CONFIG
			let datamessage = message.content.slice(iniciacon.length + 1);
			if(datamessage == "false"){
				servidor.categorytickets = null;
				init.setServidor(servidor);
				let mensajereset = embed({
					title: 'Configuraciones',
					description: `La categoria de tickets ha sido reseteada.`,
					footer
				});
				message.channel.send(mensajereset);
				let registros = message.guild.channels.cache.get(servidor.registros);
				if (registros) {
					registros.send(mensajereset);
				}
				return;
			}; 
			// END RESET
			if (!mensaje)
				return message.channel.send(
					embed({
						title: 'Tickets',
						description: `La categoria de tickets guardada que hay es: \n\n ${
							servidor.categorytickets
								? servidor.categorytickets
								: 'No hay categoria'
						}`
					})
				);
			let buscando = message.guild.channels.cache.find(
				ch => ch.name == mensaje
			);
			let buscar = buscando
				? buscando
				: message.guild.channels.cache.find(ch => ch.id === mensaje);
			if (!buscar) {
				message.channel.send(
					embed({
						title: 'Tickes',
						description: 'Esta categoria no existe',
						footer
					})
				);
			} else {
				if (buscar.type == 'category') {
					servidor.categorytickets = buscar.id;
					init.setServidor(servidor);
					let mensaje = embed({
						title: 'Tickets',
						description:
							'La categoria `' +
							buscar.name +
							'` ha sido como elegida como categoria de tickets.'
					});
					message.channel.send(mensaje);
					let registros = message.guild.channels.cache.get(servidor.registros);
					if (registros) {
						registros.send(mensaje);
					}
				} else {
					message.channel.send(
						embed({
							title: 'Tickets',
							description: 'Esta categoria no existe.',
							footer
						})
					);
				}
			}
		}
	}
}