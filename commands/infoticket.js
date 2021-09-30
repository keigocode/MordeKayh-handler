const {timems, getTime, getTimeLong, forDate, getRemainTime} = require('./../src/helpers/timems');

module.exports = {
	value: ['infoticket', 'whoisticket', 'info-soporte'],
	description: "Mira la informacion del ticket.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('VIEW_CHANNEL');
		const ticket = servidor.tickets.find(ch => ch.id == message.channel.id);
		if (!ticket) {
			message.channel
				.send(
					embed({
						title: 'Tickets',
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
			const member = message.guild.member(ticket.author);
			message.channel.send(
				embed({
					title: `Ticket información`,
					description:
						'Aqui se encuentra algo de información acerca de este ticket.',
					fields: [
						{ title: 'Creado por', text: `<@!${member.id}>` },
						{ title: 'Razon', text: ticket.razon },
						{
							title: 'Creado',
							text: `Creado hace ${getTimeLong(
								getRemainTime(ticket.creado).remainTime
							)}`
						}
					],
					footer: {
						text: `ID: ${ticket.id} - Ejecutado por ${message.author.tag}`,
						icon: message.author.avatarURL()
					}
				})
			);
		}
	}
}