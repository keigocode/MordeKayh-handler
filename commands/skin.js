module.exports = {
	value: ['skin', 'minecraft.skin', 'skin.mc', 'mcskin'],
	description: "Mira la skin de algun jugador.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let skin = message.content.slice(iniciacon.length + 1);
		if(!skin){
			message.channel.send(embed({
				title: "Skins",
				description: "Coloca el nombre del usuario al que quieres ver: "+servidor.prefix+"skin MordeKayh",
				footer
			}))
		}else {
			const minecraft = require('mojang-minecraft-api');
			let dataskin = minecraft.getUUID(skin).then((data) => {
				message.channel.send(embed({
					title: `Skin ${skin}`,
					description: "Se ha encontrado la skin.",
					image: `https://mc-heads.net/body/${skin}/right`,
					footer: {icon: message.author.avatarURL(), text: `${message.author.username}`}
				}))
			}).catch(() => {
				message.channel.send(embed({
					title: "Skins",
					description: "Esta skin no fue encontrada.",
					footer
				}))
			})
		}
	}
}