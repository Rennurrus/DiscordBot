const Discord   = require('discord.js');    // Подключаем библиотеку discord.js
const config    = require('./config.json'); // Подключаем файл с параметрами и информацией
const prefix    = config.prefix;            // «Вытаскиваем» префикс
const botID     = config.botID;
const fs = require('fs'); 

function addToEventTeam(bot, reaction, user, emoji)
{
    const {guild}   = reaction.message;
    const member    = guild.members.cache.find(member => member.id === user.id);
    const file      = JSON.parse(fs.readFileSync('./public/dataEvent2.json', 'utf-8'))
    const firstRoleID	= file.firstTeam.roleID;
    const secondRoleID	= file.secondTeam.roleID; 

    if (emoji === file.firstTeam.emoji)
    {	
        if (member.roles.cache.find(role => role.id === secondRoleID) || file.secondTeam.teamMembers[member.user.id] != null)
        {
            user.send(`🟥 Вы уже в Красной команде! 🟥`);
            if (!member.roles.cache.find(role => role.id === secondRoleID))
                member.roles.add(secondRoleID);
            reaction.users.remove(user);
            return;
        }
        if (member.roles.cache.find(role => role.id === firstRoleID) || file.firstTeam.teamMembers[member.user.id] != null)
        {
            user.send(`Вы уже в команде 🟦 ${file.firstTeam.name} 🟦`);
            if (!member.roles.cache.find(role => role.id === firstRoleID))
                member.roles.add(firstRoleID);
            reaction.users.remove(user);
        }
        else
        {
            user.send(`Добро пожаловать в 🟦 ${file.firstTeam.name} 🟦`);
            member.roles.add(firstRoleID);
            reaction.users.remove(user);

            file.firstTeam.teamMembers[member.user.id] = member.user.username;
            fs.writeFileSync('./public/dataEvent2.json', JSON.stringify(file, null, 4));
        }
    }
    if (emoji === file.secondTeam.emoji)
    {
        if (member.roles.cache.find(role => role.id === firstRoleID) || file.firstTeam.teamMembers[member.user.id] != null)
        {
            user.send('🟦 Вы уже в Синей команде! 🟦');
            if (!member.roles.cache.find(role => role.id === firstRoleID))
                member.roles.add(firstRoleID);
            reaction.users.remove(user);
            return;
        }
        if (member.roles.cache.find(role => role.id === secondRoleID) || file.secondTeam.teamMembers[member.user.id] != null)
        {
            user.send(`Вы уже в команде 🟥 ${file.secondTeam.name} 🟥`);
            if (!member.roles.cache.find(role => role.id === secondRoleID))
                member.roles.add(secondRoleID);
            reaction.users.remove(user);
        }
        else
        {
            user.send(`Добро пожаловать в 🟥 ${file.secondTeam.name} 🟥`);
            member.roles.add(secondRoleID);
            reaction.users.remove(user);

            file.secondTeam.teamMembers[member.user.id] = member.user.username;
            fs.writeFileSync('./public/dataEvent2.json', JSON.stringify(file, null, 4));
        }
    }
}

function deleteUserFromTeam (bot, reaction, user, emoji)
{
    const {guild}   = reaction.message;
    const member    = guild.members.cache.find(member => member.id === user.id);
    const file      = JSON.parse(fs.readFileSync('./public/dataEvent2.json', 'utf-8'))
    const fileEmoji	= file.deleteMode.emoji; 

    if (emoji === fileEmoji)
    {
        reaction.users.remove(user);
        for (key in file.firstTeam.teamMembers)
        {
            if (file.firstTeam.teamMembers.hasOwnProperty(user.id)) 
            {
                user.send(`🗑️🟦 Вы удалены из ${file.firstTeam.name} 🟦🗑️`);
                member.roles.remove(file.firstTeam.roleID);
                delete file.firstTeam.teamMembers[user.id];
                fs.writeFileSync('./public/dataEvent2.json', JSON.stringify(file, null, 4));
                return;
            }
        }
        for (key in file.secondTeam.teamMembers)
        {   
            if (file.secondTeam.teamMembers.hasOwnProperty(user.id)) 
            {
                user.send(`🗑️🟥 Вы удалены из ${file.secondTeam.name} 🟥🗑️`);
                member.roles.remove(file.secondTeam.roleID);
                delete file.secondTeam.teamMembers[user.id];
                fs.writeFileSync('./public/dataEvent2.json', JSON.stringify(file, null, 4));
                return;
            }
        }
        user.send('Вам не присвоена команда!');
    }
}

var reaction_list =
{
    addUserToTeam : {
        name: "Add user to team",
        out : addToEventTeam,
        about : "Добавить пользователя в команду"
    },
    deleteUserFromTeam : {
        name : "Delete user from team",
        out : deleteUserFromTeam,
        about : "Удалить пользователя из команды"
    }
}

module.exports.reaction_list = reaction_list;