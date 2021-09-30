module.exports = {
	value: ['verificar.info', 'info.verificar', 'verify.info', 'infoverification'],
	description: "Mira la informacion de la verificación. :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		let realpermisos = permisos;
		if (!realpermisos) {
			nopermsdelete(message);
		} else {
			servidor.verification = servidor.verification ? servidor.verification : {}
			let rol = message.guild.roles.cache.get(servidor.verification.rol) ? message.guild.roles.cache.get(servidor.verification.rol) : 'No hay rol';
			message.channel.send(
				embed({
					title: servidor.verification.title ? servidor.verification.title : "No tiene titulo.",
					description: servidor.verification.text ? servidor.verification.text : "Verificate reaccionando al emoji de abajo.",
					fields: [{ title: 'Rol Verificado', text: rol.toString() }]
				})
			);
		}
	}
}