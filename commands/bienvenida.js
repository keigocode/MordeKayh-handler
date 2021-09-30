module.exports = {
	value: ['bienvenida', 'welcome', 'saywelcome'],
	description: "Mira como queda la bienvenida con nuestro bot. :3",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if(!permisos){
			nopermsdelete(message);
		}else{
			let user = servidor.bienvenidatexto ? servidor.bienvenidatexto : `<@!${message.author.id}> bienvenido a ${message.guild.name}.`;
			let realmessage = user.replace('{user}', `<@!${message.author.id}>`);
			let rolbienvenida = message.guild.roles.cache.get(servidor.bienvenidarol) ? message.guild.roles.cache.get(servidor.bienvenidarol) : 'No hay de bienvenida.';
			message.channel.send(embed({
				title: "Bienvenido al servidor",
				description: realmessage,
				fields:[{title: "Rol de bienvenida", text: rolbienvenida.toString()}],
				footer
			}))
		}
	}
}