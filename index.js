var TelegramBot = require('node-telegram-bot-api')

// token
var token = '878695737:AAGz-Fu-1041aamdeMSP4oqU9os2t2YcKrE'

//actual telegram information. https://core.telegram.org/bots/api#getupdates
var bot = new TelegramBot(token, { polling: true })

var notes = []

bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id // get sender Id
    var resp = match[1] // get text after /echo
    bot.sendMessage(fromId, resp)
});

bot.onText(/remindme (.+) at (.+)/, function (msg, match) {
    var userId = msg.from.id
    var text = match[1]
    var time = match[2]

    notes.push({ 'uid': userId, 'time': time, 'text': text })

    bot.sendMessage(userId, 'The dark side will devour those who lack the power to control it.')
});

setInterval(function(){
    for (var i = 0; i < notes.length; i++) {
    const curDate = new Date().getHours() + ':' + new Date().getMinutes()
    if (notes[i]['time'] === curDate) {
      bot.sendMessage(notes[i]['uid'], 'Remind you, you should: '+ notes[i]['text'] + ' now for the dark side.')
      notes.splice(i, 1)
    }
  }
}, 1000);

bot.on('message', function (msg) {
    var chatId = msg.chat.id // get chat Id
    var photo = 'YodaSith.jpg';
    bot.sendPhoto(chatId, photo, { caption: 'Sith Yoda' })
});