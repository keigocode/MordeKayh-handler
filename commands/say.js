module.exports = {
	value: ['say', 'decir', 'decilo', 'mordekayh'],
	description: "Di a través del bot lo que quieras :flushed:",
	type: "fun",
	func: async (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let pregunta = message.member.roles.cache.get(servidor.staff);
		const permisos = pregunta
			? pregunta
			: message.member.hasPermission('MANAGE_GUILD');
		if (!permisos) {
			nopermsdelete(message);
		} else {
			let texto = message.content.slice(iniciacon.length + 1);
			if (!texto)
				return message.channel.send(embed({
					title: 'Hablar',
					description: 'Ponga el texto que quiere hablar atravez del bot',
					fields: [{ title: 'De', text: `<@!${message.author.id}>` }],
					footer: 'Este mensaje sera eliminado en 5segundos'
				})).then(msg => {
					setTimeout(() => {
						msg.delete();
					}, 5500);
				});
			let all = await message.channel.fetchWebhooks();
			let typeweb = all.first();
			if(!typeweb){
				message.channel.send(texto);
			}else {
				await typeweb.send({
					content: texto,
					username: message.author.username,
					avatarURL: message.author.avatarURL()
				}).catch(() => {
					message.channel.send(texto);
				})
			}
			message.delete();
		}
	}
}