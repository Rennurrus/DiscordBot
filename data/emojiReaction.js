const Discord   = require('discord.js');    // Подключаем библиотеку discord.js
const config    = require('./config.json'); // Подключаем файл с параметрами и информацией
const prefix    = config.prefix;            // «Вытаскиваем» префикс
const botID     = config.botID;
const fs = require('fs'); 

function addToEventTeam(bot, reaction, user, emoji)
{
    const {guild}   = reaction.message;
    const member    = guild.members.cache.find(member => member.id === user.id);
    const file      = JSON.parse(fs.readFileSync('./public/dataEvent.json', 'utf-8'))
    const firstRoleID	= file.firstTeam.roleID;
    const secondRoleID	= file.secondTeam.roleID; 

    if (emoji === file.firstTeam.emoji)
    {	
        if (member.roles.cache.find(role => role.id === secondRoleID) || file.secondTeam.teamMembers[member.user.id] != null)
        {
            user.send('Мы не принимаем на службу изгове общества, наркоманов, проституток, чумб и прочюю ересь улицы. Уведите его!');
            if (!member.roles.cache.find(role => role.id === secondRoleID))
                member.roles.add(secondRoleID);
            reaction.users.remove(user);
            return;
        }
        if (member.roles.cache.find(role => role.id === firstRoleID) || file.firstTeam.teamMembers[member.user.id] != null)
        {
            user.send(`Вы уже в команде ${file.firstTeam.name}`);
            if (!member.roles.cache.find(role => role.id === firstRoleID))
                member.roles.add(firstRoleID);
            reaction.users.remove(user);
        }
        else
        {
            user.send(`Удачной службы в ${file.firstTeam.name}, офицер!`);
            member.roles.add(firstRoleID);
            reaction.users.remove(user);

            file.firstTeam.teamMembers[member.user.id] = member.user.username;
            fs.writeFileSync('./public/dataEvent.json', JSON.stringify(file, null, 4));
        }
    }
    if (emoji === file.secondTeam.emoji)
    {
        if (member.roles.cache.find(role => role.id === firstRoleID) || file.firstTeam.teamMembers[member.user.id] != null)
        {
            user.send('Ты уже в другой команде, кусок мяса. Легавым тут не место, Чумба...');
            if (!member.roles.cache.find(role => role.id === firstRoleID))
                member.roles.add(firstRoleID);
            reaction.users.remove(user);
            return;
        }
        if (member.roles.cache.find(role => role.id === secondRoleID) || file.secondTeam.teamMembers[member.user.id] != null)
        {
            user.send(`Вы уже в команде ${file.secondTeam.name}`);
            if (!member.roles.cache.find(role => role.id === secondRoleID))
                member.roles.add(secondRoleID);
            reaction.users.remove(user);
        }
        else
        {
            user.send(`Добро пожаловать в ${file.secondTeam.name}, братюня!`);
            member.roles.add(secondRoleID);
            reaction.users.remove(user);

            file.secondTeam.teamMembers[member.user.id] = member.user.username;
            fs.writeFileSync('./public/dataEvent.json', JSON.stringify(file, null, 4));
        }
    }
}

var reaction_list =
{
    addUserToTeam : {
        name: "Add user to team",
        out : addToEventTeam,
        about : "Добавить пользователя в команду"
    }
}

module.exports.reaction_list = reaction_list;