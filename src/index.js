require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client({
  intents: Object.values(Discord.IntentsBitField.Flags).filter(flag => !isNaN(flag))
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', async (member) => {
  console.log(`A member joined: ${member.user.tag}`);
  const channel = await client.channels.fetch(process.env.REGISTER_CHANNEL_ID);
  if (!channel || !channel.isTextBased()) return console.error('Invalid channel ID');
  await channel.send({
    content: member.toString(),
    embeds: [
      new Discord.EmbedBuilder()
        .setColor('#ff56c4')
        .setTitle('Welcome to Dismal <:dismal:1112883569321324564>')
        .addFields({
          name: 'Register to play!',
          value: `To play ranked, register using the \`/register\` command followed by your in-game Minecraft username.\nExample: \`/register PiggyPlex\``,
        })
        .addFields({
          name: 'Need help?',
          value: `Visit <#1222497455065530419> and click the Registration button to create a ticket and talk to a member of staff for help.`,
        })
        .setImage('https://i.imgur.com/UN7fkLu.gif'),
    ],
  }).catch((error) => {
    console.error('Failed to send welcome message:', error);
  });
});

// client.on('messageCreate', async (message) => {
//   if (message.content === 'emit-guildMemberAdd') {
//     client.emit('guildMemberAdd', message.member);
//   }
// });

client.login(process.env.TOKEN);

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
