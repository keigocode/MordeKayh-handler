module.exports = {
	value: ['encuesta', 'votacion', 'voten', 'elecciones'],
	description: "Decide que tus usuarios elijan con este sistema de encuesta. :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let separar = message.content.split('/', 9);
		let encuesta = separar[0].substring(iniciacon.length + 1);
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			if (!message.content.slice(iniciacon.length + 1))
				return message.channel.send(
					embed({
						title: 'Encuesta',
						description: `Para usar ${
							servidor.prefix
						}encuesta <text> <opciones/opciones2>`,
						footer
					})
				);
			let numeros = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
			let reacciones = [];
			separar.splice(0, 1);
			let modalidades = ``;
			for (let i = 0; i < separar.length; i++) {
				modalidades += `**${i + 1}**.${separar[i]}\n`;
				reacciones.push(numeros[i]);
				if (i == separar.length - 1) {
					return message.channel
						.send(
							embed({
								title: 'Encuesta',
								description: `${encuesta}\n\n ${modalidades}`,
								footer: `Encuesta hecha por ${message.author.tag}`
							})
						)
						.then(msg => {
							for (let i = 0; i < reacciones.length; i++) {
								msg.react(reacciones[i]);
							}
							message.delete();
						});
				}
			}
		}
	}
}