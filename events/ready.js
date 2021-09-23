module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        console.log(`${client.user.tag} is ready to serve \u001b[36m${client.users.cache.size}\u001b[0m users in \u001b[36m${client.guilds.cache.size}\u001b[0m servers!`);
		// client.LoadSlashCommands();
		client.LoadCommands();
		const arrayOfStatus = [
			`over ${client.guilds.cache.size} servers`,
			`over ${client.users.cache.size} users`,
			`$help`,
			`By Atomツ#6969`,
			`Visit the website - http://protonmoderation.com`,
			`Join the support server - https://discord.gg/CfVMFxfvmb`,
		];
		let index = 0
		setInterval(() => {
			if(index === arrayOfStatus.length) index = 0;
			const status = arrayOfStatus[index];
			client.user.setActivity(status, {type: "WATCHING"});
			index++;
		}, 20000);
	},
};