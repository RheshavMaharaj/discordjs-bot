const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pages')
		.setDescription('A test of pages using buttons and slash commands'),
	async execute(interaction) {
		const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId('secondary')
          .setLabel('Go Back')
          .setStyle('SUCCESS'),
      )
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Go Forward')
					.setStyle('SUCCESS'),
			);
		
		var pageOne = '```'
		for(var i=1; i<10; i++){
			pageOne += "Random Song " + i + "\n";
		}
		pageOne += '```';


		var pageTwo = '```'
    for(var i=1; i<10; i++){
			pageTwo += "Random Song From Page 2-" + i + "\n";
		}
		pageTwo += '```';

		await interaction.reply({ content: pageOne, components: [ row ] });

		const filter = i => (i.customId === 'primary' || i.customId === 'secondary');

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
			if (i.customId === 'primary') {
				await i.update({ content: pageTwo, components: [ row ] });
			}
      else if(i.customId === 'secondary') {
        await i.update({ content: pageOne, components: [ row ] });
      }
		});
	},
};
