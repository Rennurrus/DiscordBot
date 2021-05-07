const fs 		= require('fs');                // Подключаем родной модуль файловой системы node.js  
const eventData = JSON.parse(fs.readFileSync('./data/dataEvent.json', 'utf-8'))


function addToTeam (reaction, user)
{
    if (reaction.message.id === eventData.massegeId)
	{
        const {guild} = reaction.message;
        const member  = guild.members.cache.find(member => member.id === user.id);
        const file = JSON.parse(fs.readFileSync('./data/dataEvent.json', 'utf-8'))
        const firstRoleID	= eventData.firstTeam.roleID;
        const firstEmoji    = eventData.firstTeam.emoji;
        const secondRoleID	= eventData.secondTeam.roleID; 
        const secondEmoji   = eventData.secondTeam.emoji;
    
        if (reaction._emoji.name === firstEmoji)
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
                fs.writeFileSync('./data/dataEvent.json', JSON.stringify(file, null, 4));
            }
        }
    
        if (reaction._emoji.name === secondEmoji)
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
                fs.writeFileSync('./data/dataEvent.json', JSON.stringify(file, null, 4));
            }
        }	
	}
}

module.exports.emojiReaction = addToTeam;