function converterArray(object){
  let data = Object.getOwnPropertyNames(object);
  let all_info = [];
  data.forEach((element, i, array) => {
    all_info.push(Object.getOwnPropertyDescriptor(object, element).value)
  })

  return all_info;
}

module.exports = {
	value: ['top', 'leaderboard', 'ranks', 'uwu'],
	description: "Mira el top mensajes y niveles en tu servidor.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let top = converterArray(servidor.usuarios);
		let ssniveles = top.sort((a, b) => a.nivel - b.nivel);
		let msg = {
			title: `Top | ${message.guild.name}`,
			description:
				'Aqui se encuentra el top nivel y mensajes de este servidor.',
			fields: [],
			footer
		};
		let topmsg = '';
		let topniveles = '';
		for (let i = 0; i < 10; i++) {
			if (ssniveles[i]) {
				const miembro = message.guild.member(ssniveles[ssniveles.length - 1 - i].usuario);
				topniveles += `**${i + 1}. <@!${ssniveles[ssniveles.length - i - 1].usuario}> - ${ssniveles[ssniveles.length - i - 1].nivel}** \n`
			}
		}
		let ssmsg = top.sort((a, b) => a.mensajes - b.mensajes);
		for (let i = 0; i < 10; i++) {
			if (ssmsg[i]) {
				const miembro = message.guild.member(ssmsg[ssmsg.length - 1 - i].usuario);
				topmsg += `**${i + 1}. <@!${ssmsg[ssmsg.length - 1 - i].usuario}> - ${ssmsg[ssmsg.length - 1 - i].mensajes}** \n`
			}
		}
		msg.fields.push({
			title: 'Top mensajes',
			text: topmsg,
			inline: true
		});
		msg.fields.push({
			title: 'Top nivel',
			text: topniveles,
			inline: true
		});
		message.channel.send(embed(msg));
	}
}