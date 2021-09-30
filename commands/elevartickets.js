module.exports = {
	value: ['elevar', 'raise', 'subirticket', 'calladmin'],
	description: "Elevar el ticket para que solo pueda ser visto por los admins.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('MANAGE_CHANNELS');
		const ticket = servidor.tickets.find(ch => ch.id == message.channel.id);
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
				const razon = message.content.slice(iniciacon.length + 1);
				message.channel.send(
					embed({
						title: 'Ticket',
						description: 'El ticket ha sido elevado.',
						fields: [{ title: 'Razon', text: razon ? razon : 'No hay razon' }],
						footer
					})
				);
				messagePrivate(
					message,
					ticket.author,
					embed({
						title: `Tickets | ${message.guild.name}`,
						description: 'Un ticket tuyo ha sido elevado.',
						fields: [
							{ title: 'Razon', text: razon ? razon : 'No hay razon' },
							{
								title: 'Creado',
								text: `Hace ${getTimeLong(
									getRemainTime(ticket.creado).remainTime
								)}`
							}
						]
					})
				);
				let registros = message.guild.channels.cache.get(servidor.registros);
				if (registros) {
					registros.send(
						embed({
							title: `Tickets`,
							description: `El tema del ticket ha sido elevado por <@!${
								message.author.id
							}>`,
							fields: [
								{ title: 'Ticket creado por', text: `<@!${ticket.author}>` },
								{
									title: 'Razon de elevado',
									text: razon ? razon : 'No hay razon'
								}
							],
							footer
						})
					);
				}
				let staff = message.guild.roles.cache.get(servidor.staff);
				if (staff)
					return message.channel.updateOverwrite(servidor.staff, {
						VIEW_CHANNEL: false,
						SEND_MESSAGES: false
					});
			}
		}
	}
}