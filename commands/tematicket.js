module.exports = {
	value: ['tematicket', 'settema', 'agregartema', 'setthemeticket'],
	description: "Agregalo un tema en espesifico al ticket.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		const ticket = servidor.tickets.find(ch => ch.id == message.channel.id);
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('MANAGE_CHANNELS');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			if (!ticket) {
				message.channel
					.send(
						embed({
							title: 'Ticket',
							description: 'Esto no es un ticket',
							footer: {
								text: `Este mensaje se eliminara en 5segundos - Ejecutado por ${
									message.author.tag
								}`,
								icon: message.author.avatarURL()
							}
						})
					)
					.then(msg => {
						setTimeout(() => {
							msg.delete();
						}, 5500);
					});
			} else {
				const name = message.content.slice(iniciacon.length + 1);
				if (!name)
					return message.channel.send(
						embed({
							title: 'Ticket',
							description: 'Ponga el nuevo tema del ticket.',
							footer
						})
					);
				message.channel.setName(name);
				message.channel.send(
					embed({
						title: 'Ticket',
						description: `El tema del ticket a cambiado a: ${name}`,
						footer
					})
				);
				messagePrivate(
					message,
					ticket.author,
					embed({
						title: `Tickets | ${message.guild.name}`,
						description:
							'Tu ticket `' + ticket.razon + '` ha sido cambiado de tema.',
						fields: [
							{ title: 'Cambiado por', text: `<@!${message.author.id}>` },
							{ title: 'Nuevo tema', text: name },
							{
								title: 'Creado',
								text: `Hace ${getTimeLong(
									getRemainTime(ticket.creado).remainTime
								)}`
							}
						],
						footer
					})
				);
				let registros = message.guild.channels.cache.get(servidor.registros);
				if (registros) {
					registros.send(
						embed({
							title: `Tickets`,
							description: `El tema del ticket a cambiado a: ${name}`,
							fields: [
								{ title: 'Ticket creado por', text: `<@!${ticket.author}>` }
							],
							footer
						})
					);
				}
			}
		}
	}
}