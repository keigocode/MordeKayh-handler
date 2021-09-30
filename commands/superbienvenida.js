module.exports = {
	value: ['superbienvenida', 'megabienvenida', 'bienvenidaconimagen', 'setsuperbienvenida'],
	description: "Una bienvenida con imagen :o",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if(!permisos){
			nopermsdelete(message);
		}else{
			const mencion = message.mentions.channels.first();
			const staff = message.guild.channels.cache.get(servidor.superbienvenida);
			// RESET CONFIG
			let datamessage = message.content.slice(iniciacon.length + 1);
			if(datamessage == "false"){
				servidor.superbienvenida = null;
				init.setServidor(servidor);
				let mensajereset = embed({
					title: 'Configuraciones',
					description: `El canal de super bienvenida ha sido reseteado.`,
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
						description: `El canal de super bienvenida guardado es este: \n\n ${staff ? staff : 'No hay canal de super bienvenida.'}`,
						footer
					})
				);
			}
			servidor.superbienvenida = mencion.id;
			init.setServidor(servidor);
			let mensaje = embed({
				title: 'Configuraciones',
				description: `El canal <#${mencion.id}> ha sido guardado como canal de super bienvenida.`,
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