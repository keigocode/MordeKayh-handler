module.exports = {
	value: ['unmute', 'desilenciar', 'quitarcinta'],
	description: "Quitale el silenciado a un usuario. :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('MUTE_MEMBERS');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			if (!message.content.slice(iniciacon.length + 1))
				return message.channel.send(
					embed({
						title: 'Desilenciar',
						description: `Para usar ${servidor.prefix}unmute <tag> <razon>`,
						footer
					})
				);
			const user = message.mentions.users.first();
			if (!user) {
				message.channel.send(
					embed({
						title: 'Servidor',
						description: 'Mencione al usuario que quiere Desilenciar.',
						footer
					})
				);
			} else {
				const member = message.guild.member(user);
				if (!member) {
					message.channel.send(noesta);
				} else {
					let razon = message.content.slice(
						iniciacon.length + 2 + `<@!${member.id}>`.length
					);
					let realrazon = razon ? razon : 'No hay razon';
					member.roles
						.remove(servidor.mute, 'Demutearlo')
						.then(() => {
							let usuariosancionado = init.usuario(servidor, member.id);
							usuariosancionado.mute = usuariosancionado.mute - 1;
							init.setUsuario(servidor, usuariosancionado.usuario, usuario);
							let mensaje = embed({
								title: 'Servidor',
								description: `El usuario <@!${
									member.id
								}> ha sido desilenciado por <@!${message.author.id}>`,
								fields: [
									{ title: 'Razon', text: realrazon },
									{ title: 'Veces silenciado', text: usuariosancionado.mute }
								],
								footer
							});
							message.channel.send(mensaje);
							let registros = message.guild.channels.cache.get(
								servidor.registros
							);
							if (registros) {
								registros.send(mensaje);
							}
							messagePrivate(
								message,
								member.id,
								embed({
									title: `Servidor | ${message.guild.name}`,
									description: `Has sido desilenciado del servidor por <@!${
										message.author.id
									}>.`,
									fields: [{ title: 'Razon', text: realrazon }],
									footer
								})
							);
						})
						.catch(() => {
							message.channel.send(
								embed({
									title: 'Servidor',
									description: 'Este usuario no esta silenciado.',
									footer
								})
							);
						});
				}
			}
		}
	}
}