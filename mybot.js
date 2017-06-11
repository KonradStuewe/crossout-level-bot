const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const AsciiTable = require('ascii-table');

let level = JSON.parse(fs.readFileSync('./level.json', 'utf8'));

client.login(config.token);

client.on('ready', () => {
    console.log('I am ready!');
});

try {

    client.on('message', (message) => {

        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        if (message.content.startsWith(config.prefix + 'register')) {
            let args = message.content.split(' ');
            if (typeof args[1] == 'undefined' || args[1].length > 20) {
                message.channel.send('Too long.')
                return
            }

            if (!level.user['u' + message.author.id]) {
                level.user['u' + message.author.id] = {
                    username: '',
                    levels_EN: 0,
                    levels_LU: 0,
                    levels_NO: 0,
                    levels_SC: 0,
                    levels_SW: 0
                };
            }
            level.user['u' + message.author.id].username = args[1];

            fs.writeFile('./level.json', JSON.stringify(level), (err) => {
                if (err) console.error(err)
            });
            message.channel.send('Registration successful as: *' + args[1] + '*');
        } else

        if (message.content.startsWith(config.prefix + 'level')) {
            if (!level.user['u' + message.author.id]) {
                message.channel.send('Not yet registered. Please register using ```!register <username>```');
                return
            }
            let args = message.content.split(' ');

            if (typeof args[1] == 'undefined' || typeof args[2] == 'undefined' || args[1].length > 20 || args[2].length > 3) {
                message.channel.send('Could not recognize the argument. Please use ```!level <faction> <#>``` to set one level or ```!level <EN#> <LU#> <NO#> <SC#> <SW#>``` to set all levels at once.');
                return
            }

            if (!args[1].match(/^\d+$/)) {
                if (!args[2].match(/^\d+$/)) {
                    message.channel.send('Could not recognize the argument. Please use ```!level <faction> <#>``` to set one level or ```!level <EN#> <LU#> <NO#> <SC#> <SW#>``` to set all levels at once.');
                    return
                } else
                if (args[1] === "EN" || args[1] === "Engineers") {
                    level.user['u' + message.author.id].levels_EN = args[2];
                    message.channel.send('Engineers has been set to: *' + args[2] + '*');
                } else

                if (args[1] === "LU" || args[1] === "Lunatics") {
                    level.user['u' + message.author.id].levels_LU = args[2];
                    message.channel.send('Lunatics has been set to: *' + args[2] + '*');
                } else

                if (args[1] === "NO" || args[1] === "Nomads") {
                    level.user['u' + message.author.id].levels_NO = args[2];
                    message.channel.send('Nomads has been set to: *' + args[2] + '*');
                } else

                if (args[1] === "SC" || args[1] === "Scavengers") {
                    level.user['u' + message.author.id].levels_SC = args[2];
                    message.channel.send('Scavengers has been set to: *' + args[2] + '*');
                } else

                if (args[1] === "SW" || args[1] === "Steppenwolfs") {
                    level.user['u' + message.author.id].levels_SW = args[2];
                    message.channel.send('Steppenwolfs has been set to: *' + args[2] + '*');
                } else {
                    message.channel.send('Could not recognize the argument. Please use ```!level <faction> <#>``` to set one level or ```!level <EN#> <LU#> <NO#> <SC#> <SW#>``` to set all levels at once.');
                }
                fs.writeFile('./level.json', JSON.stringify(level), (err) => {
                    if (err) console.error(err)
                });
                return
            }

            if (args[1].length > 3 || args[2].length > 3 || args[3].length > 3 || args[4].length > 3 || args[5].length > 3) return

            level.user['u' + message.author.id].levels_EN = args[1];
            level.user['u' + message.author.id].levels_LU = args[2];
            level.user['u' + message.author.id].levels_NO = args[3];
            level.user['u' + message.author.id].levels_SC = args[4];
            level.user['u' + message.author.id].levels_SW = args[5];

            message.channel.send('Engineers has been set to: *' + args[1] + '* \r\nLunatics has been set to: *' + args[2] + '* \r\nNomads has been set to: *' + args[3] + '* \r\nScavengers has been set to: *' + args[4] + '* \r\nSteppenwolfs has been set to: *' + args[5] + '*');

            fs.writeFile('./level.json', JSON.stringify(level), (err) => {
                if (err) console.error(err)
            });
        } else

        if (message.content.startsWith(config.prefix + 'ping')) {
            message.channel.send('pong!');
        } else

        if (message.content.startsWith(config.prefix + 'boom')) {
            message.channel.send('*ducks*');
        } else

        if (message.content.startsWith(config.prefix + 'hi')) {
            message.channel.send('Goodbye!');
        } else

        if (message.content.startsWith(config.prefix + 'goodbot')) {
            message.channel.send('Thanks!');
        } else

        if (message.content.startsWith(config.prefix + 'badbot')) {
            message.channel.send('*cowers*');
        } else

        if (message.content.startsWith(config.prefix + 'boo')) {
            message.channel.send('*jumps*');
        } else

        if (message.content.startsWith(config.prefix + 'explode')) {
            message.channel.send('*crashes*');
        } else

        if (message.content.startsWith(config.prefix + 'drong')) {
            message.channel.send('<@142656442707476480> https://cdn.discordapp.com/attachments/322004714285694976/323210021821218826/Drongbot.png');
        } else

        if (message.content.startsWith(config.prefix + 'table')) {
            var userlist = Object.keys(level.user)
            let times = userlist.length;

            var table = new AsciiTable("Crossout Levels")

            table
                .setHeading('User', 'Engineers', 'Lunatics', 'Nomads', 'Scavengers', 'Steppenwolfs');

            for (var i = 0; i < times; i++) {
                table
                    .addRow(level.user[userlist[i]].username, level.user[userlist[i]].levels_EN, level.user[userlist[i]].levels_LU, level.user[userlist[i]].levels_NO, level.user[userlist[i]].levels_SC, level.user[userlist[i]].levels_SW);
            }
            message.channel.send('```' + table + '```');

        } else

        if (message.content.startsWith(config.prefix + 'prefix')) {
            let newPrefix = message.content.split(' ').slice(1, 2)[0];
            config.prefix = newPrefix;

            fs.writeFile('./config.json', JSON.stringify(config), (err) => {
                if (err) console.error(err)
            });
        } else

        if (message.content.startsWith(config.prefix + 'help')) {
            message.channel.send('```!ping``` ```!register <username>``` ```!level <faction> <#>``` or ```!level <EN#> <LU#> <NO#> <SC#> <SW#>``` ```!table```')
        }
    });
} catch (err) {
    console.error(err);
}

//client.on('error', (e) => console.error(e));
//client.on('warn', (e) => console.warn(e));
//client.on('debug', (e) => console.info(e));
