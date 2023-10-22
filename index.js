require('dotenv').config();

const {Client, Events, GatewayIntentBits, EmbedBuilder, AttachmentBuilder, PermissionsBitField, Permissions, SlashCommandBuilder, Embed} = require('discord.js');
const ms = require('ms');
//const OpenAIApi = require('openai');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions
  ]
})


// images and gifs and their respective descriptions
var files = []
var files_embed = []

var response_msg = [
  "Maybe it\'\s time to take a nap",
  "Take a shower stinky!",
  "Go for a walk",
  "Drink some water",
  "For you -3-",
  "Go work out",
  "Grab some snackies",
  "Get some fresh air",
  "Don't consume yourself with rage",
  "Listen to some music",
  "Take a chill pill",
  "Don't get mad at your teammates"
]

for (let imgs = 0; imgs < 9; imgs++) {
  files.push(new AttachmentBuilder('./cat_pics/image' + imgs + '.jpeg')) 
  files_embed.push(new EmbedBuilder().setTitle(response_msg[imgs]).setImage('attachment://image' + imgs + '.jpeg')) 
}

for (let gifs = 0; gifs < 3; gifs++) {
  files.push(new AttachmentBuilder('./cat_pics/gif' + gifs + '.gif'))
  files_embed.push(new EmbedBuilder().setTitle(response_msg[gifs + 9]).setImage('attachment://gif' + gifs + '.gif'))
}
/*
const openai = new OpenAIApi({
  apiKey: process.env.API_KEY
}) */

client.on(Events.ClientReady,(x) => {
  console.log(`${x.user.tag} is ready!`)

  const ping = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('This is a ping command!');
  
  const cats = new SlashCommandBuilder()
  .setName('tilted')
  .setDescription('Anti-tilt with some cute cat pics and advice!')

  const origin = new SlashCommandBuilder()
  .setName('origin')
  .setDescription('Find out the origins of this bot!')

  const timer = new SlashCommandBuilder()
  .setName('timer')
  .setDescription('Set reminders with a timer')
  .addIntegerOption((option) => option
    .setName('hours')
    .setDescription('How many hours do you need?')
    .setRequired(true)
  )
  .addIntegerOption((option) => option
    .setName('minutes')
    .setDescription('How many minutes do you need?')
    .setRequired(true)
  )
  .addStringOption((option) => option 
    .setName('event')
    .setDescription('What\'s the occasion?')
    .setRequired(false)
  )

/*
  const chatbot = new SlashCommandBuilder()
  .setName('chat')
  .setDescription('Have a conversation with an AI!')
*/
  client.application.commands.create(ping);
  client.application.commands.create(cats);
  client.application.commands.create(origin);
  client.application.commands.create(timer);
  //client.application.commands.create(chatbot);
})

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  console.log(interaction.command)
  if (interaction.commandName === 'ping') {
    interaction.reply('pong!');
  } else if (interaction.commandName === 'origin') {
    interaction.reply("This bot was made in Technica 2023 by a girl who loves cats /ᐠ｡ꞈ｡ᐟ\\")
  } else if (interaction.commandName === 'tilted') {
    var random = Math.floor(Math.random() * 12);
    interaction.reply({ embeds: [files_embed[random]], files: [files[random]]})
  } else if (interaction.commandName === 'timer') {
      var hours = interaction.options.get('hours').value
      var minutes = interaction.options.get('minutes').value 
      var event = interaction.options.get('event')
      var total_time = hours * 3600000 + minutes * 60000

      if (event == undefined) {
        event = "Timer\'s up"
      } else {
        event = event.value
      }
      if (hours === 0 && minutes === 0) {
        interaction.reply("You can't set a timer with no time!")
      } else {
        interaction.reply('Timer set for: ' + hours + ' hr(s) ' + minutes + ' min(s) ')
        setTimeout(notify, total_time, interaction, event)
      }
      
      
  } 
    /* else if (interaction.commandName === 'chat') { 
    const response = await openai.chat.completions
      .create({
        model: 'gpt-3.5-turbo',
        messages: [ 
          {
            role: 'system',
            content: 'ChatGPT is a friendly chatbot',
          },
          {
            role: 'user',
            content: interaction.content,
          }
        ]
    })
   interaction.reply(response.choices[0].interaction.content)
  } */
});


function notify(interaction, message) {
  interaction.followUp(message + ', now!');
} 

client.login(process.env.TOKEN)
