const Discord           = require('discord.js');            // Подключаем библиотеку discord.js
const config            = require('./config.json');         // Подключаем файл с параметрами и информацией
const orderChannels     = config.order_channels;     // «Вытаскиваем» префикс
const botID             = config.botID;
const fs                = require('fs'); 

function regDateMsgPackeger(user , req)
{
    return {
        content : "**Новый пользователь зарегестрировался через сайт:**",
        embed: {
            color: 0x3af60d,
            timestamp: new Date(),
            description: 
            `\`\`\`
                Никнейм:            ${req.body.nickname}\n
                Имя:                ${req.body.name}\n
                Возраст:            ${req.body.age}\n
                Пол:                ${req.body.gender}\n
                Наличие микрофона:  ${req.body.microphone}\n
                ID:                 ${user.id}\n
                Дата регистрации:   ${new Date().toLocaleString('ru', 
                    {
                        year: 	'numeric',
                        month: 	'long',
                        day:  	'numeric',
                        hour: 	'numeric',
                        minute: 'numeric'
                    }
                )}
            \`\`\``
        }
    }
}

function sqlPackeger(user, req)
{
    return { 
        id:         String(user.id), 
        tag:        user.user.tag , 
        name:       req.body.name, 
        gender:     req.body.gender, 
        role:       "Скаут", 
        age:        Number(req.body.age), 
        mic:        (req.body.microphone === "да") ? 1 : 0 ,  
        reg_date:   `${new Date().toLocaleString('ru', 
                            {
                                year: 	'numeric',
                                month: 	'long',
                                day:  	'numeric',
                                hour: 	'numeric',
                                minute: 'numeric'
                            })}`
    }
}

function authorization(bot, req, res, sql, user)
{
    if (user)
    {
        bot.channels.fetch('787718048097501246').then(channel => channel.send(`Пользователь ${req.body.nickname} есть на сервере ${guildname}!`));
        if(user._roles.length == 0)
        {
            user.roles.add('344586010060914699');
            user.roles.add('560808526621179934');
            bot.channels.fetch('787718048097501246').then(channel => channel.send(`Пользователю ${req.body.nickname} добавили роли "Скаут" и "Адептус Астартес"!`));
            bot.channels.fetch('430733260704710676').then(channel => channel.send(regDateMsgPackeger(user, req)));
            res.send('OK');
            sql_response = sql.prepare("INSERT OR REPLACE INTO USERS (id, tag, name, gender, role, age, mic, reg_date) VALUES (@id, @tag, @name, @gender, @role, @age, @mic, @reg_date);")
            console.log(sqlPackeger(user,req));
            sql_response.run(sqlPackeger(user,req));
        }
        else
        {
            bot.channels.fetch('787718048097501246').then(channel => channel.send(`У пользователя ${req.body.nickname} уже есть роли!`));
            res.send('Err_0x02');
        }
    }
    else
    {
        res.send('Err_0x01');
        bot.channels.fetch('787718048097501246').then(channel => channel.send(`Пользователя ${req.body.nickname} нет на сервере ${guildname}!`));
    }
}

module.exports.run = authorization;