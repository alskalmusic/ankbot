const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'TOKEN_HERE'
const prefix = "!";

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//Genvägsvariabler
var error_dm = '```Detta kommando funkar inte i DM, skriv det i #general på Ålskål-servern.```'
var bot_version = '1.2.0'
var profanity_msg = 'Fy skäms på dig! >:('
var link_msg = 'Länkar är ej tillåtna för subs eftersom att folk (Limousinen med flera) har spammat olämpliga saker i chatten.'

console.log('Bot started. Version: ' + bot_version + '\nCopyright © Ålskål \n\nAvailable commands: \n!help \n!social \n!anka \n!sub \n!info \n!bordejag')

var words = require('./substativ');


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
    guild.defaultChannel.sendEmbed(new Discord.RichEmbed().addField('Välkommen till Ålskåls Discord-server!', member.user.toString() + '\nSkriv !sub för att få subscriber permissions. \nSkriv !rules för att se våra regler.').setColor(0xCC0000));
});
//Say goodbye to member.
bot.on('guildMemberRemove', (member) => {
    var guild = member.guild;
    guild.defaultChannel.sendEmbed(new Discord.RichEmbed().addField('Hejdå!', member.user.toString() + '\nHoppas du trivdes.').setColor(0xCC0000));
});
//Profanity filter.

bot.on('message', (message) => {
    let profanity = ["neger",
        "hora",
        "fitt",
        "slyn",
        "slamp",
        "bög",
        "lesb",
        "svarting",
        "mongolid",
        "blatte",
        "nigger",
        "fag",
        "knull",
        "cock",
        "nigga",
        "kuk",
        "卐"
    ];
    if (profanity.some(filter => message.content.toLowerCase().includes(filter))) {
        message.delete();
        message.author.sendMessage(profanity_msg);
    }

    if(message.author.bot)
    {
      return;
    }else{
    console.log(message.author.toString() + message.content);
    }

});

bot.on('message', (message) => {

    //Commmandos
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;

    var split = message.content.substring(prefix.length).split(' ');

    switch (split[0].toLowerCase()) {
        case 'help':
            message.channel.sendMessage('```!help - visar denna meny. \n!rules - visar reglerna vi har på server.\n!info - visar information om servern. \n!social - länkar våra sociala nätverk. \n!anka - skapar en Anklåt åt dig. \n!bordejag - borde du?```');
            break;
        case 'social':
            message.author.sendEmbed(new Discord.RichEmbed().addField('Våra sociala nätverk:', '**YouTube: **http://www.youtube.com/Ålskål/ \n**Twitter: ** http://www.twitter.com/alskalmusic/ \n**Instagram**: https://www.instagram.com/alskalmusic/ \n**Snapchat: ** http://www.snapchat.com/add/alskalmusic/').setColor(0xCC0000));
            break;
        case 'anka':
            message.author.sendMessage('Ank' + words[Math.floor(Math.random() * words.length)] + ' 2017');
            break;
        case 'sub':
            if (message.channel.type === 'dm') {
                message.author.sendMessage(error_dm);
                return;
            }
            message.member.addRole(message.guild.roles.find('name', 'Subs'));
            break;
        case 'info':
            if (message.channel.type === 'dm') {
                message.author.sendMessage(error_dm);
                return;
            }
            message.author.sendMessage('**Information: ** \nVi är just nu `' + message.guild.memberCount + '` medlemmar på Ålskåls server. \nServern skapades: `' + message.guild.createdAt + '` \nInvita folk med http://www.bit.ly/ÅlskålDiscord \nServerns admin är: ' + message.guild.owner);
            break;
        case 'bordejag':
            message.channel.sendMessage(bordejag[Math.floor(Math.random() * bordejag.length)] + message.author.toString());
            break;
        case 'rules':
            message.channel.sendEmbed(new Discord.RichEmbed().addField('Regler:', '**1.** Skicka inget kränkande innehåll, dvs homofobi, nazism, rasism, sexism, och så vidare. \n**2.** Skicka inte pornografiskt innehåll eller liknande. \n**3.** Tjata inte om att få joina Ålskål-kanalen, den är till för oss i Ålskål, moderatorer, och våra vänner. \n**4.** Håll en god ton i chatten, kasta inte skit på varandra, sådant får ni lösa själva. \n**5.** Earrape är insta-ban, det går **INTE** att överklaga. \n**6.** Slutligen, Simon & Jacob bestämmer, oavsett vad. \n\nHoppas ni trivs på servern!').setColor(0x3399FF));
            break;
        case 'subcount':
            if (message.member.roles.exists('name', 'Ålskål')) {
                message.guild.defaultChannel.sendMessage('@everyone Vi har uppnått ' + split[1] + ' prenumeranter på YouTube! Tack till alla ' + message.guild.roles.find('name', 'Subs') + ', och till alla ' + message.guild.roles.find('name', 'Mods') + ' som hjälpt till att hålla ordning på servern, hoppas ni trivs nu och framöver!');
            }
        case 'broadcast':
            if (message.member.roles.exists('name', 'Ålskål')) {
                message.delete();
                message.channel.sendMessage(message.content.substring(10))
            }
            break;
        case 'slang':
            var slang_url = 'http://www.slangopedia.se/ordlista/?ord=' + split[1];
            var slang_add = 'http://www.slangopedia.se/laggtill/?ord=' + split[1];
            request(slang_url, function(err, resp, body) {
                var $ = cheerio.load(body);

                var slang_title = $('.word').first()
                var slang_titleText = slang_title.text();

                var slang_def = $('.definition').first();
                var slang_defText = slang_def.text();

                if (slang_titleText == '' && slang_defText == '') {
                    message.channel.sendEmbed(new Discord.RichEmbed().addField('**Kunde inte hitta slanget "' + split[1] + '".**', 'Detta slang verkar inte finnas på slangopedia, lägg till det här: ' + slang_add).setColor(0xffcc77))
                } else {
                    message.channel.sendEmbed(new Discord.RichEmbed().addField('**' + slang_titleText + '**', slang_defText).setColor(0xffcc77))
                }
            });
            break;
        case 'ow':
        //For compatibility with Overwatch bot.
            return;
            break;
        case 'makesubs':
            message.guild.fetchMembers()
            message.guild.members.filter();
            break;
        default:
            message.channel.sendMessage('```Detta kommando existerar inte.```')
    }
});

bot.login(token);
