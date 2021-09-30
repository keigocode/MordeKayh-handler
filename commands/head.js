module.exports = {
	value: ['head', 'cabeza', 'minecraft.head'],
	description: "Cabeza del miencraft :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let skin = message.content.slice(iniciacon.length + 1);
		if(!skin){
			message.channel.send(embed({
				title: "Cabezas",
				description: "Coloca el nombre del usuario al que quieres ver: "+servidor.prefix+"head MordeKayh",
				footer
			}))
		}else {
			const minecraft = require('mojang-minecraft-api');
			let dataskin = minecraft.getSkinDataByName(skin).then((data) => {
				console.log(data);
				message.channel.send(embed({
					title: `Cabeza ${skin}`,
					description: "Se ha encontrado la cabeza.",
					image: `https://mc-heads.net/avatar/${skin}`,
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