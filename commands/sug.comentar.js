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
	value: ['sug.comentar', 'comentarsugerencia', 'cs', 'suggestioncomment', 'comentar.sugerencia'],
	description: "Comentar las sugerencias.",
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
						}sug.comentar <idsugerencia> <comentario>`,
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
							description: 'Inserte el comentario que quiere colocar',
							footer
						})
					);
				canalsug.messages
					.fetch(sugerencia.id)
					.then(msg => {
						let mensaje = {
							title: 'Sugerencia comentada',
							description: `${
								sugerencia.sugerencia
							} \n\n **Sugerencia de**\n <@!${sugerencia.author}>`,
							fields: [{ title: 'Comentario', text: comentario }],
							footer: {
								text: `ID: ${sugerencia.id} - Comentario de ${
									message.author.tag
								} - ${forDate(new Date()).dia}/${forDate(new Date()).mes}/${
									forDate(new Date()).año
								}`,
								icon: message.author.avatarURL()
							}
						};
						messagePrivate(
							message,
							sugerencia.author,
							embed({
								title: `Sugerencias | ${message.guild.name}`,
								description: `Una sugerencia tuya ha sido comentada.`,
								fields: [
									{
										title: 'Sugerencia comentada',
										text: sugerencia.sugerencia
									},
									{ title: 'Comentario', text: comentario }
								],
								footer
							})
						);
						let mensaje2 = embed({
							title: 'Sugerencia comentada',
							description: `Se ha comentado la sugerencia con ID: ${
								sugerencia.id
							}`,
							fields: [
								{ title: 'Sugerencia', text: sugerencia.sugerencia },
								{ title: 'Sugerencia de', text: `<@!${sugerencia.author}>` },
								{ title: 'Comentario de', text: `<@!${message.author.id}>` },
								{ title: 'Comentario', text: comentario }
							],
							footer
						});
						message.channel.send(mensaje2);
						msg.edit(embed(mensaje));
						let registros = message.guild.channels.cache.get(
							servidor.registros
						);
						if (registros) {
							registros.send(mensaje2);
						}
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