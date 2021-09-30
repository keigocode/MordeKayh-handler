module.exports = {
	value: ['verificar', 'verify', 'verification'],
	description: "Mira la informacion que tiene la verificación.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			message.channel.send(embed({
				title: "Sistema de verificación",
				description: "Puedes crear un sistema de verificación muy complejo para tus usuarios. \n\n comando para iniciar: "+servidor.prefix+"verificar.info {}",
				footer
			}))
		}
	}
}