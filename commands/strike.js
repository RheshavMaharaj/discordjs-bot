const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('strike')
		.setDescription('Replies with Whether we wanted it or not...'),
	async execute(interaction) {
		await interaction.reply(
      "Whether we wanted it or not, we've stepped into a war with the Cabal on Mars. "+
      "So let's get to taking out their command, one by one. Valus Ta'aurc. "+
      "From what I can gather he commands the Siege Dancers from an "+
      "Imperial Land Tank outside of Rubicon."
    );
	},
};
