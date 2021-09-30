module.exports = {
	value: ['mod.mute', 'mute.rol', 'mute.role', 'silenciado.rol'],
	description: "El rol de silenciado, recuerda tenerlo configurado XD.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			const mencion = message.mentions.roles.first();
			const staff = message.guild.roles.cache.get(servidor.mute);
			// RESET CONFIG
			let datamessage = message.content.slice(iniciacon.length + 1);
			if(datamessage == "false"){
				servidor.mute = null;
				init.setServidor(servidor);
				let mensajereset = embed({
					title: 'Configuraciones',
					description: `El rol de silenciado ha sido reseteado.`,
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
						description: `El rol silenciado guardado es este: \n\n ${
							staff ? staff : 'No hay rol silenciado'
						}`,
						footer
					})
				);
			}
			servidor.mute = mencion.id;
			init.setServidor(servidor);
			let mensaje = embed({
				title: 'Configuraciones',
				description: `El rol <@&${
					mencion.id
				}> ha sido guardado como rol silenciado.`,
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