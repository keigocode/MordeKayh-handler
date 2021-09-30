const {timems, getTime, getTimeLong, forDate, getRemainTime} = require('./../src/helpers/timems');

module.exports = {
	value: ['sugerir', 'suggestion', 'sugerencia'],
	description: "Permite que tus usuarios sugieran y mantener un servidor o comunidad mas agradable.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		if (!message.content.slice(iniciacon.length + 1))
			return message.channel.send(
				embed({
					title: 'Sugerencias',
					description: `Para hacer una sugerencia: ${servidor.prefix}sugerencia <texto de la sugerencia>`,
					footer
				})
			);
		const texto = message.content.slice(iniciacon.length + 1);
		const canal = message.guild.channels.cache.get(servidor.sugerencias);
		const sugerencias = canal ? canal : message.guild.channels.cache.find(ch => ch.name.includes('sugerencia'));
		if (!sugerencias) {
			message.channel.send(
				embed({
					title: 'Servidor',
					description: 'Las sugerencias estan desactivadas en este servidor.',
					footer
				})
			);
		} else {
			let sugerencia = {
				title: 'Sugerencia',
				description: `${texto}`
			};
			sugerencias.send(embed(sugerencia)).then(msg => {
				init.setSugerencia({
						id: msg.id,
						canal: msg.channel.id,
						author: message.author.id,
						sugerencia: texto
					},
					servidor
				);
				msg.react('<:checkmark:886012180959461427>');
				msg.react(`<:error:886012201557708810>`);
				sugerencia.footer = {text: `ID: ${msg.id} - Sugerido por ${message.author.tag} - ${forDate(new Date()).dia} de ${forDate(new Date()).mes} del año ${forDate(new Date()).año}`, icon: message.author.avatarURL()};
				msg.edit(embed(sugerencia)).then(() => {
					'yes'
				})
				let registros = message.guild.channels.cache.get(servidor.registros);
				if (registros) {
					registros.send(
						embed({
							title: 'Sugerencia enviada',
							description: `<@!${message.author.id}> ha hecho una sugerencia.`,
							fields: [
								{ title: 'ID', text: msg.id },
								{ title: 'Sugerencia', text: texto }
							],
							footer
						})
					);
				}
			});
			message.channel.send(embed({
				title: 'Sugerencias',
				description: `Se ha enviado la sugerencia. \n\n **Sugerencia de**\n <@!${
					message.author.id
				}> \n\n**Contenido**\n${texto}`,
				footer
			}));
		}
	}
}