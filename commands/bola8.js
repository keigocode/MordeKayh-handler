module.exports = {
	value: ['8ball', 'ball8', 'bola8'],
	description: "Que te espera en el destino. :)",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon) => {
		let respuestas = ['Si', 'Puede ser', 'No', 'Claramente si', 'Claramente no', 'No sé', 'Que sé yo', 'Yo creo que no.'];
		let random = Math.floor(Math.random() * respuestas.length);
		let pregunta = message.content.slice(iniciacon.length + 1);
		if(!pregunta) return message.channel.send(embed({
			title: "8 Ball",
			description: "¿Que desea preguntar? * sonidos misticos *",
			footer
		}));
		message.channel.send(embed({
			title: "8 Ball",
			fields: [{
				title: "Pregunta",
				text: pregunta,
				inline: true
			},{
				title: "Respuesta",
				text: respuestas[random],
				inline: true
			}],
			footer
		}))
	}
}