module.exports = {
	value: ['sug.eliminar', 'eliminarsugerencia', 'borrarsugerencia', 'es', 'bs'],
	description: "Elimina las sugerencias que quieras con este comando, y dar una razon por el cual se elimino. :)",
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
						title: 'Sugerencias',
						description: `Para usar ${
							servidor.prefix
						}sug.eliminar <idsugerencia> <comentario>`,
						footer
					})
				);
			const todo = message.content.split(' ', 2);
			const id = todo[1];
			const sugerencia = servidor.sugs.find(ch => ch.id === id);
			if (!sugerencia)
				return message.channel.send(
					embed({
						title: 'Sugerencias',
						description: 'Ponga los datos de la sugerencia.',
						footer
					})
				);
			const canalsug = message.guild.channels.cache.get(sugerencia.canal);
			if (!canalsug) {
				message.channel.send(
					embed({
						title: 'Sugerencias',
						description: 'La sugerencia o el canal donde estaba ya no existe.',
						footer
					})
				);
			} else {
				const comentario = message.content.slice(
					todo[0].length + todo[1].length + 2
				);
				if (!comentario)
					return message.channel.send(
						embed({
							title: 'Sugerencias',
							description: 'Inserte la razon de su deniegue que quiere colocar',
							footer
						})
					);
				canalsug.messages
					.fetch(sugerencia.id)
					.then(msg => {
						msg.delete().then(() => {
							messagePrivate(
								message,
								sugerencia.author,
								embed({
									title: `Sugerencias | ${message.guild.name}`,
									description: `Una sugerencia tuya ha sido eliminada.`,
									fields: [
										{
											title: 'Sugerencia eliminada',
											text: sugerencia.sugerencia
										},
										{ title: 'Razon', text: comentario }
									],
									footer
								})
							);
							init.removeSugerencia(sugerencia, servidor);
							let mensaje2 = embed({
								title: 'Sugerencia eliminada',
								description: `Se ha eliminado la sugerencia con ID: ${
									sugerencia.id
								}`,
								fields: [
									{ title: 'Sugerencia', text: sugerencia.sugerencia },
									{ title: 'Sugerencia de', text: `<@!${sugerencia.author}>` },
									{ title: 'Denegada por', text: `<@!${message.author.id}>` },
									{ title: 'Razon', text: comentario }
								],
								footer
							});
							message.channel.send(mensaje2);
							let registros = message.guild.channels.cache.get(
								servidor.registros
							);
							if (registros) {
								registros.send(mensaje2);
							}
						});
					})
					.catch(() => {
						message.channel.send(
							embed({
								title: 'Sugerencias',
								description: 'Esta sugerencia ya no existe.',
								footer
							})
						);
					});
			}
		}
	}
}