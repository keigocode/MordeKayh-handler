const {timems, getTime, getTimeLong, forDate, getRemainTime} = require('./../src/helpers/timems');

function messagePrivate(message, memb, mensaje){
  if(!message.guild) return;
  if(!message.guild.member(memb)) return;

  const miembro = message.guild.member(memb)
  miembro.send(mensaje).then(()  => {
  	return;
  }).catch(console.log)
}

module.exports = {
	value: ['cerrar', 'close', 'closeticket'],
	description: "Cierra los tickets con este simple comando.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
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
			const motivo = message.content.slice(iniciacon.length + 1);
			messagePrivate(
				message,
				ticket.author,
				embed({
					title: `Tickets | ${message.guild.name}`,
					description: 'Tu ticket `' + ticket.razon + '` ha sido cerrado.',
					fields: [
						{ title: 'Cerrado por', text: `<@!${message.author.id}>` },
						{
							title: 'Creado',
							text: `Hace ${getTimeLong(
								getRemainTime(ticket.creado).remainTime
							)}`
						},
						{ title: 'Razon', text: motivo ? motivo : 'No hay razon' }
					],
					footer
				})
			);
			let mensaje = embed({
				title: 'Tickets',
				description: `Este ticket ha sido cerrado. Se eliminara en 5 segundos.`,
				fields: [
					{ title: 'Razon de cierre', text: motivo ? motivo : 'No hay razon' }
				],
				footer
			});
			let registros = message.guild.channels.cache.get(servidor.registros);
			if (registros) {
				mensaje.title = `Tickets | ${message.channel.name}`;
				registros.send(mensaje);
			}
			message.channel.send(mensaje);
			setTimeout(() => {
				message.channel.delete();
			}, 5500);
			init.removeTicket(ticket, servidor);
		}
	}
}