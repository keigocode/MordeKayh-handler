module.exports = {
	value: ['bienvenida.rol', 'bienvenidarol', 'rolbienvenida', 'welcome.role'],
	description: "Ponle un rol a tus usuarios cuando entren al servidor :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if(!permisos){
			nopermsdelete(message);
		}else{
			let contenido = message.mentions.roles.first();
			if(message.content.slice(`${servidor.prefix}bienvenida.rol`.length + 1) == "false"){
				servidor.bienvenidarol = null;
				init.setServidor(servidor);
				return message.channel.send(embed({
					title: "Rol de bienvenida",
					description: "El rol ha sido reseteado.",
					footer
				}))
			}
			if(!contenido){
				message.channel.send(embed({
					title: "Rol de bienvenida",
					description: "Ingresa el rol de bienvenida para los usuarios.",
					footer
				}))
			}else {
				servidor.bienvenidarol = contenido.id;
				init.setServidor(servidor);
				message.channel.send(embed({
					title: "Rol de bienvenida",
					description: `Se guardo el rol de bievenida: \n\n <@&${contenido.id}>`,
					footer
				}))
			}
		}
	}
}