module.exports = {
	value: ['despedida', 'bye', 'goodbye', 'adios'],
	description: "Que te espera en el destino. :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('ADMINISTRATOR');
		if(!permisos){
			nopermsdelete(message);
		}else{
			let user = servidor.despedidatexto ? servidor.despedidatexto : `<@!${message.author.id}> acaba de abandonar el servidor.`;
			let realmessage = user.replace('{user}', `<@!${message.author.id}>`);
			message.channel.send(embed({
				title: "Despedida del servidor",
				description: realmessage,
				footer
			}))
		}
	}
}