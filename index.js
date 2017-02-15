const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'MjY5MTIzNTcwNTQwNjA5NTM2.C3vglQ.0hA_muRpQQIxcFOq4_iroF11Z8g'
const prefix ="!";

//var fs = require('fs');
//fs.readFile('profiles.json', 'utf-8', (err, data) => {
//    console.log(data)
//    console.log(data.replace(/\"|{|}|,/g, "" ));
  //});

//Genvägsvariabler
var error_dm = '```Detta kommando funkar inte i DM, skriv det i #general på Ålskål-servern.```'
var bot_version = '1.0.0'
var profanity_msg = 'Fy skäms på dig! >:('
var link_msg = 'Länkar är ej tillåtna för subs eftersom att folk (Limousinen med flera) har spammat olämpliga saker i chatten.'

console.log('Bot started. Version: ' + bot_version + '\nCopyright © Simon Hedström \n\nAvailable commands: \n!help \n!social \n!anka \n!sub \n!info \n!bordejag')

var words = [
   'flöjt',
   'begravning',
   'fest',
   'romans',
   'student',
   'polis',
   'gitarr',
   'kock',
   'teater',
   'piano',
   'disco',
   'rave',
   'potatis',
   'stol',
   'gamerz',
   'dansen'
];

var bordejag = [
   'Ja. ',
   'Nej. '
];

bot.on('ready', () => {
   bot.user.setGame('Skriv !help för hjälp.');
});

//Welcome member.
bot.on('guildMemberAdd', (member) => {
   var guild = member.guild;
   guild.defaultChannel.sendEmbed(new Discord.RichEmbed().addField('Välkommen ' + member.user.toString() + '!', 'Skriv !sub för att få subscriber permissions. \nSkriv !rules för att se våra regler.').setColor(0xCC0000));
   });
//Say goodbye to member.
bot.on('guildMemberRemove', (member) => {
   var guild = member.guild;
   guild.defaultChannel.sendEmbed(new Discord.RichEmbed().addField('Hejdå ' + member.user.toString() + '!', 'Hoppas du trivdes.').setColor(0xCC0000));
   });
//Profanity filter.
bot.on('message', (message) => {
   if (message.content.toLowerCase().includes("neger"))
   {
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote n-ger.')
   }else if (message.content.toLowerCase().includes("hora")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote h#ra.')
   }else if (message.content.toLowerCase().includes("kuk")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote k#k.')
   }else if (message.content.toLowerCase().includes("fitt")){
     message.delete();
     message.channel.sendMessage(message.author.toString() +' wrote f#tt.')
     message.author.sendMessage(profanity_msg);
   }else if (message.content.toLowerCase().includes("slyn")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote sl#n.')
   }else if (message.content.toLowerCase().includes("slamp")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote sl#mp.')
   }else if (message.content.toLowerCase().includes("bög")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote b#g.')
   }else if (message.content.toLowerCase().includes("lesb")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote l#sb.')
   }else if (message.content.toLowerCase().includes("svarting")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote sv#rting.')
   }else if (message.content.toLowerCase().includes("blatte")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote bl#tte.')
   }else if (message.content.toLowerCase().includes("mongolid")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote m#ng#lid.')
   }else if (message.content.toLowerCase().includes("nigger")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote n#gger.')
   }else if (message.content.toLowerCase().includes("kicki danielsson")){
     message.delete();
     message.channel.sendMessage("DU GER MIG BRA VIBRATIONER!")
     message.channel.sendMessage(message.author.toString() +' wrote KICKI DANIELSSON <333.')
   }else if (message.content.toLowerCase().includes("fag")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote f#g.')
   }else if (message.content.toLowerCase().includes("knull")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote kn#ll.')
   }else if (message.content.toLowerCase().includes("cock")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote c#ck.')
   }
   else if (message.content.toLowerCase().includes("anus")){
     message.delete();
     message.author.sendMessage(profanity_msg);
     message.channel.sendMessage(message.author.toString() +' wrote an#s.')
   }

bot.on('message', (message) => {

});
//Commmandos
if(!message.content.startsWith(prefix)) return;
if (message.author.bot) return;

var split = message.content.substring(prefix.length).split(' ');

switch(split[0].toLowerCase()) {
      case 'help':
        message.channel.sendMessage('```!help - visar denna meny. \n!rules - visar reglerna vi har på server.\n!info - visar information om servern. \n!social - länkar våra sociala nätverk. \n!anka - skapar en Anklåt åt dig. \n!bordejag - borde du?```');
        break;
      case 'social':
        message.author.sendMessage('**YouTube: **http://www.youtube.com/Ålskål/ \n**Twitter: ** http://www.twitter.com/alskalmusic/ \n**Instagram**: https://www.instagram.com/alskalmusic/ \n**Snapchat: ** http://www.snapchat.com/add/alskalmusic/')
        break;
      case 'anka':
        message.author.sendMessage('Ank' + words[Math.floor(Math.random() * words.length)] + ' 2017');
        break;
      case 'sub':
        if (message.channel.type==='dm'){
        message.author.sendMessage(error_dm);
        return;
        }
        message.member.addRole(message.guild.roles.find('name', 'Subs'));
        break;
      case 'info':
        if (message.channel.type==='dm'){
          message.author.sendMessage(error_dm);
          return;
        }
        message.author.sendMessage('**Information: ** \nVi är just nu `' + message.guild.memberCount + '` medlemmar på Ålskåls server. \nServern skapades: `' + message.guild.createdAt + '` \nInvita folk med http://www.bit.ly/ÅlskålDiscord \nServerns admin är: ' +  message.guild.owner);
        break;
      case 'bordejag':
        message.channel.sendMessage(bordejag[Math.floor(Math.random() * bordejag.length)] + message.author.toString());
        break;
      case 'embed':
        message.channel.sendEmbed(new Discord.RichEmbed().addField('Title', 'Desc').setColor(0xffffff));
        break;
      case 'rules':
        message.channel.sendEmbed(new Discord.RichEmbed().addField('Regler:', '**1.** Skicka inget kränkande innehåll, dvs homofobi, nazism, rasism, sexism, och så vidare. \n**2.** Skicka inte pornografiskt innehåll eller liknande. \n**3.** Tjata inte om att få joina Ålskål-kanalen, den är till för oss i Ålskål, moderatorer, och våra vänner. \n**4.** Håll en god ton i chatten, kasta inte skit på varandra, sådant får ni lösa själva. \n**5.** Slutligen, Simon & Jacob bestämmer, oavsett vad. \n\nHoppas ni trivs på servern!').setColor(0x3399FF));
        break;
    //  case 'profile':
    //    var profile_content = message.content();
    //    JSON.write(profile_content, profiles.json)
    //    break;
      default:
      message.channel.sendMessage('```Detta kommando existerar inte.```')
    }
});

bot.login (token);
