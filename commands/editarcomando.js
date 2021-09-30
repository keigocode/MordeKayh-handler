const {converterArray} = require('./../src/helpers/necesarios.js')

module.exports = {
	value: ['editarcomando', 'comando.editar', 'editcommand', 'command.edit'],
	description: "Editar los comandos de tu servidor.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		let permisos = message.member.hasPermission('MANAGE_GUILD');
		if (!permisos) {
			message.channel.send(nopermisos);
		} else {
			const opciones = message.content.split(' ', 3);
			const idsearch = opciones[1];
			if (!idsearch) {
				message.channel.send(
					embed({
						title: 'Editar comandos',
						description: `Uso correcto ${
							servidor.prefix
						}editarcomando <id del comando>`,
						footer
					})
				);
			} else {
				const comandos = converterArray(servidor.commandsper?servidor.commandsper:{});
				const busquedad = comandos.find(ch => ch.id == idsearch);
				const opcion = opciones[2];
				if (!busquedad){
					message.channel.send(
						embed({
							title: 'Comandos',
							description: 'Este comando no existe.',
							footer
						})
					);
				} else {
					if (!opcion)
						return message.channel.send(
							embed({
								title: 'Editar comandos',
								description: `Uso correcto ${
									servidor.prefix
								}editarcomando <id del comando> <opcion a cambiar> <detalles>`
							})
						);
					if (opcion == 'respuesta') {
						if (busquedad.tipo == 'embed') {
							message.channel.send(
								embed({
									title: 'Error',
									description:
										'Este mensaje es de tipo embed. \n titulo \n texto',
									footer
								})
							);
						} else {
							let res = message.content.slice(
								opciones[0].length + 3 + opciones[1].length + opciones[2].length
							);
							busquedad.respuesta = res
								? res
								: 'Este comando no tiene respuesta';
							init.setComando(busquedad, servidor);
							let mensaje = embed({
								title: 'Comando editado',
								description: `Se ha editado el comando de ID ${
									busquedad.id
								}. Aqui esta la información:`,
								fields: [
									{
										title: 'Comando',
										text: `${servidor.prefix}${busquedad.comando}`
									},
									{
										title: 'Respuesta',
										text: busquedad.respuesta
											? busquedad.respuesta
											: 'No tiene respuesta'
									},
									{ title: 'Creado por', text: `<@!${message.author.id}>` },
									{ title: 'ID del comando', text: busquedad.id },
									{
										title: 'Tipo de respuesta',
										text: busquedad.tipo ? busquedad.tipo : 'Tipo texto'
									},
									{
										title: 'Cambio hecho',
										text: 'Se ha cambiado la respuesta de este comando.'
								},
								{
									title: 'Comando para',
									text: busquedad.permisos ? busquedad.permisos : 'Para todos'
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
				if (opcion == 'comando') {
					let nuevaentrada = message.content.slice(
						opciones[0].length + 3 + opciones[1].length + opciones[2].length
					);
					if (!nuevaentrada) {
						message.channel.send(
							embed({
								title: 'Editar comando',
								description: `Ingrese el nuevo nombre del comando.`,
								footer
							})
						);
					} else {
						if (servidor.commandsper.find(ch => ch.comando == nuevaentrada)) {
							return message.channel.send(
								embed({
									title: 'Comandos',
									description: 'Este comando ya existe.',
									footer
								})
							);
						} else {
							busquedad.comando = nuevaentrada;
							init.setComando(busquedad, servidor);
							let mensaje = embed({
								title: 'Comando editado',
								description: `Se ha editado el comando de ID ${
									busquedad.id
								}. Aqui esta la información:`,
									fields: [
										{
											title: 'Comando',
											text: `${servidor.prefix}${busquedad.comando}`
										},
										{
											title: 'Respuesta',
											text: busquedad.respuesta
												? busquedad.respuesta
												: 'No tiene respuesta'
										},
										{ title: 'Creado por', text: `<@!${message.author.id}>` },
										{ title: 'ID del comando', text: busquedad.id },
										{
											title: 'Tipo de respuesta',
											text: busquedad.tipo ? busquedad.tipo : 'Tipo texto'
										},
										{
											title: 'Cambio hecho',
											text: 'Se ha cambiado el nombre del comando.'
										},
										{
											title: 'Comando para',
											text: busquedad.permisos
												? busquedad.permisos
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
					if (opcion == 'permisos') {
						let nuevaentrada = message.content.slice(
							opciones[0].length + 3 + opciones[1].length + opciones[2].length
						);
						if (!nuevaentrada) {
							message.channel.send(
								embed({
									title: 'Editar comandos',
									description: `Uso correcto ${
										servidor.prefix
									}editarcomando <id comando> <opcion> <nueva opcion>`,
									footer
								})
							);
						} else {
							if (nuevaentrada == 'si') {
								busquedad.permisos = 'Para staff';
								init.setComando(busquedad, servidor);
								let mensaje = embed({
									title: 'Comando editado',
									description: `Se ha editado el comando de ID ${
										busquedad.id
									}. Aqui esta la información:`,
									fields: [
										{
											title: 'Comando',
											text: `${servidor.prefix}${busquedad.comando}`
										},
										{
											title: 'Respuesta',
											text: busquedad.respuesta
												? busquedad.respuesta
												: 'No tiene respuesta'
										},
										{ title: 'Creado por', text: `<@!${message.author.id}>` },
										{ title: 'ID del comando', text: busquedad.id },
										{
											title: 'Tipo de respuesta',
											text: busquedad.tipo ? busquedad.tipo : 'Tipo texto'
										},
										{
											title: 'Cambio hecho',
											text:
												'Se ha cambiado el permiso para ejecutar este comando.'
										},
										{
											title: 'Comando para',
											text: busquedad.permisos
												? busquedad.permisos
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
							} else if (nuevaentrada == 'no') {
								busquedad.permisos = null;
								init.setComando(busquedad, servidor);
								let mensaje = embed({
									title: 'Comando editado',
									description: `Se ha editado el comando de ID ${
										busquedad.id
									}. Aqui esta la información:`,
									fields: [
										{
											title: 'Comando',
											text: `${servidor.prefix}${busquedad.comando}`
										},
										{
											title: 'Respuesta',
											text: busquedad.respuesta
												? busquedad.respuesta
												: 'No tiene respuesta'
										},
										{ title: 'Creado por', text: `<@!${message.author.id}>` },
										{ title: 'ID del comando', text: busquedad.id },
										{
											title: 'Tipo de respuesta',
											text: busquedad.tipo ? busquedad.tipo : 'Tipo texto'
										},
										{
											title: 'Cambio hecho',
											text:
												'Se ha cambiado el permiso para ejecutar este comando.'
										},
										{
											title: 'Comando para',
											text: busquedad.permisos
												? busquedad.permisos
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
							} else {
								message.channel.send(
									embed({
										title: 'Comandos personalizados',
										description: 'Coloca `si` o `no` para los permisos.',
										footer
									})
								);
							}
						}
					}
					if (opcion == 'tipo') {
						let nuevaentrada = message.content.slice(
							opciones[0].length + 3 + opciones[1].length + opciones[2].length
						);
						if (!nuevaentrada) {
							message.channel.send(
								embed({
									title: 'Editar comandos',
									description: `Uso correcto ${servidor.prefix}editarcomand`,
									footer
								})
							);
						} else {
							if (nuevaentrada == 'texto') {
								busquedad.tipo = null;
								busquedad.respuesta =
									'Este comando ha sido cambiado y ya no tiene respuesta';
								init.setComando(busquedad, servidor);
								let mensaje = embed({
									title: 'Comando editado',
									description: `Se ha editado el comando de ID ${
										busquedad.id
									}. Aqui esta la información:`,
									fields: [
										{
											title: 'Comando',
											text: `${servidor.prefix}${busquedad.comando}`
										},
										{
											title: 'Respuesta',
											text: busquedad.respuesta
												? busquedad.respuesta
												: 'No tiene respuesta'
										},
										{ title: 'Creado por', text: `<@!${message.author.id}>` },
										{ title: 'ID del comando', text: busquedad.id },
										{
											title: 'Tipo de respuesta',
											text: busquedad.tipo ? busquedad.tipo : 'Tipo texto'
										},
										{
											title: 'Cambio hecho',
											text: 'Se ha cambiado el tipo de respuesta.'
										},
										{
											title: 'Comando para',
											text: busquedad.permisos
												? busquedad.permisos
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
							} else if (nuevaentrada == 'embed') {
								busquedad.tipo = 'embed';
								busquedad.respuesta = 'Este mensaje es de tipo embed.';
								busquedad.embed = {
									description:
										'Este comando ha sido cambiado y ya no tiene respuesta'
								};
								init.setComando(busquedad, servidor);
								let mensaje = embed({
									title: 'Comando editado',
									description: `Se ha editado el comando de ID ${
										busquedad.id
									}. Aqui esta la información:`,
									fields: [
										{
											title: 'Comando',
											text: `${servidor.prefix}${busquedad.comando}`
										},
										{
											title: 'Respuesta',
											text: busquedad.respuesta
												? busquedad.respuesta
												: 'No tiene respuesta'
										},
										{ title: 'Creado por', text: `<@!${message.author.id}>` },
										{ title: 'ID del comando', text: busquedad.id },
										{
											title: 'Tipo de respuesta',
											text: busquedad.tipo ? busquedad.tipo : 'Tipo texto'
										},
										{
											title: 'Cambio hecho',
											text: 'Se ha cambiado el tipo de respuesta.'
										},
										{
											title: 'Comando para',
											text: busquedad.permisos
												? busquedad.permisos
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
							} else {
								message.channel.send(
									embed({
										title: 'Comandos',
										description:
											'Esta opcion no existe. \n pon `texto` o `embed`',
										footer
									})
								);
							}
						}
					}
					if (opcion == 'titulo') {
						let nuevaentrada = message.content.slice(
							opciones[0].length + 3 + opciones[1].length + opciones[2].length
						);
						let tipo = busquedad.tipo;
						if (!tipo) {
							message.channel.send(
								embed({
									title: 'Comandos',
									description: 'Este comando no tiene respuesta embed.',
									footer
								})
							);
						} else {
							if (!nuevaentrada) {
								message.channel.send(
									embed({
										title: `Titulo del comando ${servidor.prefix}${
											busquedad.comando
										}`,
										description: 'Pon el titulo que quieres en el mensaje.',
										footer
									})
								);
							} else {
								const antes = busquedad.embed
									? busquedad.embed
									: { description: 'No hay entrada de descripcion' };
								busquedad.embed = {
									title: nuevaentrada,
									description: antes.description
										? antes.description
										: 'No hay entrada de descripcion'
								};
								init.setComando(busquedad, servidor);
								let mensaje = embed({
									title: 'Comando editado',
									description: `Se ha editado el comando de ID ${
										busquedad.id
									}. Aqui esta la información:`,
									fields: [
										{
											title: 'Comando',
											text: `${servidor.prefix}${busquedad.comando}`
										},
										{
											title: 'Respuesta',
											text: busquedad.respuesta
												? busquedad.respuesta
												: 'No tiene respuesta'
										},
										{ title: 'Creado por', text: `<@!${message.author.id}>` },
										{ title: 'ID del comando', text: busquedad.id },
										{
											title: 'Tipo de respuesta',
											text: busquedad.tipo ? busquedad.tipo : 'Tipo texto'
										},
										{
											title: 'Cambio hecho',
											text: 'Se ha cambiado el titulo del mensaje embed.'
										},
										{
											title: 'Comando para',
											text: busquedad.permisos
												? busquedad.permisos
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
					if (opcion == 'texto') {
						let nuevaentrada = message.content.slice(
							opciones[0].length + 3 + opciones[1].length + opciones[2].length
						);
						let tipo = busquedad.tipo;
						if (!tipo) {
							message.channel.send(
								embed({
									title: 'Comandos',
									description: 'Este comando no tiene respuesta embed.',
									footer
								})
							);
						} else {
							if (!nuevaentrada) {
								message.channel.send(
									embed({
										title: `Texto del comando ${servidor.prefix}${
											busquedad.comando
										}`,
										description: 'Pon el texto que quieres en el mensaje.',
										footer
									})
								);
							} else {
								const antes = busquedad.embed
									? busquedad.embed
									: { description: 'No hay entrada de descripcion' };
								busquedad.embed = {
									title: antes.title ? antes.title : 'No tiene titulo',
									description: nuevaentrada
								};
								init.setComando(busquedad, servidor);
								let mensaje = embed({
									title: 'Comando editado',
									description: `Se ha editado el comando de ID ${
										busquedad.id
									}. Aqui esta la información:`,
									fields: [
										{
											title: 'Comando',
											text: `${servidor.prefix}${busquedad.comando}`
										},
										{
											title: 'Respuesta',
											text: busquedad.respuesta
												? busquedad.respuesta
												: 'No tiene respuesta'
										},
										{ title: 'Creado por', text: `<@!${message.author.id}>` },
										{ title: 'ID del comando', text: busquedad.id },
										{
											title: 'Tipo de respuesta',
											text: busquedad.tipo ? busquedad.tipo : 'Tipo texto'
										},
										{
											title: 'Cambio hecho',
											text: 'Se ha cambiado el texto del mensaje embed.'
										},
										{
											title: 'Comando para',
											text: busquedad.permisos ? busquedad.permisos : 'Para todos'
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
		}
	}
}