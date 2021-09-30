// DEPENDENCIAS
const {Client, MessageAttachment, MessageEmbed, MessageReaction, ReactionCollector, Message, WebhookClient} = require('discord.js');
const bot = new Client({ disableEveryone: true });
const path = require('path');
const {timems, getTime, getTimeLong, forDate, getRemainTime} = require('./timems');
const {initHelperDB} = require('./../database');
const init = new initHelperDB();
const {embed, timeout, converterArray, leveling} = require('./necesarios.js');
const canvacord = require('discord-canvas');
const commander = require('./necesarios').commander;
const commands = new commander('./commands');

function messagePrivate(message, memb, mensaje){
  if(!message.guild) return;
  if(!message.guild.member(memb)) return;

  const miembro = message.guild.member(memb)
  miembro.send(mensaje).then(()  => {
  	return;
  }).catch(console.log)
}

function comandos(bot){
	function nopermsdelete(message) {
		const nopermisos = embed({
			title: `Permisos insuficientes`,
			description: 'No tienes permisos para ejecutar este comando.',
			footer: {
				text: `Ejecutado por ${message.author.tag} - Se eliminara en 5 segundos`,
				icon: message.author.avatarURL()
			}
		});
		message.delete();
		return message.channel.send(nopermisos).then(msg => {
			setTimeout(() => {
				msg.delete();
			}, 5000);
		});
	}
	
	bot.on('message', async (message) => {
		let botinterrogative = message.author;
		if (!botinterrogative) return;
		if (botinterrogative.bot == true) return;
		if (!message.guild) return;
		// VARIABLES NECESARIAS

		const iniciacon = message.content.split(' ', 1)[0].toLowerCase();
		const servidor = await init.servidor(message.guild.id);
		const usuario = await leveling(message, init, servidor);
		servidor.sugs = converterArray(servidor.sugs?servidor.sugs:{});
		servidor.tickets = converterArray(servidor.tickets?servidor.tickets:{});
		let comando = forDate(new Date());
		const footer = {
			text: `Ejecutado por ${message.author.tag}`,
			icon: message.author.avatarURL()
		};
		const noesta = embed({
			title: 'Un simple error',
			description: 'Este usuario no esta en el servidor.',
			footer: footer
		});
		message.servidor = servidor;
		message.usuario = usuario;
		bot.emit('comandos', message);
		servidor.usuarios[message.author.id] = usuario;
		// COMANDOS NORMALES
		if (iniciacon.startsWith(servidor.prefix)) {
			if (message.guild.channels.cache.get(servidor.comandos)) {
				let pregunta = message.member.roles.cache.get(servidor.staff);
				const permisos = pregunta ? pregunta : message.member.hasPermission('MANAGE_MESSAGES');
				if (message.channel.parentID == servidor.categorytickets) {
					servidor;
				} else if (message.channel.id != servidor.comandos) {
					if (!permisos) {
						let canal = message.guild.channels.cache.get(servidor.comandos);
						return message.channel.send(embed({
									title: 'Aqui pasa algo',
									description: `➜ Ejecuta este comando en el canal <#${canal.id}> \n Este mensaje se eliminara en 5 segundos.`,
									footer
							})).then(msg => {
								message.delete();
								setTimeout(() => {
									msg.delete();
								}, 5000);
							});
					}
				}
			}
		}

		if (iniciacon.includes(bot.user.id)){
			const mentionBot = commands.getCommand(bot.user.id).value;
			mentionBot.func(bot, message, servidor, usuario, footer, embed);
		}

		const commandExec = commands.getCommand(iniciacon.split(servidor.prefix)[1]).value;
		if(!commandExec) return;
		commandExec.func(bot, message, servidor, usuario, footer, embed, iniciacon, init);

		if(iniciacon == `${servidor.prefix}skip`){
			let apikey = "AIzaSyBAwCmGKBKphzF3D2ptOIR0Ug7rfRfjEAM";
			let musiclist = converterArray(servidor.musiclist?servidor.musiclist:{});

			const fetch = require('node-fetch');
			let Canalvoz = message.member.voice.channel;

	    if (!Canalvoz || Canalvoz.type != 'voice') {
	   		message.channel.send(embed({
	   			title: "Error",
	   			description: "Necesitas unirte a un canal de musica primero.",
	   			footer
	   		}))
	    }else if (message.guild.voiceConnection) {
		    message.channel.send(embed({
		    	title: "Error",
		    	description: "Ya estoy en otro canal de voz.",
		    	footer
		    }));
	    } else {
	    	if(!musiclist[0]) return message.channel.send(embed({
	    		title: "No hay nada",
	    		description: "Parece que no hay ninguna canción sonando o playlist.",
	    		footer
	    	}));
	    	message.channel.send(embed({
	    		title: "Canción saltada",
	    		description: `La canción: ${musiclist[0].snippet.title}, fue salteada.`,
	    		footer
	    	}))
				musiclist.splice(0, 1);
	    	let json_data = musiclist[0];
	    	if(!json_data) return message.channel.send(embed({
	    		title: "Musica terminada",
	    		description: "Se acabo la lista de musica que habia en el servidor.",
	    		footer
	    	}));
				if(!json_data.id){
					if(json_data) musiclist.splice(0, 1);
					servidor.musiclist = musiclist;
	      	init.setServidor(servidor)


					return message.channel.send(embed({
				  	title: "Musica terminada",
				    description: "Se acabo la lista de musica que habia en este servidor.",
				    footer
				  }));
				}
	     	const ytdl = require('ytdl-core');
	      const url_video = ytdl(`https://www.youtube.com/watch?v=${json_data.id.videoId}`, { filter : 'audioonly' });
	      const data_video = json_data.snippet;
	      servidor.musiclist = musiclist;
	      init.setServidor(servidor)
	      Canalvoz.join().then((connection) => {
      		if(!servidor.musiclist){
      			message.channel.send(embed({
      				title: "¿Estas loco?",
      				description: "No se esta reproduciendo nada, o en cola.",
      				footer
      			}))
      		}else {
      			let dispatcher = connection.play(url_video);
      			message.channel.send(embed({
			        title: "Reproduciendo",
			        description: `${data_video.title} [<@!${message.author.id}>]`,
			        footer
			      }));
			      const repeatdatavideo = async (data) => {
			      	let data_server = await init.servidor(message.guild.id);
			      	data_server.musiclist = converterArray(data_server.musiclist?data_server.musiclist:{});
			      	data_server.musiclist.splice(0, 1);
			      	init.setServidor(data_server);
			      	if(!data_server.musiclist[0]){
			      		Canalvoz.leave()
			      		return message.channel.send(embed({
			      			title: "Musica terminada",
			      			description: "Se acabo la lista de musica que habia en este servidor.",
			      			footer
			      		}))
			      	};
			      	let video = ytdl(`https://www.youtube.com/watch?v=${data_server.musiclist[0].id.videoId}`);
			      	dispatcher = connection.play(video);
			      	dispatcher.on('finish', repeatdatavideo);
			      	message.channel.send(embed({
			      		title: "Reproduciendo",
			      		description: `${data_server.musiclist[0].snippet.title}`,
			      		footer
			      	}))
			      };
      			init.setServidor(servidor);
			      dispatcher.on('finish', repeatdatavideo);
      		}
	     })
	    }
		}
		if(iniciacon == `${servidor.prefix}play`){
			let data_search = message.content.slice(iniciacon.length + 1);
			let apikey = "AIzaSyBAwCmGKBKphzF3D2ptOIR0Ug7rfRfjEAM";
			let url_youtube = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${data_search}&maxResults=5&key=`+apikey;

			if(!data_search) return message.channel.send(embed({
				title: "Error",
				description: "Ingrese el nombre de la canción que quiere reproducir.",
				footer
			}));

			const fetch = require('node-fetch');
			const data_get = await fetch(url_youtube);
			let json_data = await data_get.json();
			let Canalvoz = message.member.voice.channel;


	    if (!Canalvoz || Canalvoz.type != 'voice') {
	   		message.channel.send(embed({
	   			title: "Error",
	   			description: "Necesitas unirte a un canal de musica primero.",
	   			footer
	   		}))
	    }else if (message.guild.voiceConnection) {
		    message.channel.send(embed({
		    	title: "Error",
		    	description: "Ya estoy en otro canal de voz.",
		    	footer
		    }));
	    } else {
	     	const ytdl = require('ytdl-core');
	      const url_video = ytdl(`https://www.youtube.com/watch?v=${json_data.items[0].id.videoId}`, { filter : 'audioonly' });
	      const data_video = json_data.items[0].snippet;
	      Canalvoz.join().then((connection) => {
      		if(!servidor.musiclist){
      			servidor.musiclist = [];
      			servidor.musiclist.push(json_data.items[0]);
      			let dispatcher = connection.play(url_video);

      			message.channel.send(embed({
			        title: "Reproduciendo",
			        description: `${data_video.title} [<@!${message.author.id}>]`,
			        footer
			      }));
			      const repeatdatavideo = async (data) => {
			      	let data_server = await init.servidor(message.guild.id);
			      	data_server.musiclist = converterArray(data_server.musiclist?data_server.musiclist:{});
			      	data_server.musiclist.splice(0, 1);
			      	init.setServidor(data_server);
			      	if(!data_server.musiclist[0]){
			      		Canalvoz.leave()
			      		return message.channel.send(embed({
			      			title: "Musica terminada",
			      			description: "Se acabo la lista de musica que habia en este servidor.",
			      			footer
			      		}))
			      	};
			      	let video = ytdl(`https://www.youtube.com/watch?v=${data_server.musiclist[0].id.videoId}`);
			      	dispatcher = connection.play(video);
			      	dispatcher.on('finish', repeatdatavideo);
			      	message.channel.send(embed({
			      		title: "Reproduciendo",
			      		description: `${data_server.musiclist[0].snippet.title}`,
			      		footer
			      	}))
			      };
      			init.setServidor(servidor);
			      dispatcher.on('finish', repeatdatavideo);
      		}else {
      			servidor.musiclist = converterArray(servidor.musiclist);
      			servidor.musiclist.push(json_data.items[0]);
      			message.channel.send(embed({
      				title: "Agregado a la cola",
      				description: `La canción: ${data_video.title}. Ha sido agregada a la cola.`,
      				footer
      			}))
      			init.setServidor(servidor);
      		}
	     })
	    }
		}
	});
}


module.exports = comandos;