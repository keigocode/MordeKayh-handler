module.exports = {
	value: ['verificar.texto', 'verificar.text', 'verify.text', 'text.verify'],
	description: "Dile a tus usuarios que hacer con el mensaje de verificación.",
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
						description: `El texto de la verificación es este: ${
							servidor.verification.text
						}.`,
						footer
					})
				);
			servidor.verification.text = texto;
			init.setServidor(servidor);
			message.channel.send(
				embed({
					title: 'Verificación texto',
					description:
						'se guardo el texto `' +
						servidor.verification.text +
						'` en el mensaje de verificación',
					footer
				})
			);
		}
	}
}