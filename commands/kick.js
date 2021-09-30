module.exports = {
	value: ['kick', 'expulsar', 'kickear'],
	description: "Expulsar a un usuario. :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('KICK_MEMBERS');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			if (!message.content.slice(iniciacon.length + 1))
				return message.channel.send(
					embed({
						title: 'Expulsar',
						description: `Para usar ${servidor.prefix}kick <tag> <razon>`,
						footer
					})
				);
			const user = message.mentions.users.first();
			if (!user) {
				message.channel.send(
					embed({
						title: 'Servidor',
						description: 'Mencione al usuario que quiere expulsar.',
						footer: footer
					})
				);
			} else {
				const member = message.guild.member(user);
				if (!member) {
					message.channel.send(noesta);
				} else {
					const razon = message.content.split(`<@!${member.id}>`);
					const realrazon = razon[razon.length - 1] ? razon[razon.length - 1] : 'No hay razon';
					member.kick(realrazon).then(() => {
						let servidor = init.servidor(message.guild.id);
						let usuariosancionado = init.usuario(servidor, member.id);
						usuariosancionado.kick = usuariosancionado.kick + 1;
						init.setUsuario(servidor, member.id, usuariosancionado);
						let mensaje = embed({
							title: 'Servidor',
							description: `El usuario <@!${member.id}> ha sido expulsado por <@!${message.author.id}>`,
							fields: [
								{ title: 'Razon', text: realrazon },
								{ title: 'Veces expulsado', text: usuariosancionado.kick }
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
					}).catch(err => {
						message.channel.send(embed({
							title: 'Error',
							description: 'No se ha podido expulsar a este miembro',
							footer: footer
						}));
					});
				}
			}
		}
	}
}