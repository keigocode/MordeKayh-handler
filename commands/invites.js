module.exports = {
	value: ['invites', 'invitaciones', 'traidos', 'fans'],
	description: "Mira a cuantas personas has invitado.",
	type: "fun",
	func: (bot, message, servidor, usuario, footer, embed, iniciacon, init) => {
		var userId = message.author.id;
    var userInvites = message.guild.fetchInvites().then(invites => invites.find(invite => invite.inviter.id === userId));
    var useAmount = userInvites.uses;
    if (useAmount === null) {
      message.channel.send(embed({
      	title: "Invitaciones",
      	description: "No tienes invitaciones.",
      	footer
      }));
    }else {
      message.channel.send(`${message.author.username} has ${useAmount} invites`);
    }
	}
}