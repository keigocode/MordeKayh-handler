module.exports = {
	value: ['verificar.enviar', 'verify.send', 'verification.send', 'enviar-verificacion'],
	description: "Envia a un canal en especial el mensaje de verificación.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			let canal = message.mentions.channels.first();
			if (!canal)
				return message.channel.send(
					embed({
						title: 'Verificación',
						description:
							'Pon el canal al que quieres enviar la respuesta de verificación.',
						footer
					})
				);
			let verification = servidor.verification ? servidor.verification : {
						title: message.guild.name,
						text: 'Reacciona al emoji de abajo para verificarte',
						rol: null
				  };
			servidor.verification = verification;
			message.guild.channels.cache.get(canal.id).send(embed({
						title: servidor.verification.title,
						description: servidor.verification.text
					})).then(msg => {
					message.channel.send(
						embed({
							title: 'Verificación',
							description:
								'Se ha enviado la verificación al canal. <#' + canal.id + '>',
							footer
						})
					);
					servidor.verificationmsg = msg.id;
					msg.react('<:checkmark:886012180959461427>').then(() => {});
					init.setServidor(servidor);
				}).catch(() => {
					message.channel.send(
						embed({
							title: 'Ha ocurrido un error',
							description: 'Parece que el destino del mensaje ya no existe.',
							footer
						})
					);
				});
		}
	}
}