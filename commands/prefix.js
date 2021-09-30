module.exports = {
	value: ['prefix', 'prefijo', 'command-prefix', 'setprefix', 'ponerprefijo'],
	description: "Colocale un prefijo personalizado al bot :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('MANAGE_GUILD');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			if (!message.content.slice(iniciacon.length + 1))
				return message.channel.send(
					embed({
						title: 'Prefijo',
						description: `El prefijo de este servidor es: ${servidor.prefix}`,
						footer
					})
				);
			const prefijo = message.content.slice(iniciacon.length + 1);
			servidor.prefix = prefijo;
			init.setServidor(servidor);
			message.channel.send(
				embed({
					title: 'Prefijo',
					description: `El prefijo en este servidor ha sido cambiado: ${
						servidor.prefix
					}`,
					footer
				})
			);
			let registros = message.guild.channels.cache.get(servidor.registros);
			if (registros) {
				registros.send(
					embed({
						title: 'Prefijo',
						description: `El prefijo en este servidor ha sido cambiado: ${
							servidor.prefix
						}`,
						footer
					})
				);
			}
		}
	}
}