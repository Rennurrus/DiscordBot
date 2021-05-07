const Discord           = require('discord.js');            // Подключаем библиотеку discord.js
const config            = require('./config.json');         // Подключаем файл с параметрами и информацией
const orderChannels     = config.order_channels;     // «Вытаскиваем» префикс
const botID             = config.botID;
const fs                = require('fs'); 

async function gameVoicechannelsOrder(bot, oldVoiceState, newVoiceState)
{
    if 
    ( 
        newVoiceState.channel !== null && 
        orderChannels.find(channel => channel === newVoiceState.channelID) && 
        (
            oldVoiceState.channel === null || 
            !oldVoiceState.channel.members.find(member => member === newVoiceState.member))
        ) 
    {                                               // Пользователь подключился к каналу
            await console.log(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
            await bot.channels.fetch(newVoiceState.channelID).then(channel => channel.setParent("835807606202826773", { lockPermissions: false})); 
    }  
	if  
    ( 
        orderChannels.find(channel => channel === oldVoiceState.channelID) && 
        ( 
            newVoiceState.channel === null || 
            !oldVoiceState.channel.members.find(member => member === newVoiceState.member)) 
        ) 
    {                                               // Пользователь отключился от канала
            if (oldVoiceState.channel.members.size == 0)
                await bot.channels.fetch(oldVoiceState.channelID).then(channel => channel.setParent("835807659533271041", { lockPermissions: false}));
            await console.log(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`)
    };
}

module.exports.run = gameVoicechannelsOrder;