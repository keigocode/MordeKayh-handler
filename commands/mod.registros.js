module.exports = {
	value: ['mod.registros', 'registros', 'config.registros', 'records'],
	description: "Elige el canal donde se enviaran los registros del bot.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			const mencion = message.mentions.channels.first();
			const staff = message.guild.channels.cache.get(servidor.registros);
			// RESET CONFIG
			let datamessage = message.content.slice(iniciacon.length + 1);
			if(datamessage == "false"){
				servidor.registros = null;
				init.setServidor(servidor);
				let mensajereset = embed({
					title: 'Configuraciones',
					description: `El canal de registros ha sido reseteado.`,
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
						description: `El canal de registros guardado es este: \n\n ${
							staff ? staff : 'No hay canal de registros'
						}`,
						footer
					})
				);
			}
			servidor.registros = mencion.id;
			init.setServidor(servidor);
			let mensaje = embed({
				title: 'Configuraciones',
				description: `El canal <#${
					mencion.id
				}> ha sido guardado como canal registros.`,
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