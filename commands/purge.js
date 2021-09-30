module.exports = {
	value: ['purge', 'clear', 'purgar', 'esconderenvidencia'],
	description: "Borra multiples mensajes de forma rapida.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('MANAGE_MESSAGES');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			if (!message.content.slice(iniciacon.length + 1))
				return message.channel.send(
					embed({
						title: 'Purgar',
						description: `Para usar ${servidor.prefix}purge <cantidad>`,
						footer
					})
				);
			const cantidad = message.content.substring(iniciacon.length + 1);
			const good = /^(-?(?:\d+)?\.?\d+)?$/.exec(cantidad);
			if (good) {
				let mensaje = embed({
					title: 'Mensajes purgados',
					description: `Se han purgado ${cantidad} de mensajes en <#${
						message.channel.id
					}>`,
					footer
				});
				if (cantidad > 50) {
					if (cantidad > 100) {
						message.channel.send(
							embed({
								title: 'Servidor',
								description: 'El limite de purga es 100.',
								footer: footer
							})
						);
					} else {
						message.channel.bulkDelete(50);
						message.channel.bulkDelete(cantidad);
						let registros = message.guild.channels.cache.get(
							servidor.registros
						);
						if (registros) {
							registros.send(mensaje);
						}
					}
				} else {
					let registros = message.guild.channels.cache.get(servidor.registros);
					if (registros) {
						registros.send(mensaje);
					}
					message.channel.bulkDelete(cantidad);
				}
			} else {
				message.channel.send(
					embed({
						title: 'Purgar',
						description: 'Ponga cuantos mensajes quieres purgar.',
						footer: footer
					})
				);
			}
		}
	}
}