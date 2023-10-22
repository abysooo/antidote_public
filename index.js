require('dotenv').config();

const {Client, Events, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, SlashCommandBuilder} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions
  ]
})

client.on(Events.ClientReady,(x) => {
  console.log(`${x.user.tag} is ready!`)

  const ping = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('This is a ping command!');
  
  const cats = new SlashCommandBuilder()
  .setName('tilt')
  .setDescription('This is an anti-tilt command!')

  client.application.commands.create(ping);
  client.application.commands.create(cats)
})

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'ping') {
    interaction.reply('pong!');
  }

  if (interaction.commandName == 'tilt') {
    
  }

});

client.login(process.env.TOKEN)