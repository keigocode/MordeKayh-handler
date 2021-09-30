module.exports = {
	value: ['unwarn', 'desavisar', 'perdoname'],
	description: "Quitales el sucio aviso que les pusiste >:)",
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
						description: 'Menciona al usuario que quieres quitar el aviso.',
						footer
					})
				);
			} else {
				if (!message.content.slice(iniciacon.length + 1))
					return message.channel.send(
						embed({
							title: 'Avisos a un usuario',
							description: `Para usar ${servidor.prefix}unwarn <tag> <razon>`,
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
						iniciacon.length + 2 + `<@!${member.id}>`.length
					);
					let realrazon = razon ? razon : 'No hay razon';
					usuariosancionado.warn = usuariosancionado.warn - 1;
					init.setUsuario(servidor, member.id, usuariosancionado);
					let mensaje = embed({
						title: 'quitarwarn',
						description: `El usuario <@!${
							member.id
						}> se la ha quitado un warn por <@!${message.author.id}>`,
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