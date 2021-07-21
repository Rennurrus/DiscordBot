const Discord   = require('discord.js');    // Подключаем библиотеку discord.js
const config    = require('./config.json'); // Подключаем файл с параметрами и информацией
const prefix    = config.prefix;            // «Вытаскиваем» префикс
const botID     = config.botID;
// Команды //

function congratulate(bot, message, args)
{
    bot.guilds.fetch('344221549697564672').then(guild => {
		guild.members.fetch().then( fetchedMembers =>
			{
				const user = fetchedMembers.find(member => member.user.tag === args[1]);
                console.log(fetchedMembers);
				if (user)
				{

                    if (user.id == botID)
                    {
                        message.author.send("Спасибо за поздравление! И я вас тоже люблю <3");
                        return;
                    }

                    let robotmessage = args = message.content.split(' ');
                    robotmessage.splice(0,2);
                    robotmessage = args.join(' ');
                    user.send(`**Вам поздравление от анонимного пользователя:**\n> ${robotmessage}`);

                    if (message.attachments)
                    {
                        message.attachments.forEach(function(attachment)
                        {
                            user.send(attachment.proxyURL);
                        });
                    }

                    console.log(message.attachments);

                    message.delete().catch(); // Удаление сообщения пользователя после отправки
                    message.channel.send('Поздравление успешно отправлено!');
                }
                else
                {
                    message.author.send(`> Пользователя ${args[1]} нет в списке участников Sons of Web. Для более точного обращения укажите первым аргументом Никнейм и код в формате Nickname#1234!`);
                }
            }
        )
    });
}

function congratulateID(bot, message, args)
{
    bot.guilds.fetch('344221549697564672').then(guild => {
		guild.members.fetch().then( fetchedMembers =>
			{
				const user = fetchedMembers.find(member => member.user.id === args[1]);
				if (user)
				{

                    if (user.id == botID)
                    {
                        message.author.send("Спасибо за поздравление! И я вас тоже люблю <3");
                        return;
                    }

                    let robotmessage = args = message.content.split(' ');
                    robotmessage.splice(0,2);
                    robotmessage = args.join(' ');
                    user.send(`**Вам поздравление от анонимного пользователя:**\n> ${robotmessage}`);

                    if (message.attachments)
                    {
                        message.attachments.forEach(function(attachment)
                        {
                            user.send(attachment.proxyURL);
                        });
                    }

                    console.log(message.attachments);

                    message.delete().catch(); // Удаление сообщения пользователя после отправки
                    message.channel.send('Поздравление успешно отправлено!');
                }
                else
                {
                    message.author.send(`> Пользователя ${args[1]} нет в списке участников Sons of Web. Для более точного обращения укажите первым аргументом Никнейм и код в формате Nickname#1234!`);
                }
            }
        )
    });
}

function saydm(bot, message, args)
{

    bot.guilds.fetch('344221549697564672').then(guild => {
		guild.members.fetch().then( fetchedMembers =>
			{
				const user = fetchedMembers.find(member => member.user.username + "#" + member.user.discriminator === args[1]);
				if (user)
				{
                    if (user.id == botID)
                    {
                        message.author.send("Спасибо конечно, но я не тупой, сам себе сообщение отправлять не собираюсь...");
                        return;
                    }

                    if (message.channel.type == 'dm')
                    {
                        return message.author.send(`${message.author} команда выполняется только администрацией`); /* Если у исполнителя команды нету привилегии MANGAGE_MESSAGES, он не сможет её использовать */
                    }

                    if (!message.member.hasPermission("MANAGE_CHANNELS"))
                    {
                        message.delete().catch();
                        return message.author.send(`${message.author} У вас нет прав`); /* Если у исполнителя команды нету привилегии MANGAGE_MESSAGES, он не сможет её использовать */
                    } 

                    if (args[2].length == 0)
                    {
                        message.delete().catch();
                        return message.author.send("Ошибка! Сообщение пустое!");
                    } 

                    let robotmessage = args = message.content.split(' ');
                    robotmessage.splice(0,2);
                    robotmessage = args.join(' ');
                    user.send(`${robotmessage}`);

                    if (message.attachments)
                    {
                        message.attachments.forEach(function(attachment)
                        {
                            user.send(attachment.proxyURL);
                        });
                    }

                    message.delete().catch(); // Удаление сообщения пользователя после отправки
                    message.author.send('Сообщение успешно отправлено!');
                }
                else
                {
                    console.log(args);
                    message.author.send(`> Пользователя ${args[1]} нет в списке участников Sons of Web. Для более точного обращения укажите первым аргументом Никнейм и код в формате Nickname#1234!`);
                }
            }
        )
    });
}

function saydmID(bot, message, args)
{
    bot.guilds.fetch('344221549697564672').then(guild => {
		guild.members.fetch().then( fetchedMembers =>
			{
				const user = fetchedMembers.find(member => member.user.id === args[1]);
				if (user)
				{
                    if (user.id == botID)
                    {
                        message.author.send("Спасибо конечно, но я не тупой, сам себе сообщение отправлять не собираюсь...");
                        return;
                    }

                    if (user.id == botID) return;

                    if (message.channel.type == 'dm')
                    {
                        return message.author.send(`${message.author} команда выполняется только `); /* Если у исполнителя команды нету привилегии MANGAGE_MESSAGES, он не сможет её использовать */
                    }

                    if (!message.member.hasPermission("MANAGE_CHANNELS"))
                    {
                        message.delete().catch();
                        return message.author.send(`${message.author} У вас нет прав`); /* Если у исполнителя команды нету привилегии MANGAGE_MESSAGES, он не сможет её использовать */
                    } 

                    if (args[2].length == 0)
                    {
                        message.delete().catch();
                        return message.author.send("Ошибка! Сообщение пустое!");
                    } 

                    let robotmessage = args = message.content.split(' ');
                    robotmessage.splice(0,2);
                    robotmessage = args.join(' ');
                    user.send(`${robotmessage}`);

                    /*user.send({
                        
                        embed: {
                            description: `**ПРЕДУПРЕЖДЕНИЕ**`,
                            color: 0x6d1516,
                        }
                    });
                    user.send(`\`\`\`Прошло достаточное количество времени с тех пор, как Вы вступили в ряды Ордена. Достаточное количество времени, чтобы люди смогли сложить о Вас свои впечатления и представления. Мнения людей разнятся. Но их можно привести к единой, самой распространённой точке зрения. \n\nБольшинство не одобряет Ваше поведение и Ваши действия. Многие расценили поведение как "неадекватное", "агрессивное", "токсичное". Некоторых людей Ваши действия задели. Это уже можно приравнять к многократному нарушению п.2 Основного Кодекса Ордена. Некоторое время данные нарушения игнорировались. \nКоличество Вашего негативного влияния превысило количество положительного. Мы не можем уже игнорировать этот факт.\n\nЕсли Ваше поведение останется агрессивным и токсичным, если Ваши слова и действия далее будут ранить или задевать других людей, если Вы далее не будете откликаться на основательные просьбы других изменить своё поведение, то тогда наши пути на этом разойдутся окончательно: нам придётся исключить Вас из Ордена.\n\nМы ценим Ваш вклад, но мы не можем допустить дальнейшее разложение Ордена.\n\n----------------------------------------------------------------------------------------------------------------------------------------------------- Высшие Инстанции\`\`\``);
                    user.send('https://cdn.discordapp.com/attachments/407151764635385856/828660996545577010/123213213123.png');*/


                    if (message.attachments)
                    {
                        message.attachments.forEach(function(attachment)
                        {
                            user.send(attachment.proxyURL);
                        });
                    }

                    message.delete().catch(); // Удаление сообщения пользователя после отправки
                    message.author.send('Сообщение успешно отправлено!');
                }
                else
                {
                    console.log(args);
                    message.author.send(`> Пользователя ${args[1]} нет в списке участников Sons of Web. Для более точного обращения укажите первым аргументом Никнейм и код в формате Nickname#1234!`);
                }
            }
        )
    });
}

function reg(bot, message, args)
{
    /*let {guild} = message;
    if (guild.id !=="344221549697564672")
    {
        message.user.send(`Команда работает исключительно на сервере ${guild.name}!`);
        return;
    }

    console.log(args);
    // id name age gender mic 
    if (args.length != 5)
    {
        message.user.send(`Неверное кол-во аргументов!`);   
    }

    message.delete().catch();*/
}

function test(bot, message, args) 
{
    console.log(message.guild);
    console.log(args[1].length);
    console.log(args[1].substr(3, args[1].length - 4));
}

async function test2(bot, message, args)
{
    let guild = await bot.guilds.cache.find(guild => guild.id == '420600250466828288'); 
    await guild.channels.create('Хочу питсу', 
    {
        type:'category', 
        reason: 'i just wanna pizza'
    });
    let new_channel = await guild.channels.cache.find(channel => channel.name == 'Хочу питсу');
    await new_channel.setPosition(1, { reason: 'I SAY I WANNA PIZZA'});
    await bot.channels.fetch('420600250466828290').then(channel => channel.setParent(new_channel.id, { lockPermissions: false})); 
}

function say(bot, message, args)
{
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
    {
        message.delete().catch();
        return message.channel.send(`${message.author} У вас нет прав`); /* Если у исполнителя команды нету привилегии MANGAGE_MESSAGES, он не сможет её использовать */
    } 

    if (args[1].length == 0)
    {
        message.delete().catch();
        return message.channel.send("Ошибка! Сообщение пустое!");
    } 

    let robotmessage = args = message.content.split(' '); // Пробелы между словами 
    robotmessage.shift();
    robotmessage = args.join(' ');  

    message.delete().catch(); // Удаление сообщения пользователя после отправки

    message.channel.send(robotmessage); /* Отправление в чат сообщения бота */
}

function sendMechanicusRage(bot, massege, args)
{
    if (!massege.member.hasPermission("MANAGE_CHANNELS"))
    {
        massege.delete().catch();
        return massege.channel.send(`${massege.author} У вас нет прав`); /* Если у исполнителя команды нету привилегии MANGAGE_MESSAGES, он не сможет её использовать */
    } 

    massege.delete().catch();
    emoji = bot.emojis.cache.find(emoji => emoji.name === 'MechanicusRage');
	massege.channel.send(`${emoji}`);
}

function getHelpList(bot, member)
{
    const embed = new Discord.MessageEmbed()
    .setAuthor(bot.user.username,bot.user.avatarURL())
    .setTitle('Commissar-General\'s commands list:')
    .setColor(0xffbb00)
    .addField('**Slash commands:**','=========================================================',false)
    .addField('\`/help\`','Показать список команд',true)
    .addField('\`/say\` \`text:\`','Написать от лица бота **[Администрация]**',true)
    .addField('**Common commands:**','=========================================================',false);
    for (let command in commandsList)
    {
        let item = commandsList[command];
        embed.addField(`\`//${item.name}\``,`${item.about}`, true)
    }
    if (member.permissions & 0x0000000008)  // 0x0000000008 - это 4 бит справа, который отвечает за права Администратора 
    {									    // https://discord.com/developers/docs/topics/permissions
        embed.addField('**Admins commands:**','=========================================================',false)
        for (let command in adminCommandsList)
        {
            let item = adminCommandsList[command];
            embed.addField(`\`//${item.name}\``,`${item.about}`, true)
        }
    }
    embed.setFooter("\u3000".repeat(10));
    return embed;
}

function help(bot, message, args)
{
    message.channel.send( /*message.author.toString() + "\n```\n" + bot.user.username + "'s commands list:\n\n" + */getHelpList(bot, message.member)/* + "```"*/);
}

// Список команд //

var commandsList = 
[
    {
        name: "test",
        out: test,
        about: "Тестовая команда"
    },
    {
        name: "test2",
        out: test2,
        about: "Проверка"
    },
    {
        name: "help",
        out: help,
        about: "Это команда"
    },
    {
        name: "congratulate",
        out: congratulate,
        about: "Написать поздравление человеку <username#tag>"
    },
    {
        name: "congratulateID",
        out: congratulateID,
        about: "Написать поздравление человеку по ID <userID>"
    },
    {
        name: 'emojiMR',
        out: sendMechanicusRage,
        about: "Отправить эмодзи Механикуса"
    },
    /*{
        name: 'reg',
        out: reg,
        about: "[Не работает] Регистрация пользователя (ID, имя, возраст, пол <Муж or Жен>, микрофон <1 or 0>)"
    }*/

];

var adminCommandsList = [
    {
        name: "say",
        out: say,
        about: "Сказать ботом фразу **[Администрация]**"
    },
    {
        name: "saydm",
        out: saydm,
        about: "Сказать ботом фразу в     ЛС пользователю **[Администрация]**"
    },
    {
        name: "saydmID",
        out: saydmID,
        about: "Сказать ботом фразу в   ЛС пользователю по ID **[Администрация]**"
    },
]

// Name     - название команды, на которую будет реагировать бот
// Out      - название функции с командой
// About    - описание команды 

module.exports.getHelpList      = getHelpList;
module.exports.commands         = commandsList;
module.exports.adminCommands    = adminCommandsList;