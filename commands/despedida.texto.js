module.exports = {
	value: ['despedida.texto', 'textodespedida', 'despedidatexto', 'welcome.text'],
	description: "Agregale un texto de despedida, recuerda ponerle {user} para nombrar el usuario :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if(!permisos){
			nopermsdelete(message);
		}else{
			let contenido = message.content.slice(iniciacon.length + 1);
			if(!contenido){
				message.channel.send(embed({
					title: "Mensaje de despedida",
					description: "Ingresa el mensaje de despedida para los usuarios.",
					footer
				}))
			}else {
				servidor.despedidatexto = contenido;
				init.setServidor(servidor);
				let realmessage = servidor.despedidatexto.replace('{user}', `<@!${message.author.id}>`);
				message.channel.send(embed({
					title: "Mensaje de despedida",
					description: `Se guardo el mensaje de despedida: \n\n ${realmessage}`,
					footer
				}))
			}
		}
	}
}