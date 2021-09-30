module.exports = {
	value: ['warn', 'avisar', 'alertar', 'enojado'],
	description: "Alerta a un usuario por su mala activada >:c",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('MUTE_MEMBERS');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			let user = message.mentions.users.first();
			if (!user) {
				message.channel.send(
					embed({
						title: 'Servidor',
						description: 'Menciona al usuario que quieres avisar.',
						footer
					})
				);
			} else {
				if (!message.content.slice(iniciacon.length + 1))
					return message.channel.send(
						embed({
							title: 'Avisos a un usuario',
							description: `Para usar ${servidor.prefix}warn <tag> <razon>`,
							footer
						})
					);
				const member = message.guild.member(user.id);
				if (!member) {
					message.channel.send(
						embed({
							title: 'Servidor',
							description: 'Este usuario no se encuentra en el servidor.',
							footer
						})
					);
				} else {
					let usuariosancionado = init.usuario(servidor, member.id);
					let razon = message.content.slice(
						iniciacon.length + 3 + `<@!${member.id}>`.length
					);
					let realrazon = razon ? razon : 'No hay razon';
					usuariosancionado.warn = usuariosancionado.warn + 1;
					init.setUsuario(servidor, member.id, usuariosancionado);
					let mensaje = embed({
						title: 'Usuario advertido',
						description: `El usuario <@!${
							member.id
						}> ha sido advertido por <@!${message.author.id}>`,
						fields: [
							{ title: 'Razon', text: realrazon },
							{ title: 'Veces avisado', text: usuariosancionado.warn }
						],
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
	}
}