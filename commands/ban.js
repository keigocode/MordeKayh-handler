module.exports = {
	value: ['ban', 'vetar', 'hitler'],
	description: "Saca y veta a los sucios usuarios y manten a tu comunidad limpia. :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('BAN_MEMBERS');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			if (!message.content.slice(iniciacon.length + 1))
				return message.channel.send(
					embed({
						title: 'Vetar',
						description: `Para usar ${servidor.prefix}ban <tag> <razon>`,
						footer
					})
				);
			const user = message.mentions.users.first();
			if (!user) {
				message.channel.send(
					embed({
						title: 'Servidor',
						description: 'Mencione al usuario que quiere vetar.',
						footer: footer
					})
				);
			} else {
				const member = message.guild.member(user);
				if (!member) {
					message.channel.send(noesta);
				} else {
					const razon = message.content.slice(
						iniciacon.length + 2 + member.toString().length
					);
					const realrazon = razon ? razon : 'No hay razon';
					member
						.ban({ reason: realrazon })
						.then(() => {
							messagePrivate(
								embed({
									title: `Servidor | ${message.guild.name}`,
									description: `Has sido vetado del servidor por <@!${
										message.author.id
									}>.`,
									fields: [{ title: 'Razon', text: realrazon }],
									footer
								})
							);
							usuario.ban = usuario.ban + 1;
							init.setUsuario(servidor, usuario.usuario, usuario);
							let mensaje = embed({
								title: 'Servidor',
								description: `El usuario <@!${
									member.id
								}> ha sido vetado por <@!${message.author.id}>`,
								fields: [
									{ title: 'Razon', text: realrazon },
									{ title: 'Veces vetado', text: usuario.ban }
								],
								footer: footer
							});
							message.channel.send(mensaje);
							let registros = message.guild.channels.cache.get(
								servidor.registros
							);
							if (registros) {
								registros.send(mensaje);
							}
						})
						.catch(err => {
							message.channel.send(
								embed({
									title: 'Error',
									description: 'No se ha podido vetar a este miembro',
									footer: footer
								})
							);
						});
				}
			}
		}
	}
}