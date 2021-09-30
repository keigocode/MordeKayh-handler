module.exports = {
	value: ['reset-prefix', 'resetprefix', 'resetearprefijo'],
	description: "Elimina el prefijo actual.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
	let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('ADMINISTRATOR');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			let mensaje = embed({
				title: 'Prefijo',
				description: 'El prefijo del bot ha sido reiniciado.',
				fields: [{ title: 'Prefijo ahora', text: 's!' }],
				footer
			});
			message.channel.send(mensaje);
			servidor.prefix = 's!';
			init.setServidor(servidor);
			let registros = message.guild.channels.cache.get(servidor.registros);
			if (registros) {
				registros.send(mensaje);
			}
		}
	}
}