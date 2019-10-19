var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

let sessions = {}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method



  /******** 从这里开始看，上面不要看 ************/

  if(path == '/') {
  let string = fs.readFileSync('./index.html', 'utf8')
  let users = fs.readFileSync('./db/users.json', 'utf8')
    users = JSON.parse(users)
  let cookies = ''
  if (request.headers.cookie) {
    cookies = request.headers.cookie.split('; ')
  }
  let hash = {}
  for (let i = 0; i < cookies.length; i++) {
    let parts = cookies[i].split('=');
    let name = parts[0];
    let value = parts[1];
    hash[name] = value;
  }
  let mySession = sessions[hash.sessionId]
  let email
  if (mySession) {
    email = mySession.sign_in_email
  }

  let foundUser
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      foundUser = users[i];
      break;
    }
  }

  if (foundUser) {
    string = string.replace('__password__', foundUser.password)
  } else {
    string = string.replace('__password__', '不知道')
  }

	  response.statusCode = 200
	  response.setHeader('Content-Type', 'text/html;charset=uft-8')
    response.write(string)
    response.end()

  } else if (path === '/sign_up' && method === 'GET') {
	  let string = fs.readFileSync('./sign_up.html', 'utf8')
	  response.statusCode = 200
	  response.setHeader('Content-Type', 'text/html;charset=utf-8')
	  response.write(string)
    response.end()
    
    /********* 从这里开始 **********/
  } else if (path === '/sign_up' && method === 'POST') {                     //注册
    readBody(request).then((body)=>{
      //将body字符串分割为hash
      let hash = {}
      let strings = body.split('&') //分割
      strings.forEach((string)=>{
        let parts = string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
      })
      let {email, password, password_confirmation} = hash

      //开始验证邮箱密码
      if (email.indexOf('@') === -1) {
        response.statusCode = 400
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write('{"errors": {"email": "invalid"}}')
      } else if (password !== password_confirmation) {
        response.statusCode = 400
        response.write('password not match')

        //成功
      }else {
        var users = fs.readFileSync('./db/users.json', 'utf8')
        try {
          users = JSON.parse(users)
        } catch(exception) {
          users = []
        }
        let inUse = false
        for(let i = 0; i < users.length; i++) {
          let user = users[i]
          if (user.email === email) {
            inUse = true
            break;
          }
        }

        //验证邮箱是否注册过
        if (inUse) {
          response.statusCode = 400
          response.write('email is used')
        } else {
          users.push({email: email, password: password})
          var usersString = JSON.stringify(users)
          fs.writeFileSync('./db/users.json', usersString)
          response.statusCode = 200  
        }
      }
      response.end()
    })

    //登录界面
  } else if (path === '/sign_in' && method === 'GET') {
    let string = fs.readFileSync('./sign_in.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_in' && method === 'POST') {                //登录
    readBody(request).then((body)=>{
      //将body字符串分割为hash
      let hash = {}
      let strings = body.split('&') //分割
      strings.forEach((string)=>{
        let parts = string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
      })
      let {email, password} = hash

      var users = fs.readFileSync('./db/users.json', 'utf8')
      try {
        users = JSON.parse(users)
      } catch(exception) {
        users = []
      }

      let found = false
      for(let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
          found = true
          break;
        }
      }
      let sessionId = Math.random() * 100000
      sessions[sessionId] = {sign_in_email: email, password: password}
      console.log(sessions)
      if (found) {
        response.setHeader('Set-Cookie', `sessionId=${sessionId}`)
        response.statusCode = 200
      } else {
        response.statusCode = 401
      }
      response.end()
  })
}	else {
    response.statusCode = 404
    response.end()
  }
  /******** 代码结束，下面不要看 ************/
})


function readBody(request) {
  return new Promise((resolve, reject)=>{
    let body = []; //请求体
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      resolve(body)
    });
  })
}


server.listen(port)
console.log('监听 ' + port + ' 成功\nGracewalk, 请打开 http://localhost:' + port)


