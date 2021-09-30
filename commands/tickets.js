const {timems, getTime, getTimeLong, forDate, getRemainTime} = require('./../src/helpers/timems');

module.exports = {
	value: ['nuevo', 'ticket', 'create-ticket', 'open-ticket', 'soporte'],
	description: "Usuario y staff, la mejor combinación. Dale soporte a tus usuarios con este sistema hermoso.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		const categoria = message.guild.channels.cache.get(
			servidor.categorytickets
		);
		const razon = message.content.slice(iniciacon.length + 1);
		if (!categoria) {
			message.channel.send(embed({
				title: 'Tickets',
				description: 'Esta opcion no esta habilitada en el servidor.',
				footer
			}));
		} else {
			let buscando_ticket = servidor.tickets.find(ch => ch.author == message.author.id);
			if(buscando_ticket) {
				let channel = message.guild.channels.cache.get(`${buscando_ticket.id}`);
				if(!channel){
					servidor.tickets.forEach((element, i, array) => {
						if(element.id == buscando_ticket.id){
							array.splice(i, 1);
							servidor.tickets = array;
							init.setServidor(servidor);
						}
					})
				}
				return message.channel.send(embed({
					title: "Tickets",
					description: `<@!${message.author.id}> ya tienes un ticket abierto. <#${buscando_ticket.id}>`,
					footer
				}))
			};
			let ticketemoji = '🎫';
			message.guild.channels.create(`${ticketemoji}ticket-${message.author.username}`).then(este => {
					message.channel.send(
						embed({
							title: 'Tickets',
							description:
								'Has creado un ticket, aqui se muestra algo de información',
							fields: [
								{
									title: 'Creado',
									text: `${forDate(new Date()).dia} de ${forDate(new Date()).mes} del ${forDate(new Date()).año}`
								}
							],
							footer
						})
					);
					este.setParent(categoria.id).then(este2 => {
						let mensaje = embed({
							title: 'Ticket creado',
							description: razon ? razon : 'No hay razon',
							footer: {
								text: `ID: ${este.id} - Creado por ${message.author.tag}`,
								icon: message.author.avatarURL()
							}
						});
						este2.send(mensaje);
						let registros = message.guild.channels.cache.get(
							servidor.registros
						);
						if (registros) {
							registros.send(mensaje);
						}
						message.delete();
						init.setTicket(
							{
								id: este2.id,
								razon: razon ? razon : 'No hay razon',
								author: message.author.id,
								creado: new Date()
							},
							servidor
						);
						este2.updateOverwrite(
							message.author.id,
							{
								SEND_MESSAGES: true,
								VIEW_CHANNEL: true
							},
							'metiendolo'
						);
						let staff = message.guild.roles.cache.find(
							ch => ch.id == servidor.staff
						);
						if (staff)
							return este2.updateOverwrite(
								staff,
								{
									SEND_MESSAGES: true,
									VIEW_CHANNEL: true
								},
								'metiendolo'
							);
					});
				});
		}
	}
}