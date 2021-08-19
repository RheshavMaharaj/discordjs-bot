const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tic')
		.setDescription('Replies with tac'),
	async execute(interaction) {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Click Here, Guardian')
					.setStyle('SUCCESS'),
			);

		await interaction.reply({ content: 'Pong!', components: [row] });

		const filter = i => i.customId === 'primary';

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		const post = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('secondary')
					.setLabel('Click Here For A Secret')
					.setStyle('DANGER'),
			);

		collector.on('collect', async i => {
			if (i.customId === 'primary') {
				await i.update({ content: 'Very Inquisitive I see', components: [post] });
			}
		});

		const newfilter = inew => inew.customId === 'secondary';

		const newcollector = interaction.channel.createMessageComponentCollector({ newfilter, time: 15000 });

		newcollector.on('collect', async inew => {
			if (inew.customId === 'secondary') {
				await inew.update({ content: "I'd tell you the secret, but then I'd have to kill you.", components: [] });
			}
		});

		// collector.on('end', collected => console.log(`Collected ${collected.size} items`));

	},
};


