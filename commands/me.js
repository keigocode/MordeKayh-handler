const {timems, getTime, getTimeLong, forDate, getRemainTime} = require('./../src/helpers/timems');

module.exports = {
	value: ['me', 'yo', 'infouser', 'user', 'quien-es-el-puto'],
	description: "Mira los stats de un usuario, si eres staff podras mirar algo mas UwU.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let entrada = getTimeLong(getRemainTime(message.member.joinedAt).remainTime);
		let creacion = getTimeLong(getRemainTime(message.author.createdAt).remainTime);
		let mention = message.mentions.users.first();
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('MANAGE_GUILD');
		const cuenta = embed({
			title: `${message.author.tag}`,
			description: `Aqui estan los datos de tu cuenta: \n **Creación de la cuenta: **hace ${creacion} \n **Entrada:** hace ${entrada} \n **Apodo: ** ${
				message.member.nickname ? message.member.nickname : 'No tiene'
			} \n **Nivel: **${usuario.nivel} \n **Exp: **${usuario.xp} / ${
				usuario.xpnext
			} \n **Mensajes enviados: **${usuario.mensajes}`,
			thumbnail: message.author.avatarURL(),
			footer
		});
		if (!permisos) {
			message.channel.send(cuenta);
		} else {
			if (!mention) {
				message.channel.send(cuenta);
			} else {
				const member = message.guild.member(mention.id);
				if (!member) {
					message.channel.send(noesta);
				} else {
					const user = init.usuario(servidor, member.id);
					const entrada_member = getTimeLong(
						getRemainTime(member.joinedAt).remainTime
					);
					const creacion_member = getTimeLong(
						getRemainTime(member.user.createdAt).remainTime
					);
					message.channel.send(
						embed({
							title: `Cuenta ${member.user.tag}`,
							description: `Aqui estan los datos de la cuenta: \n **Creación de la cuenta: **hace ${creacion_member} \n **Entrada:** hace ${entrada_member} \n **Apodo: ** ${
								member.nickname ? member.nickname : 'No tiene'
							} \n **Nivel: **${user.nivel} \n **Exp: **${user.xp} / ${
								user.xpnext
							} \n **Mensajes enviados: **${
								user.mensajes
							} \n **Veces silenciado: **${user.mute} \n **Veces avisado: **${
								user.warn
							} \n **Veces expulsado: **${user.kick} \n **Veces vetado: **${
								user.ban
							}`,
							thumbnail: member.user.avatarURL(),
							footer
						})
					);
				}
			}
		}
	}
}