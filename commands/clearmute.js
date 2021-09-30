module.exports = {
	value: ['clearmute', 'limpiarmutes', 'nostonks'],
	description: "Quitale el historial de mutes a un usuario.",
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
						title: 'Limpiar silencios',
						description: `${servidor.prefix}clearmute @tag#1234`,
						footer
					})
				);
			} else {
				let usuariosancionado = init.usuario(servidor, user.id);
				usuariosancionado.mute = 0;
				init.setUsuario(servidor, user.id, usuariosancionado);
				let mensaje = {
					title: 'Historial limpiado',
					description: `Se ha limpiado el historial de <@!${user.id}>`,
					footer
				};
				message.channel.send(embed(mensaje));
				let registros = message.guild.channels.cache.get(servidor.registros);
				if (registros) {
					registros.send(mensaje);
				}
			}
		}
	}
}