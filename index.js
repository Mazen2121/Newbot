const Discord = require('discord.js')
const client = new Discord.Client();
const moment = require('moment')
require('moment-duration-format')
client.login(process.env.TOKEN)

//testing stuff
/*client.on('message', message => 
{
  if(message.content.toLowerCase().startswith("!timer"))
    {   
    let args = message.content.split(" ").slice(1)
    
     if(!message.member.roles.some(r => r.name === "[ Host ]")) return message.reply('You have no permission')

        message.reply(`Timer set for ${args.join(" ")} Seconds..`)
        let timer = args.join(" ");

        if(timer > 90) return message.reply("Please set a timer between 1 and 90 Seconds")
        const clock = setInterval(() => {
            timer--;
            console.log(timer);
            if (timer == 60) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
            if (timer == 45) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
            if (timer == 15) return message.channel.send({embed :{title: timer +  " Seconds Left"}}) 
            if (timer == 7) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
            if (timer == 3) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
            if(timer == 0)
                {
                    clearInterval(clock)
                    message.channel.send({embed :{title: `TIME`}})
                }     
         }, 1000)   
      }
    })
    */
// user info | server info
client.on('message', m =>{
    if(m.content.toLowerCase().startsWith(`!av`))
    {
        const user = m.mentions.users.first()

        if(!user)
        {
            const embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(m.author.username)
            .setTitle(`Here is your avatar!`)
            .setThumbnail(m.author.displayAvatarURL)
            m.reply(embed)
        }
        else if(user)
        {
            const embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(user.tag)
            .setTitle(`Here is ${user.tag}'s Avatar`)
            .setThumbnail(user.displayAvatarURL)
            m.reply(embed)
        }
    }
if(m.content.toLowerCase().startsWith("!userinfo"))
    {
     let member = m.mentions.members.first() || m.member,
     user = member.user;   

      const embed = new Discord.RichEmbed()
      .setAuthor(user.tag,  user.displayAvatarURL)
      .setThumbnail(user.displayAvatarURL)
      .addField(`Username`, user.username)
      .addField(`User id`, user.discriminator)
      .addField(`Created acc at`, moment.utc(m.guild.members.get(user.id).user.createdAt).format(`dddd, MMMM Do YYYY, HH:MM:SS`), true)
      .addField(`Roles`, member.roles.map(r => `${r}`).join(` | `), true)
      .addField(`Joined at`, moment.utc(m.guild.members.get(user.id).user.joinedAt).format(`dddd, MMMM Do YYYY, HH:MM:SS`), true)
      .addField(`Status`, user.presence.status, true)
      .setFooter(`Replying to ${user.tag}`)
      .setColor(`RANDOM`)
      .setTimestamp()
    m.channel.send(embed)
    }
    if(m.content.toLowerCase() === "!serverinfo")
{

    const embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setAuthor(m.guild.name, m.guild.iconURL)
    .setThumbnail(m.guild.iconURL)
    .addField(`Owner of this server`, m.guild.owner.user.tag, true)
    .addField(`Members`, m.guild.memberCount, true)
    .addField(`Bots`, m.guild.members.filter(bot => bot.user.bot === true).size, true)
    .addField(`Online`, m.guild.members.filter(on => on.presence.status != `offline`).size, true)
    .addField(`Created at`, moment.utc(m.guild.createdAt).format(`dddd, MMMM Do YYYY`, true))
    .addField(`Roles`, m.guild.roles.size, true)    
    m.channel.send(embed)
}
if(m.content.toLowerCase() === "!h")
{
    const embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setTitle(`Queue System commands`)
    .setDescription(`\n1.!part Adds you up to the queue for the event\n2.!quit Removes you from the event list\n3.!list shows u the current preforming/next/participants`)
    .addField(`Avatar command`, `!av with or without mentioning someone`)
    .addField(`Coin flip command`, `!flip`)
    .addField('Other Commands','\n1.!userinfo `Shows you your info or the mentioned user`"s information\n2.!serverinfo Shows the server information.')
    .addField(`Moderation commands`, `\n1.!ban @user **reason**\n2.!kick @user\n3.!mute @user\n4.!unmute @user\n5.!unban @user\n6.!purge <amount>`)
    .setThumbnail(`${m.guild.iconURL}`)
    .setTimestamp()
    .setFooter(`Was serving ${m.author.tag}`)
    m.channel.send(embed)
}
})
// when the bot starts
client.on('ready', () => {
    client.user.setActivity(`ZoonCord | !h for help`, { type: 'WATCHING' })
    const server = client.guilds.get('662677595275526154')
    const role = server.roles.get(`662741676934037508`)
    const filtered = server.members.filter(member => !member.roles.has(`662741676934037508`)) 
    filtered.forEach(r => r.addRole(role))      
    })
// part command
var que = [];
var partstart = []
client.on('message', message => 
{
if(partstart)
{
    if(message.content.toLowerCase() === "!part")
    {
        if(que.indexOf(message.author.username) > -1) return message.reply('You are already in queue!')
        else
        {      
            que.push(message.author.username)
            message.reply("You have been added to the queue!")
        }
    }

    if(message.content.toLowerCase() === "!quit")
    {
        if(que.indexOf(message.author.username) === -1) return message.reply("You are not in the queue to quit")
        else
        {
            que.splice(que.indexOf(message.author.username), 1)
            message.reply("You have been removed from the queue!")
        }
    }

    if(message.content.toLowerCase() == '!ec')
    {
        if(!message.member.roles.find(r => r.name === "[ Host ]")) return message.reply("You have no permission to Close queue!")
        partstart = false
        message.reply('Event closed')
    }
}
if(!partstart || partstart)
{

    if(message.content.toLowerCase() == '!eo')
    {
        if(!message.member.roles.find(r => r.name === "[ Host ]")) return message.reply("You have no permission to Close queue!")

        partstart = true;
        message.reply('Event Opened')
    }
    if(message.content.toLowerCase() == "!list")
    {
        let pn = que[0]
        let nxt = que[1]
        let list = new Discord.RichEmbed()
        let msg = '';
        for (let i = 0; i < que.length; i++)
        {
         msg += i + ' ' + que[i] + ' ' + `\n`;
        }
         list.setTitle(`Preforming now : ${pn}`)
         list.setDescription(`Next : ${nxt}`)
         list.addField(`Participants`, ` **:** ${msg}`)
         .setColor(`RANDOM`)
        if(que.length < 0 || pn == undefined) return  message.reply("Queue is empty!")
         message.channel.send(list)
    }
    if(message.content.toLowerCase() == "!s")
    {
        if(!message.member.roles.find(r => r.name === "[ Host ]")) return message.reply("You have no permission to skip!")
        
        message.reply(`${que[0]} has been skipped!`)
        que.unshift(que[1])
        que.pop()
    }
    if(message.content.toLowerCase() === "!next")
    {
        if(!message.member.roles.find(r => r.name === "[ Host ]")) return message.reply("You have no permission to Do that command!")
        message.channel.send(`Removed ${que[0]}`)
        que.shift(que)
    }
}
if(message.content.startsWith("!announce"))
{
    if(!message.member.hasPermission(['ADMINISTRATOR', 'MENTION_EVERYONE'])) return message.reply("You have no permission to do that command!")
    let args = message.content.split(" ").splice(1)
    const embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setAuthor(message.member.user.username + message.member.user.discriminator)
    .addField(`Information`, args.join(" "))
    .setTimestamp()
    .addBlankField()
    .setThumbnail(message.guild.iconURL)
    let channel = message.guild.channels.find(r => r.name === "announcements")
    channel.send(embed)
    channel.send(`<@everyone>`)  
    let commandchannel = message.guild.channels.find(r => r.name === "event-chat")
    commandchannel.send('!eo')
    .catch(err => message.channel.send(`Error ${err.message}`))
}

function Coinflip()
{
    return (Math.floor(Math.random() *2 ) == 0)? "Tails!" : "Heads!";
}
 if(message.content.toLowerCase() === "!flip")
    {
        
        message.channel.send(`I'ts ` + Coinflip() + "!")
    }
})
var judgelist = [];

client.on('message', message => 
{    if(message.content.toLowerCase().startsWith('!add'))
    {
        let args = message.content.split(" ").splice(1)

        if(judgelist.indexOf(args.join(" ")) > -1) 
        {

         message.reply('That participant is already in the judge list!')

        }else {
            judgelist.push(args.slice())
            message.author.send(`Successfully added ${args.join(" ")} To the judge list`)
            console.log(judgelist)
        } 
    }
    if(message.content.toLowerCase() === "showlist")
   {
        let list1 = new Discord.RichEmbed()
        let msg1 = '';
        for (let i = 0; i < judgelist.length; i++)
        {
         msg1 += i + ' ' + judgelist[i].join(" ") + ' ' + `\n`;
        }
         list1.addField(`Participants`, ` **:** ${msg1}`)
         .setColor(`RANDOM`)
        if(judgelist.length < 0) return  message.reply("Queue is empty!")
         message.channel.send(list1)
   }
})
//end of part command
// timer command
let timer = ``
const clock = setInterval(() => {
    timer--;
}, 1000);
client.on("message", message => {
    if(message.content.toLowerCase() == "!tr 90")
      {   

       if(!message.member.roles.some(r => r.name === "[ Host ]")) return message.reply('You have no permission')
       timer = 90;
          message.reply("Timer set for 90 Seconds..")
          const clock = setInterval(() => {
            console.log(timer);
            if (timer == 60) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
            if (timer == 45) return message.channel.send({embed :{title: timer +  " Seconds Left"}}) 
            if (timer == 25) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
            if (timer == 10) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
            if(timer == 0)
                {
                    clearInterval(clock)
                    message.channel.send({embed :{title: `TIME`}})
                }     
          }, 1000) 
          }
      if(message.content.toLowerCase() == "!tr 60")
      {   

       if(!message.member.roles.some(r => r.name === "[ Host ]")) return message.reply('You have no permission')
       timer = 60;
          message.reply("Timer set for 60 Seconds..")
          const clock = setInterval(() => {
            console.log(timer);
            if (timer == 45) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
            if (timer == 25) return message.channel.send({embed :{title: timer +  " Seconds Left"}}) 
            if (timer == 10) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
            if (timer == 5) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
            if(timer == 0)
                {
                    clearInterval(clock)
                    message.channel.send({embed :{title: `TIME`}})
                }     
          }, 1000) 
      
        }
        if(message.content.toLowerCase() == "!tr 30")
        {   
         if(!message.member.roles.some(r => r.name === "[ Host ]")) return message.reply('You have no permission')
    
            message.reply("Timer set for 30 Seconds..")
            timer = 30;
            const clock = setInterval(() => {
                console.log(timer);
                if (timer == 25) return message.channel.send({embed :{title: timer +  " Seconds Left"}}) 
                if (timer == 15) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
                if (timer == 5) return message.channel.send({embed :{title: timer +  " Seconds Left"}})
                if(timer == 0)
                {
                    clearInterval(clock)
                    message.channel.send({embed :{title: `TIME`}})
                }
              }, 1000) 
        
          }
       if(message.content.toLowerCase() === '!tr reset')
       {
           clearInterval(clock)
           timer = 0
       }
});
//end of timer cmd
//Moderation commands
client.on('message', message =>
{
    if(message.author.bot) return
    if (message.content.toLowerCase().startsWith("!purge")) {
        const args = message.content.slice(1).split(" ").slice(1);
        if (!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"]))
            return message.reply('Sorry u have no permission!');
        if (isNaN(args[0]))
            return message.channel.send("Please Provide a number of messages to delete");
        if (!parseInt(args[0]) > 100)
            return message.reply("Please Provide A number between 1-100");
        message.channel.bulkDelete(parseInt(args[0]))
            .then(messages => message.channel.send(`Deleted \`${messages.size}/${args[0]}\` Messages!`))
            .then(msg => msg.delete(5000))
            .catch(err => message.channel.send(`Error moron ${err.message}`));
    }
    if (message.content.includes(`discord.gg/`)) {
        if (!message.member.hasPermissions(['ADMINISTRATOR', 'MANAGE_MESSAGES'])) {
            message.delete()
                .then(msg => msg.reply("Message Deleted \n**Discord invite links are not allowed in this server!**"))
                .then(msg => msg.delete(3000));
        }
        else  return;
    }
    if (message.content.toLowerCase().startsWith('!mute')) {
        if (!message.member.hasPermissions(['ADMINISTRATOR', 'MUTE_MEMBERS']))
            return message.reply("Sorry you have no permission!");
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        let role = message.guild.roles.find(r => r.name === 'MUTED');
        if (!user)
            return message.reply("Please Mention a member to mute!");
        if (user) {
            member.addRole(role);
            message.reply(`Successfully Muted ${user.tag}`)
                .then(msg => msg.delete(5000));
        }
    }
    if (message.content.toLowerCase().startsWith("!unmute")) {
        if (!message.member.hasPermissions(['ADMINISTRATOR', 'MUTE_MEMBERS']))
            return message.reply("Sorry you have no permission!");
        const user = message.mentions.users.first();
        const member = message.guild.member(user);
        let role = message.guild.roles.find(r => r.name === "MUTED");
        if (!user)
            return message.reply("You have to mention someone Who is muted!");
        if (user) {
            member.removeRole(role);
            message.reply(`Successfully unmuted ${user.tag}`);
        }
    }
    if (message.content.toLowerCase().startsWith('!kick')) {
        const user = message.mentions.users.first();
        let reason = message.content.split(" ").slice(2).join(' ');
        if (!message.member.hasPermission(["KICK_MEMBERS"]))
            return message.reply("Sorry you have no permission!");
        if (!user)
            return message.reply('You have to mention a member first!').then(msg => msg.delete(5000));
        if (user || !reason) {
            user.send(`You got kicked from ZoonCord for : ${reason}`).catch(err => message.reply(`Error : ${err.message}`));
            const embed = new Discord.RichEmbed()
                .setColor(`#E73C18`)
                .setTitle(`Kicked : ${user.tag} Succesfully from ZoonCord`)
                .addField(`Kicked at`, `${message.createdAt}`)
                .addField(`Reason`, 'Was kicked for no reason sadly!')
                .addBlankField()
                .setTimestamp();
                let channel = message.guild.channels.find(r => r.name === `log`)
                channel.send(embed)
                channel.reply(embed).then(() => message.guild.member(user).kick())
                .catch(err => message.reply(`ERROR : ${err}`))
            if (user || reason) {
                    user.send(`You got kicked from ZoonCord for : ${reason}`).catch(err => message.reply(`Error : ${err.message}`));
                    const embed = new Discord.RichEmbed()
                        .setColor(`#E73C18`)
                        .setTitle(`Kicked : ${user.tag} Succesfully from ZoonCord`)
                        .addField(`Kicked at`, `${message.createdAt}`)
                        .addField(`Reason`, reason)
                        .addBlankField()
                        .setTimestamp();
                        let channel = message.guild.channels.find(r => r.name === `log`);
                        channel.send(embed)

                        channel.reply(embed).then(() => message.guild.member(user).kick())
                        .catch(err => message.reply(`ERROR : ${err}`))

            }
        }
    }
    if (message.content.toLowerCase().startsWith('!ban')) {
        if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
            return message.reply("Sorry you have no permission");
        const user = message.mentions.users.first();
        let reason = message.content.split(" ").slice(2).join(' ');
        if (!user)
            return message.reply("You need to mention someone!");
        if (user) {
            user.send(`You have been banned from ZoonCord for : ${reason}`).catch(() => {
                message.channel.send('I was not able to dm that user');
            });
            const embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setTitle(`Banned : ${user.tag} Succesfully from ZoonCord`)
                .addField(`Banned at`, `${message.createdAt}`)
                .addField(`Reason`, reason)
                .setTimestamp();
            let channel = message.guild.channels.find(r => r.name === `log`);
            channel.reply(embed).then(() => message.guild.member(user).ban());
        }
    }
    if (message.content.toLowerCase().startsWith('!unban')) {
        const args = message.content.slice().split(' ');
        let bannedmember = args[1];
        if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"]))
            return message.reply("Sorry you have no permission to unban anyone!");
        if (!bannedmember)
            return message.reply('You have to provide an id');
        message.guild.unban(bannedmember);
        message.reply({
        embed: {
            color: 3447003,
            description: `Unbanned \`${bannedmember} From ZoonCord`
        }
        }).then(msg => msg.delete(10000));
        message.member.send(`Here is the invite for ZoonCord : https://discord.gg/Zctv4cf`);
    }
})
// end of moderation commands
// Welcome message / auto role ;d
client.on('guildMemberAdd', member => {
    const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`Welcome to ${member.guild.name} ` + member.displayName)
    .setDescription('Make sure to read the rules to avoid getting Banned!')
    .setThumbnail(member.user.displayAvatarURL)
    .setTimestamp()
    .addBlankField()
    .addField("Support Zoon :d", "Instagram : @zoonattackbbx. Twitter : @AttackZoon. Youtube : ZoonAttack");
    let channel = member.guild.systemChannel
     channel.send(embed)
    let role = member.guild.roles.find(r=> r.name === '| Zoon Gang |')
    member.addRole(role)
})
// end of greeting cmd
console.log('ready')
