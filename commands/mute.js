module.exports = {
	value: ['silenciar', 'paraco', 'mute', 'mutear'],
	description: "Silencia a los usuarios, recuerda tener el rol configurado.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta ? pregunta : message.member.hasPermission('MUTE_MEMBERS');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			if (!message.content.slice(iniciacon.length + 1))
				return message.channel.send(
					embed({
						title: 'Silenciar',
						description: `Para usar ${
							servidor.prefix
						}mute <tag> <tiempo> <razon>`,
						footer
					})
				);
			let muterol = message.guild.roles.cache.get(servidor.mute);
			if (muterol) {
				const user = message.mentions.users.first();
				if (!user) {
					message.channel.send(
						embed({
							title: 'Servidor',
							description: 'Mencione el usuario al que quiere silenciar.',
							footer
						})
					);
				} else {
					const member = message.guild.member(user);
					if (!member) {
						message.channel.send(noesta);
					} else {
						// USUARIO SANCIONADO
						let usuariosancionado = init.usuario(servidor, member.id);
						let cadena = message.content;
						let subcadena = cadena.split(' ', 4);
						let tiempomute = '';
						let timemostrar = '';
						let razon = cadena.slice(
							subcadena[0].length + subcadena[1].length + 2
						);
						if (!subcadena[2]) {
							timemostrar = 'Nunca, es permanente';
						} else {
							if (!timems(subcadena[2])) {
								timemostrar = 'Nunca, es permanente';
							} else {
								razon = razon.slice(subcadena[2].length);
								tiempomute = timems(subcadena[2]);
								timemostrar = getTimeLong(tiempomute);
								timeout(tiempomute, member, servidor.mute);
							}
						}
						if (!razon) {
							razon = 'Sin razon';
						}
						member.roles.add(servidor.mute);
						usuariosancionado.mute = usuariosancionado.mute + 1;
						init.setUsuario(servidor, member.id, usuariosancionado);
						let mensaje = embed({
							title: 'Servidor',
							description: `El usuario <@!${
								member.id
							}> ha sido silenciado por <@!${message.author.id}>.`,
							fields: [
								{ title: 'Tiempo', text: `Expira ${timemostrar}` },
								{ title: 'Razon', text: razon },
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
						messagePrivate(message, member.id, embed({
								title: `Servidor | ${message.guild.name}`,
								description: `Has sido silenciado del servidor por <@!${
									message.author.id
								}>.`,
								fields: [
									{ title: 'Razon', text: razon },
									{ title: 'Expira en', text: `${timemostrar}` }
								],
								footer
							})
						);
					}
				}
			} else {
				message.channel.send(
					embed({
						title: 'Servidor',
						description: 'No hay rol de Silenciado.',
						footer
					})
				);
			}
		}
	}
}