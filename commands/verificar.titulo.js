module.exports = {
	value: ['verificar.titulo', 'verificar.header', 'verify.title', 'settitleverification'],
	description: "Agregale un titulo mas hermoso a la verificación.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		let realpermisos = permisos;
		if (!realpermisos) {
			nopermsdelete(message);
		} else {
			let texto = message.content.slice(iniciacon.length + 1);
			let verification = servidor.verification
				? servidor.verification
				: {
						title: message.guild.name,
						text: 'Reacciona al emoji de abajo para verificarte',
						rol: null
				  };
			servidor.verification = verification;
			if (!texto)
				return message.channel.send(
					embed({
						title: 'Verificación',
						description: `El titulo de la verificación es este: ${
							servidor.verification.title
						}`,
						footer
					})
				);
			servidor.verification.title = texto;
			init.setServidor(servidor);
			message.channel.send(
				embed({
					title: 'Verificación titulo',
					description:
						'se guardo el titulo `' +
						servidor.verification.title +
						'` en el mensaje de verificación',
					footer
				})
			);
		}
	}
}