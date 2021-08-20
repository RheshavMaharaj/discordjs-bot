const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('A test of discord menus and slash commands'),
	async execute(interaction) {
    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Reply',
							description: 'I will reply to you with this message',
							value: 'first_option',
						},
						{
							label: 'Edit',
							description: 'I will edit the message if you select this',
							value: 'second_option',
						},
					]),
			);

		await interaction.reply({ content: 'I see the cabal are improving their tactics with new menus now', components: [row] });

    const filter = i => i.user.id === interaction.user.id;
		const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', time: 15000 })

		collector.on('collect', async i => {
			if(i.values[0] === 'first_option'){
				await i.reply({ content: "I have replied to you, now go and complete those strikes, Guardian!", components: [ ] });
			}
			else if(i.values[0] === 'second_option'){
				await i.update({ content: "I just edited this message, Guardian!", components: [ row ] });
			}
			
		});

		collector.on('end', collected => {
			console.log(`Collected ${collected.size} items`);
		});
	}
};
