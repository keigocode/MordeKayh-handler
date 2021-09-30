const commander = require('./../src/helpers/necesarios').commander;
const commands = new commander('./commands');

module.exports = {
	value: ['help', 'ayuda', 'yametekudasai'],
	description: "Mira todos los comandos y obten ayuda :3",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let buscar = message.content.slice(iniciacon.length + 1);
		if(!buscar) return message.channel.send(embed({
			title: "Todos los comandos registrados",
			description: commands.allValueCommands().map(ch => "`"+servidor.prefix+ch+"`").join(', '),
			footer
		}));

		const buscando = commands.getCommand(buscar);
		if(!buscando) return message.channel.send(embed({
			title: "Comando no encontrado",
			description: "Este comando no ha sido encontrado :c.",
			footer
		}));


		let comando = buscando.value;
		message.channel.send(embed({
			title: `Comando: ${Array.isArray(comando.value) ? buscar.toLowerCase() : comando.value}`,
			description: `${comando.description} `,
			fields: [{title: "Comandos alternos", text: Array.isArray(comando.value) ? comando.value.map(ch => `**${ch}**`).join(', ') : "No tiene comandos alternos"}],
			footer
		}))
	}
}