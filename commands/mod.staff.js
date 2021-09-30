module.exports = {
	value: ['mod.rol', 'mod.staff', 'setstaff', 'rol.staff'],
	description: "Elige el rol de staff para tu servidor, este sera visible en los tickets. :I",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			const mencion = message.mentions.roles.first();
			const staff = message.guild.roles.cache.get(servidor.staff);
			// RESET CONFIG
			let datamessage = message.content.slice(iniciacon.length + 1);
			if(datamessage == "false"){
				servidor.staff = null;
				init.setServidor(servidor);
				let mensajereset = embed({
					title: 'Configuraciones',
					description: `El rol de staff ha sido reseteado.`,
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
			if (!mencion) {
				return message.channel.send(
					embed({
						title: `Configuraciones`,
						description: `El rol staff guardado es este: \n\n ${staff ? staff : 'No hay rol staff'}`,
						footer
					})
				);
			}
			servidor.staff = mencion.id;
			init.setServidor(servidor);
			let mensaje = embed({
				title: 'Configuraciones',
				description: `El rol <@&${mencion.id}> ha sido guardado como rol staff.`,
				footer
			});
			message.channel.send(mensaje);
			let registros = message.guild.channels.cache.get(servidor.registros);
			if (registros) {
				registros.send(mensaje);
			}
		}
	}
}