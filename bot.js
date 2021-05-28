require('dotenv').config();
const express 		= require('express');				// Подключаем фреймворк Express
const app 			= express();						// Запускаем express

const cors 			= require('cors');					// Библиотека CORS
const bodyParser 	= require('body-parser');			// Парсерс web-запросов

const SQLite 		= require("better-sqlite3");		// Библиотека БД SQLlite3
const sql 			= new SQLite('./db/SonsOfWeb.db');	// Подключаем БД 

const commands 		= require("./data/commands.js");  	// Подключаем файл с командами для бота
const voiceOrder 	= require("./data/voiceOrder.js");
const reactions 	= require("./data/emojiReaction.js");
const authorization = require("./data/authorizationSystem.js");
const fs 			= require('fs');                   	// Подключаем родной модуль файловой системы node.js      
let eventInfo 		= JSON.parse(fs.readFileSync('./public/dataEvent2.json', 'utf-8'));

let config 			= require('./data/config.json'); 	// Подключаем файл с параметрами и информацией
let token  			= process.env.TOKEN;                // Токен бота
let prefix 			= config.prefix;                 	// Префикс команд
let masterID 		= config.masterID;					// ID администратора бота
let nID  			= config.nikitaID;
let adminArr 		= [masterID, nID]; 
let guildID 		= config.guildID;

const { Client, Intents } = require("discord.js");
const intents = new Intents([
    Intents.NON_PRIVILEGED, 							// include all non-privileged intents, would be better to specify which ones you actually need
    "GUILD_MEMBERS", 									// lets you request guild members (i.e. fixes the issue)
]);
const bot = new Client({ ws: { intents }, partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

function sendInConsole(data)
{
	console.log(`[${new Date().toLocaleString('ru', { year:'numeric',month:'numeric',day: 'numeric',hour:'numeric',minute:'numeric'})}] : ${data}`);
}

function sendToAdmin(adminArrID, msg)
{
	adminArrID.forEach(element => {
		bot.users.fetch(element).then(user => 
			{
				user.send(`**Пересланное ЛС сообщение от ${msg.author.tag} :**`);
				if(msg.content && !msg.content.startsWith("https://"))
				{
					user.send({
					content : "Текст сообщения:",
					embed: 
					{
						color: 9807270,
						timestamp: new Date(),
						author: 
						{
							name: msg.author.username,
							icon_url: msg.author.avatarURL()
						},
						description: msg.content
					}
					});
				}
				if (msg.attachments.size)
				{
					user.send(`Прикреплённые файлы: `)
					msg.attachments.forEach(element => {
						user.send(element);
					});
				}
				if (msg.content.startsWith("https://"))
				{
					user.send(`Прикреплённые ссылки: `)
					user.send(msg.content);
				}
		});
	});
}

function getApp(guildID)
{
	const app = bot.api.applications(bot.user.id);
	if (guildID)
	{
		app.guilds(guildID);
	}
	return app;
}

bot.on("ready", async function(){																// При запуске бота 
	console.log(bot.user.username + " is connected!");
	//console.log(nID);
	//console.log(sql.prepare("SELECT * FROM USERS").all());
	//console.log()
	/*bot.channels.fetch("838667726717321226").then(channel => channel.send('Удалить меня из команды').then(message => 
		{
			message.react("🗑️"); 
			//message.react("🔴");
	}));*/

	const slashCommands = await bot.api.applications(bot.user.id).guilds(guildID).commands.get(); 
	console.log(slashCommands);
	await bot.api.applications(bot.user.id).guilds(guildID).commands.post({
		data: {
			name: "help",
			description: "Show all bot's commands"
		}

	});

	/*await bot.api.applications(bot.user.id).guilds(guildID).commands("842102899559628890").delete();*/

	await bot.api.applications(bot.user.id).guilds(guildID).commands.post({
		data: {
			name: "help",
			description: "Show all bot's commands"
		}

	});
});

bot.on("message", (msg) => {															// При получении сообщения
	if (msg.author.bot) return;															// Игнорировать сообщения от ботов
	if (msg.channel.type == 'dm' ) 
	{	
		sendToAdmin(adminArr, msg);														// Пересылка ЛС от обычных пользователей сообщения Мастер-пользователям в ЛС
	}
																						// Работа с командами
    if(msg.author.username != bot.user.username && msg.author.discriminator != bot.user.discriminator && msg.author.bot == false){
    	var commande = msg.content.trim()+" ";
	    var comm_name = commande.slice(0, commande.indexOf(" "));
        var messArr = commande.split(" ");
        
	    for(comm_count in commands.commands){
	    	var comm2 = prefix + commands.commands[comm_count].name;
	    	if(comm2 == comm_name){
	    		commands.commands[comm_count].out(bot, msg, messArr);
	    	}
	    }
    } 
});

bot.on("messageReactionAdd", async (reaction,user) => {

	if (reaction.message.partial) await reaction.message.fetch();

	if (reaction.message.id === eventInfo.massageID)
	{
		await reactions.reaction_list.addUserToTeam.out(bot, reaction, user, reaction._emoji.name);
	}

	if (reaction.message.id === eventInfo.deleteMode.massageID)
	{
		await reactions.reaction_list.deleteUserFromTeam.out(bot, reaction, user, reaction._emoji.name);
	}
});

bot.on("voiceStateUpdate", async (oldVoiceState, newVoiceState) => {
	if (oldVoiceState.channel !== undefined)
		var guildID = oldVoiceState.guild.id;
	else if (newVoiceState.channel !== undefined)
		var guildID = newVoiceState.guild.id;
	voiceOrder.run(bot, oldVoiceState, newVoiceState, String (guildID));
});


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.post('/', async (req, res) => {																// Обработка POST запросов 
	console.log("POST getted");
	console.log(req.body);

	guildname = await bot.guilds.fetch('344221549697564672').then(guild => {return guild.name});

	bot.guilds.fetch('344221549697564672').then(guild => {
		guild.members.fetch().then( fetchedMembers =>
			{
				const user = fetchedMembers.find(member => member.user.username + "#" + member.user.discriminator === req.body.nickname || member.user.username + " #" + member.user.discriminator === req.body.nickname);
				authorization.run(bot,req,res,sql,user);
			}	
		)
	});
});

app.get('/', async (req, res) =>{
	res.status(200).send("OK");
});

app.listen(80);
bot.login(process.env.TOKEN);