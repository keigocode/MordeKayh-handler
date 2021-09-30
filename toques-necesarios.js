const {timems, getTime, getTimeLong, forDate, getRemainTime} = require('./../src/helpers/timems');
const {converterArray} = require('./../src/helpers/necesarios.js')

function messagePrivate(message, memb, mensaje){
  if(!message.guild) return;
  if(!message.guild.member(memb)) return;

  const miembro = message.guild.member(memb)
  miembro.send(mensaje).then(()  => {
  	return;
  }).catch(console.log)
}
conso