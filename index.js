const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment")
require("moment-duration-format")

//user info command

client.on('message', m =>
{
    if(m.content.toLowerCase().startsWith("!userinfo"))
    {
     let member = m.mentions.members.first() || m.member,
     user = member.user;

      const embed = new Discord.RichEmbed()
      .setAuthor(user.tag, user.displayAvatarURL)
      .setThumbnail(user.displayAvatarURL)
      .addField(`Username`, user.username)
      .addField(`User id`, user.discriminator)
      .addField(`Created acc at`, moment.utc(m.guild.members.get(user.id).user.createdAt).format(`dddd, MMMM Do YYYY, HH:MM:SS`), true)
      .addField(`Roles`, member.roles.map(r => `${r}`).join(` | `), true)
      .addField(`Joined at`, moment.utc(m.guild.members.get(user.id).user.createdAt).format(`dddd, MMMM Do YYYY, HH:MM:SS`), true)
      .addField(`Status`, user.presence.status, true)
      .setFooter(`Replying to ${user.tag}`)
      .setColor(`RANDOM`)
      .setTimestamp()
    m.channel.send(embed)
    }

})



//Beatbox tournament commands..

var que = [];
var partstart = []
client.on('message', message => 
{
if(partstart)
{
    if(message.content.toLowerCase() === "!part")
    {
        if(que.indexOf(message.author.username) > -1)
        {
            message.reply("You already in queue!")
        }else
        {
            
            que.push(message.author.username)
            message.reply("You have been added to the queue!")
        }
    }
    if(message.content.toLowerCase() === "!quit")
    {
        if(que.indexOf(message.author.username) === -1)
        {
            message.reply("You are not in the queue to quit")
        }
        else
        {
            que.splice(que.indexOf(message.author.username), 1)
            message.reply("You have been removed from the queue!")
        }
    }
    if(message.content.toLowerCase() === "!eo")
    {
        if(!message.member.roles.find(r => r.name === "[ Host ]")) return message.reply("You have no permission to skip!")

        partstart = false;
        message.reply("Queue has been closed!")
        
    }
    if(message.content.toLowerCase() === "!ec")
    {
        if(!message.member.roles.find(r => r.name === "[ Host ]")) return message.reply("You have no permission to skip!")
        partstart = true;

        message.reply("Queue has been closed")
    }
    if(message.content.toLowerCase() == "!list")
    {


        let pn = que[0]

        const preformingnow = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setTitle(`Preforming now : ${pn}`)
        let nxt = que[1]

        let next = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setTitle(`Next in queue : ${nxt}`)
        
        let list = new Discord.RichEmbed()
        let msg = '';
        for (let i = 0; i < que.length; i++)
        {
         msg += i + ' ' + que[i] + ' ' + `\n`;
        }

         list.setTitle(msg)
         list.setDescription("Participants : " +  que.length)
         .setColor(`RANDOM`)
        if(que.length < 0 || pn == undefined || next == undefined) return  message.reply("Queue is empty!")
         message.channel.send(preformingnow).then(() => {
              message.channel.send(next)
              message.channel.send(list)
         })
    }
    if(message.content.toLowerCase() == "!skip")
    {
        if(!message.member.roles.find(r => r.name === "[ Host ]")) return message.reply("You have no permission to skip!")
        
        message.reply(`${que[0]} has been skipped!`)
        que.unshift(que[1])
        que.pop()
    }

}

})






//------------ Moderation..
client.on('message', message => {
    if(message.content.toLowerCase().startsWith("!purge"))
    {
    const args = message.content.slice(1).split(" ").slice(1);

       if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.reply('Sorry u have no permission!')
         
         if(isNaN(args[0])) return message.channel.send("Please Provide a number of messages to delete")

         if(!parseInt(args[0]) > 100) return message.reply("Please Provide A number between 1-100")
         message.channel.bulkDelete(parseInt(args[0]))
           .then(messages => message.channel.send(`Deleted \`${messages.size}/${args[0]}\` Messages!`))      
           .then(msg => msg.delete(5000))
           
           .catch(err => message.channel.send(`Error moron ${err.message}`))
   

    }
if(message.content.toLowerCase().startsWith('!mute'))
{
    if(!message.member.hasPermissions(['ADMINISTRATOR', 'MUTE_MEMBERS'])) return message.reply("Sorry you have no permission!")
    const user = message.mentions.users.first()     
    const member = message.guild.member(user)
    let role = message.guild.roles.find(r=> r.name === 'MUTED')  

    if(!user) return message.reply("Please Mention a member to mute!")
    
    if(user)
    {
        member.addRole(role)
        message.reply(`Successfully Muted ${user.tag}`)
        .then(msg => msg.delete(5000))
    }
}
if(message.content.toLowerCase().startsWith("!unmute"))
{
    if(!message.member.hasPermissions(['ADMINISTRATOR', 'MUTE_MEMBERS'])) return message.reply("Sorry you have no permission!")
    const user = message.mentions.users.first()
    const member = message.guild.member(user)
    let role = message.guild.roles.find(r => r.name === "MUTED")
    if(!user) return message.reply("You have to mention someone Which is muted!")
    if(user)
    {
        member.removeRole(role)
        message.reply(`Successfully unmuted ${user.tag}`)
    }
}
})
client.on('message', message => {

   if(message.content.toLowerCase().startsWith('!kick'))
   {
       const user = message.mentions.users.first()
       const args = message.content.slice(2).split(" ")
       let reason = message.content.split(" ").slice(2).join(' ')
       if(!message.member.hasPermission(["KICK_MEMBERS"])) return message.reply("Sorry you have no permission!")

       if(!user) return message.reply('You have to mention a member first!').then( msg => msg.delete(5000))
       if(user)
        {
           user.send(`You got kicked from ZoonCord for : ${reason}`).catch(err => message.reply(`Error : ${err.message}`))
            const embed = new Discord.RichEmbed()
            .setColor(`#E73C18`)
            .setTitle(`Kicked : ${user.tag} Succesfully from ZoonCord`)
            .addBlankField()
            .addField(`Reason`, reason)
            .addBlankField()
            .setTimestamp()
            message.reply(embed).then(() => message.guild.member(user).kick()) 
       }
   }
if(message.content.toLowerCase().startsWith('!ban'))
{
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.reply("Sorry you have no permission") 
    const user = message.mentions.users.first()
    let args = message.content.slice(2).split(' ')
    let reason = message.content.split(" ").slice(2).join(' ')
    if(!user) return message.reply("You need to mention someone!")
    if(user)
    {
         user.send(`You have been banned from ZoonCord for : ${reason}`).catch(() => {
             message.channel.send('I was not able to dm that user');
        });
        const embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setTitle(`Banned : ${user.tag} Succesfully from ZoonCord`)
        .addBlankField()
        .addField(`Reason`, reason)
        .setTimestamp()
        message.reply(embed).then(() => message.guild.member(user).ban())  
    }
}
if(message.content.toLowerCase().startsWith('!unban'))
    {
        const args = message.content.slice().split(' ');
        let bannedmember = args[1]

        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))  return message.reply("Sorry you have no permission to unban anyone!")

        if(!bannedmember) return message.reply('You have to provide an id')
        
        message.guild.unban(bannedmember)
        message.reply({embed:{
            color: 3447003,
            description: `Unbanned \`${bannedmember} From ZoonCord`
           }}).then(msg => msg.delete(10000))

           message.member.send(`Here is the invite for ZoonCord : https://discord.gg/pS96N5z`)
    }
})
//------------------------
// Welcome message / auto role ;d
client.on('guildMemberAdd', (member) => {

    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Welcome to ZoonCord ' + member.displayName)
    .setDescription('Make sure to read the rules to avoid getting Banned!')
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .addBlankField()
    .addField("Support Zoon :d", "Instagram : @zoonattackbbx. Twitter : @AttackZoon. Youtube : ZoonAttack");

    let channel = client.channels.find(ch=> ch.name === "general-chat-💬")

    channel.send(embed)

    let role = member.guild.roles.find(r=> r.name === '[ ZoonGang ]')

    member.addRole(role)
})
//--------------------- fun commands
function Coinflip()
{
    return (Math.floor(Math.random() *2 ) == 0)? "Tails!" : "Heads!";
}
client.on('message', message => {
 if(message.content.toLowerCase() === "!flip")
    {
        message.channel.send(`I'ts ` + Coinflip() + "!")
    }
    if(message.content.toLowerCase() === "!ping")
{
    const starttime = Date.now()
    message.channel.send(`Here is your ping`)
    .then(msg => {
        const endtime = Date.now()
        msg.edit(`Here is your ping : ${endtime, - starttime}ms`)
    })
}

//-------------
})


console.log('Ready');


client.login(process.env.TOKEN);
