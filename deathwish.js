const Discord = require('discord.js');
const client = new Discord.Client();
var request = require("request")
var url = "http://139.99.125.196:31234/players.json"
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {

  const prefix = ".";
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  function lingo(s) {
  
      function add(x, y) {
          var c = 0, r = [];
          var x = x.split('').map(Number);
          var y = y.split('').map(Number);
          while(x.length || y.length) {
              var s = (x.pop() || 0) + (y.pop() || 0) + c;
              r.unshift(s < 10 ? s : s - 10); 
              c = s < 10 ? 0 : 1;
          }
          if(c) r.unshift(c);
          return r.join('');
      }
  
      var dec = '0';
      s.split('').forEach(function(chr) {
          var n = parseInt(chr, 16);
          for(var c = 8; c; c >>= 1) {
              dec = add(dec, dec);
              if(n & c) dec = add(dec, '1');
          }
      });
      return dec;
  }
  
  
  if (command == 'online') {
            request({
          url: url,
          json: true
      }, function (error, response, body) {
          var string ='';
          if (!error && response.statusCode === 200) {
              let entry = body
              console.log(entry.length) // Print the json response

              var sl = 0; var slca = 0; var slmed = 0;var slch = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"]; 
                 if(a.substring(0,10) == 'Death Wish'){
                  sl = sl + 1;
                 }
                 if(a.substring(0,2) == 'CA' || a.substring(0,4) == 'GDCA' || a.substring(0,5) == 'PGDCA' || a.substring(0,6) == 'QUÂN Y' || a.substring(0,4) == 'GĐQY' || a.substring(0,4) == 'QLQY' || a.substring(0,4) == 'QLCA'){
                  slca = slca + 1;
                 }
                 if(a.substring(0,3) == 'MED' || a.substring(0,4) == 'GĐBS' || a.substring(0,5) == 'PGDBS'){
                  slmed = slmed + 1;
                 }
                 if(a.substring(0,2) == 'CH' || a.substring(0,4) == 'GĐCH' || a.substring(0,5) == 'PGĐCH' || a.substring(0,4) == 'QLCH' || a.substring(0,5) == 'PQLCH'){
                  slch = slch + 1;
                 }
              }

              string = string + '```+ Số người đang online Server Bắc Trung Nam: '+ entry.length +'( CA: '+slca+' | MED: '+slmed+' | CH: '+slch+') \n';
              string = string + '+ Danh sách thành viên Death Wish đang online: (SL: '+ sl +') \n';
              var o = 1;
               for (let i=1; i<entry.length; i++) {

                   var a = entry[i]["name"];
                   var b = entry[i]["id"];
                   if(a.substring(0,10) == 'Death Wish'){
                   string = string +"  "+ o +". " + a + " (Id: "+ b +")"+'\n';
                   o = o + 1;
                   }
               }
               string = string + "```";
               message.reply(string);
          }
      })
  }



//========Info Cong An==============

  if (command == 'infoca') {
            request({
          url: url,
          json: true
      }, function (error, response, body) {
          var string ='';
          if (!error && response.statusCode === 200) {
              let entry = body
              console.log(entry.length) // Print the json response

              var slca = 0;var slqy = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                if(a.substring(0,2) == 'CA' || a.substring(0,4) == 'GĐCA' || a.substring(0,5) == 'PGĐCA' || a.substring(0,6) == 'QUÂN Y' || a.substring(0,4) == 'GĐQY' || a.substring(0,4) == 'QLQY' || a.substring(0,4) == 'QLCA'){
                  slca = slca + 1;
                 }
                if(a.substring(0,6) == 'QUÂN Y' || a.substring(0,6) == 'Quân y' || a.substring(0,6) == 'Quân Y' ||  a.substring(0,4) == 'GĐQY' || a.substring(0,4) == 'QLQY'){
                  slqy = slqy + 1;
                }
                var ca = slca - slqy;
              }

         
              string = string + '```+ Số lượng Cớm đang online: '+ slca +' (Công An:'+ca+' | Quân Y:'+slqy+') \n';
              string = string + '+ Danh sách Cớm đang online: \n';
              var o = 1;
               for (let i=1; i<entry.length; i++) {
                   var a = entry[i]["name"];
                   var b = entry[i]["id"];
                   var c = entry[i]["identifiers"][0].substr(6,15);
                   if(a.substring(0,2) == 'CA' || a.substring(0,4) == 'GĐCA' || a.substring(0,5) == 'PGĐCA' || a.substring(0,4) == 'QLCA'){
                   string = string +"  "+ o +". " + a + " (Id: "+ b +")"+'\n';
                   //string = string + '(https://steamcommunity.com/profiles/' + c +')\n';
                   o = o + 1;
                   } 
               }
               for (let i=1; i<entry.length; i++) {
                   var a = entry[i]["name"];
                   var b = entry[i]["id"];
                   var c = entry[i]["identifiers"][0].substr(6,15);
                   if(a.substring(0,6) == 'QUÂN Y' || a.substring(0,6) == 'Quân y' || a.substring(0,6) == 'Quân Y' ||  a.substring(0,4) == 'GĐQY' || a.substring(0,4) == 'QLQY'){
                   string = string +"  "+ o +". " + a + " (Id: "+ b +")"+'\n';
                   //string = string + '(https://steamcommunity.com/profiles/' + c +')\n';
                   o = o + 1;
                   } 
               }
               string = string + "```";
               message.reply(string);
          }
      })
  }






  if (command == 'infolb') {
            request({
          url: url,
          json: true
      }, function (error, response, body) {	
          var string ='';
          if (!error && response.statusCode === 200) {
              let entry = body
              console.log(entry.length) // Print the json response

              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,8) == 'Lưỡi Búa'){
                  sl = sl + 1;
                 }
              }

         
              string = string + '```+ Số lượng thành viên Lưỡi Búa đang online: '+ sl +' \n';
              string = string + '+ Danh sách thành viên Lưỡi Búa đang online: \n';
              var o = 1;
               for (let i=1; i<entry.length; i++) {

                   var a = entry[i]["name"];
                   var b = entry[i]["id"];
                   var c = entry[i]["identifiers"][0].substr(6,15);
                   if(a.substring(0,8) == 'Lưỡi Búa'){
                   string = string +"  "+ o +". " + a + " (Id: "+ b +")"+'\n';
                   string = string + 'https://steamcommunity.com/profiles/' + lingo(c) +'\n';
                   o = o + 1;
                   }
               }
               string = string + "```";
               message.reply(string);
          }
      })
  }



  if (command == 'slgang') {
            request({
          url: url,
          json: true
      }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
              var string = '';
              string = string + 'Số lượng thành viên các Gang đang Online: \n'
              let entry = body
              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,7) == 'Legends'){
                  sl = sl + 1;
                 }
              }
              string = string + '```+ Gang Legends: ' + sl  + '\n';



              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,8) == 'Lưỡi Búa'){
                  sl = sl + 1;
                 }
              }
                string = string + '+ Gang Lưỡi Búa : ' + sl  + '\n';

              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,10) == 'Death Wish'){
                  sl = sl + 1;
                 }
              }
             string = string + '+ Gang Death Wish : ' + sl  + '\n';

              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,6) == 'Bratva'){
                  sl = sl + 1;
                 }
              }
              string = string + '+ Gang Bratva : ' + sl  + '\n';

              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,5) == 'Covid'){
                  sl = sl + 1;
                 }
              }
             string = string + '+ Gang Covid19: ' + sl  + '\n```';
          }
           message.reply(string);
      })
  }




  if (command == 'infobv') {
            request({
          url: url,
          json: true
      }, function (error, response, body) {	
          var string ='';
          if (!error && response.statusCode === 200) {
              let entry = body
              console.log(entry.length) // Print the json response

              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,6) == 'Bratva'){
                  sl = sl + 1;
                 }
              }

         
              string = string + '```+ Số lượng thành viên Bratva đang online: '+ sl +' \n';
              string = string + '+ Danh sách thành viên Bratva đang online: \n';
              var o = 1;
               for (let i=1; i<entry.length; i++) {

                   var a = entry[i]["name"];
                   var b = entry[i]["id"];
                   var c = entry[i]["identifiers"][0].substr(6,15);
                   if(a.substring(0,6) == 'Bratva'){
                   string = string +"  "+ o +". " + a + " (Id: "+ b +")"+'\n';
                   //string = string + '(https://steamcommunity.com/profiles/' + c +')\n';
                   o = o + 1;
                   }
               }
               string = string + "```";
               message.reply(string);
          }
      })
  }




  if (command == 'infolg') {
            request({
          url: url,
          json: true
      }, function (error, response, body) {	
          var string ='';
          if (!error && response.statusCode === 200) {
              let entry = body
              console.log(entry.length) // Print the json response

              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,7) == 'Legends'){
                  sl = sl + 1;
                 }
              }

         
              string = string + '```+ Số lượng thành viên Legends đang online: '+ sl +' \n';
              string = string + '+ Danh sách thành viên Legends đang online: \n';
              var o = 1;
               for (let i=1; i<entry.length; i++) {

                   var a = entry[i]["name"];
                   var b = entry[i]["id"];
                   var c = entry[i]["identifiers"][0].substr(6,15);
                   if(a.substring(0,7) == 'Legends'){
                   string = string +"  "+ o +". " + a + " (Id: "+ b +")"+'\n';
                   //string = string + '(https://steamcommunity.com/profiles/' + c +')\n';
                   o = o + 1;
                   }
               }
               string = string + "```";
               message.reply(string);
          }
      })
  }


  if (command == 'infocv') {
            request({
          url: url,
          json: true
      }, function (error, response, body) {	
          var string ='';
          if (!error && response.statusCode === 200) {
              let entry = body
              console.log(entry.length) // Print the json response

              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,5) == 'Covid'){
                  sl = sl + 1;
                 }
              }

         
              string = string + '```+ Số lượng thành viên Covid19 đang online: '+ sl +' \n';
              string = string + '+ Danh sách thành viên Covid19 đang online: \n';
              var o = 1;
               for (let i=1; i<entry.length; i++) {

                   var a = entry[i]["name"];
                   var b = entry[i]["id"];
                   var c = entry[i]["identifiers"][0].substr(6,15);
                   if(a.substring(0,5) == 'Covid'){
                   string = string +"  "+ o +". " + a + " (Id: "+ b +")"+'\n';
                   string = string + 'https://steamcommunity.com/profiles/' + lingo(c) +'\n';
                   o = o + 1;
                   }
               }
               string = string + "```";
               message.reply(string);
          }
      })
  }



  if (command == 'infomed') {
            request({
          url: url,
          json: true
      }, function (error, response, body) {	
          var string ='';
          if (!error && response.statusCode === 200) {
              let entry = body
              console.log(entry.length) // Print the json response

              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,3) == 'MED' || a.substring(0,4) == 'GĐBS' || a.substring(0,5) == 'PGDBS'){
                  sl = sl + 1;
                 }
              }

         
              string = string + '```+ Số lượng MED đang online: '+ sl +' \n';
              string = string + '+ Danh sách MED đang online: \n';
              var o = 1;
               for (let i=1; i<entry.length; i++) {

                   var a = entry[i]["name"];
                   var b = entry[i]["id"];
                   var c = entry[i]["identifiers"][0].substr(6,15);
                   if(a.substring(0,3) == 'MED' || a.substring(0,4) == 'GĐBS' || a.substring(0,5) == 'PGDBS'){
                   string = string +"  "+ o +". " + a + " (Id: "+ b +")"+'\n';
                   //string = string + '(https://steamcommunity.com/profiles/' + c +')\n';
                   o = o + 1;
                   }
               }
               string = string + "```";
               message.reply(string);
          }
      })
  }

  if (command == 'infoch') {
            request({
          url: url,
          json: true
      }, function (error, response, body) {	
          var string ='';
          if (!error && response.statusCode === 200) {
              let entry = body
              console.log(entry.length) // Print the json response

              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,2) == 'CH' || a.substring(0,4) == 'GĐCH' || a.substring(0,5) == 'PGĐCH' || a.substring(0,4) == 'QLCH' || a.substring(0,5) == 'PQLCH'){
                  sl = sl + 1;
                 }
              }

         
              string = string + '```+ Số lượng CH đang online: '+ sl +' \n';
              string = string + '+ Danh sách CH đang online: \n';
              var o = 1;
               for (let i=1; i<entry.length; i++) {

                   var a = entry[i]["name"];
                   var b = entry[i]["id"];
                   var c = entry[i]["identifiers"][0].substr(6,15);
                   if(a.substring(0,2) == 'CH' || a.substring(0,4) == 'GĐCH' || a.substring(0,5) == 'PGĐCH' || a.substring(0,4) == 'QLCH' || a.substring(0,5) == 'PQLCH'){
                   string = string +"  "+ o +". " + a + " (Id: "+ b +")"+'\n';
                   //string = string + '(https://steamcommunity.com/profiles/' + c +')\n';
                   o = o + 1;
                   }
               }
               string = string + "```";
               message.reply(string);
          }
      })
  }


// Tim ID




if (command == 'id') {
  if(message.member.roles.cache.some(r => r.name === '👑BOSS👑')|| message.member.roles.cache.some(r => r.name === 'Surveyor')){
  if (!args.length) {
    return message.channel.send(`Chưa nhập ID sao tìm má, ${message.author}!`);
  }



request({
          url: url,
          json: true
      }, function (error, response, body) {
          var string ='';
          if (!error && response.statusCode === 200) {
              let entry = body
              console.log(entry.length) // Print the json response
              var o = 1;
               for (let i=1; i<entry.length; i++) {
                    var b = entry[i]["id"];
                    var c = entry[i]["identifiers"][0].substr(6,15);
                    var d = entry[i]["identifiers"][2];
                    if(entry[i]["identifiers"][2]){
                      if(d.substr(0,7)=='discord'){
                        d = '<@'+entry[i]["identifiers"][2].substr(8,18)+'>';
                      }else{
                        d='Người chơi này không mở Discord!';
                      }
                    }else{
                        d='Người chơi này không mở Discord!';
                      }  
               
               	   if(b == `${args}`){
                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Ingame: ' + entry[i]["name"])
                    .setURL('https://steamcommunity.com/profiles/' + lingo(c))
                    .setAuthor('Thông tin người chơi', 'http://www.mediafire.com/convkey/2e14/vfx72x77o00suql7g.jpg')
                    .setDescription('ID: '+entry[i]["id"])
                    .setThumbnail('http://www.mediafire.com/convkey/2e14/vfx72x77o00suql7g.jpg')
                    .addFields(
                    { name: 'Link Steam:', value: 'https://steamcommunity.com/profiles/' + lingo(c) },
                    { name: 'Discord:', value: d },
                  )
                    message.channel.send(exampleEmbed);
                    return;
                  }
               }
               message.channel.send(`Xin lỗi ${message.author} tui không tìm thấy thông tin người này hoặc người này đã offine!`);
          }
      })
    }
  }


  if (command == 'dw') {
    var temp = ''; var a = ''; var b = '';
    a = '```+ Danh sách lệnh BOT Death Wish: \n .id {id}: Tìm thông tin người chơi theo ID \n .online: Danh sách thành viên Death Wish đang online \n .slgang: Xem số lượng thành viên Gang chính thức \n .infoca: Thông tin về công an \n .infomed: Thông tin về MED \n .infoch: Thông tin về Cứu hộ \n .infolb: Thông tin Gang Lưỡi Búa \n .infobv: Thông tin Gang Bratva \n .infolg: Thông tin Gang Legends``` \n';
    b = '```+ Lệnh chế súng: \n .AK: Hướng dẫn chế súng AKM \n .m4: Hướng dẫn chế súng M4 \n .akmini: Hướng dẫn chế súng AK Mini \n .asmg: Hướng dẫn chế súng ASMG```';
    message.reply(a + b);
  }




  
  if( command == 'm4'){
    message.channel.send("Công thức chế súng M4 là:", {files:["./imgs/M4.png"]});
  }
  if(command == "ak"){
    message.channel.send("Công thức chế súng AKM là:", {files:["./imgs/AKM.png"]});
  }
  if(command == "akmini"){
    message.channel.send("Công thức chế súng AK Mini là:", {files:["./imgs/AK_mini.png"]});
  }
  if(command == "asmg"){
    message.channel.send("Công thức chế súng ASMG là:", {files:["./imgs/ASMG.png"]});
  }
  if(command == "logo"){
    message.channel.send("Logo Death Wish", {files:["./imgs/DW_Logo.png"]});
  }


if (command == 'caprole')
if(message.member.roles.cache.some(r => r.name === '👑BOSS👑')|| message.member.roles.cache.some(r => r.name === 'Surveyor')){
user =message.mentions.users.first()
if (!user) return message.reply('`Sai Cú Pháp  !caprole @[tagname]`')

client.users.cache.get(user.id).send('`Bạn đã được cấp role Death Wish`')

message.reply('Đã Thực Thi Lệnh `Thành Công` | Tin nhắn đã được gửi đến **' + user.username + '**')
};

if (command == 'xoarole')
if(message.member.roles.cache.some(r => r.name === '👑BOSS👑')|| message.member.roles.cache.some(r => r.name === 'Surveyor')){
user =message.mentions.users.first()
if (!user) return message.reply('`Sai Cú Pháp  .xoarole @[tagname]`')

client.users.cache.get(user.id).send('`Bạn đã bị xóa role trong game vui lòng thay đôi name tag và liên hệ ban quản lý để được xét Role`')
if (user)
message.reply('Đã Thực Thi Lệnh `Thành Công` | Tin nhắn đã được gửi đến **' + user.username + '**')
};

});


client.login(process.env.BOT_TOKEN);
