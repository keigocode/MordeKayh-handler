module.exports = {
	value: ['crearcomando', 'createcommand', 'comando.crear'],
	description: "Crear comando personalizado.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('MANAGE_GUILD');
		if (!permisos) {
			message.channel.send(nopermisos);
		} else {
			const comandonombre = message.content.slice(iniciacon.length + 1);
			const comandos = init.getComandos(servidor)?init.getComandos(servidor):[];
			if (!comandonombre) {
				message.channel.send(
					embed({
						title: 'Comandos personalizados',
						description: `Uso correcto ${
							servidor.prefix
						}crearcomando <nombre comando>`,
						footer
					})
				);
			} else {
				let si = comandos.find(ch => ch.comando == comandonombre);
				if (si) {
					message.channel.send(
						embed({
							title: 'Comandos personalizados',
							description: 'Este comando ya existe.',
							footer
						})
					);
				} else {
					let comandonuevo = {
						id: message.id,
						creador: message.author.id,
						comando: comandonombre,
						respuesta: null,
						tipo: null,
						permisos: null
					};
					servidor.commandsper = comandos;
					servidor.commandsper.push(comandonuevo);
					console.log(servidor)
					init.setServidor(servidor);
					let mensaje = embed({
						title: 'Comandos',
						description: `Se ha creado un nuevo comando personalizado.`,
						fields: [
							{
								title: 'Comando',
								text: `${servidor.prefix}${comandonuevo.comando}`
							},
							{
								title: 'Respuesta',
								text: comandonuevo.respuesta
									? comandonuevo.respuesta
									: 'No tiene respuesta'
							},
							{ title: 'Creado por', text: `<@!${message.author.id}>` },
							{ title: 'ID del comando', text: comandonuevo.id },
							{
								title: 'Tipo de respuesta',
								text: comandonuevo.tipo ? comandonuevo.tipo : 'Tipo texto'
							},
							{
								title: 'Comando para',
								text: comandonuevo.permisos
									? comandonuevo.permisos
									: 'Para todos'
							}
						],
						footer
					});
					message.channel.send(mensaje);
					const registros = message.guild.channels.cache.get(
						servidor.registros
					);
					if (registros) {
						registros.send(mensaje);
					}
				}
			}
		}
	}
}