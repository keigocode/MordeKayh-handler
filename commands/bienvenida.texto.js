module.exports = {
	value: ['bienvenida.texto', 'welcome.text', 'textobienvenida'],
	description: "Ponle un lindo texto a la bienvenida, recuerda usar la variable {user} en la parte en la que mencionaras al usuarios.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if(!permisos){
			nopermsdelete(message);
		}else{
			let contenido = message.content.slice(iniciacon.length + 1);
			if(!contenido){
				message.channel.send(embed({
					title: "Mensaje de bienvenida",
					description: "Ingresa el mensaje de bienvenida para los usuarios.",
					footer
				}))
			}else {
				servidor.bienvenidatexto = contenido;
				init.setServidor(servidor);
				let realmessage = servidor.bienvenidatexto.replace('{user}', `<@!${message.author.id}>`);
				message.channel.send(embed({
					title: "Mensaje de bienvenida",
					description: `Se guardo el mensaje de bievenida: \n\n ${realmessage}`,
					footer
				}))
			}
		}
	}
}