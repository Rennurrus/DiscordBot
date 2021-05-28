const Discord           = require('discord.js');                // Подключаем библиотеку discord.js
const config            = require('./orderConfig.json');   // Подключаем файл с параметрами и информацией
const botConfig         = require('./config.json');   // Подключаем файл с параметрами и информацией
const fs                = require('fs'); 

async function gameVoicechannelsOrder(bot, oldVoiceState, newVoiceState, guildID)
{
    for (item in config)
    {
        if (config[item].guildID == guildID)
        {   
            var orderChannels = config[item].channelsID;
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
                    await bot.channels.fetch(newVoiceState.channelID).then(channel => channel.setParent(config[item].activeID, { lockPermissions: false})); 
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
                        await bot.channels.fetch(oldVoiceState.channelID).then(channel => channel.setParent(config[item].bankID, { lockPermissions: false}));
                    await console.log(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`)
            };
        }
        else if (guildID == botConfig.guildID)
        {
            if 
            ( 
                newVoiceState.channel != null &&
                newVoiceState.channel.parent.id == botConfig.orderID 
            )
            {       // Пользователь подключился к каналу
                    console.log(`${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`);
                    await bot.channels.fetch(newVoiceState.channelID).then(channel => channel.setParent(botConfig.activeID, { lockPermissions: false})); 
            }  
            if  
            ( 
                oldVoiceState.channel != null &&
                oldVoiceState.channel.members.size == 0 &&
                oldVoiceState.channel.parent.id == botConfig.activeID 
            )
            {       // Пользователь отключился от канала
                    console.log(`${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`);
                    await bot.channels.fetch(oldVoiceState.channelID).then(channel => channel.setParent(botConfig.orderID, { lockPermissions: false}));
            } 
        }
    }
}

module.exports.run = gameVoicechannelsOrder;