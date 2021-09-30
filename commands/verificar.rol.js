module.exports = {
	value: ['verificar.rol', 'verify.role', 'rolverification'],
	description: "Cuandos los usuarios reaccionen al emoji, se les dara el rol.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		let realpermisos = permisos;
		if (!realpermisos) {
			nopermsdelete(message);
		} else {
			let texto = message.mentions.roles.first();
			let verification = servidor.verification ? servidor.verification : {
				title: message.guild.name,
				text: 'Reacciona al emoji de abajo para verificarte',
				rol: ""
			};
			servidor.verification = verification;
			let rolverificado = message.guild.roles.cache.get(servidor.verification.rol) ? message.guild.roles.cache.get(servidor.verification.rol) : `No hay rol verificado`;
			if (!texto)
				return message.channel.send(
					embed({
						title: 'Verificación',
						description: `El rol de la verificación es este: ${rolverificado.toString()}.`,
						footer
					})
				);
			servidor.verification.rol = texto.id;
			init.setServidor(servidor);
			message.channel.send(
				embed({
					title: 'Verificación texto',
					description:
						'se guardo el rol ' +
						texto.toString() +
						' en el mensaje de verificación.',
					footer
				})
			);
		}
	}
}