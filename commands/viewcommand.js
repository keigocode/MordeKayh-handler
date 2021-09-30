const {converterArray} = require('./../src/helpers/necesarios.js')

module.exports = {
	value: ['viewcommands', 'comandos', 'comandos', 'lista.comandos'],
	description: "Mira la lista de comandos que hayan en el servidor.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('MANAGE_GUILD');
		if (!permisos) {
			message.channel.send(nopermisos);
		} else {
			const comandos = converterArray(init.getComandos(servidor)?init.getComandos(servidor):{});
			if (!comandos) {
				message.channel.send(
					embed({
						title: 'Comandos personalizados',
						description: 'No hay comandos personalizados.',
						footer
					})
				);
			} else {
				let mensaje = {
					title: 'Comandos',
					description: 'Aqui esta la lista de comandos personalizados: \n',
					footer
				};
				comandos.forEach((element, i, array) => {
					if(!element.id) return;
					mensaje.description += `\n **Comando: **${servidor.prefix}${
						element.comando
					} \n **ID: **${element.id} \n`;
				});
				message.channel.send(embed(mensaje));
			}
		}
	}
}