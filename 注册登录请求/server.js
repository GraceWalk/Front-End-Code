var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

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
	  response.statusCode = 200
	  response.setHeader('Content-Type', 'text/html;charset=uft-8')
    response.write('Hi\n')
    response.end()
  } else if (path === '/sign_up' && method === 'GET') {
	  let string = fs.readFileSync('./sign_up.html', 'utf8')
	  response.statusCode = 200
	  response.setHeader('Content-Type', 'text/html;charset=utf-8')
	  response.write(string)
	  response.end()
  } else if (path === '/sign_up' && method === 'POST') {
    readBody(request).then((body)=>{
      let hash = {}
      let strings = body.split('&') //分割
      strings.forEach((string)=>{
        let parts = string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = value
      })
      let {email, password, password_confirmation} = hash
      if (email.indexOf('@') === -1) {
        response.statusCode = 400
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write('{"errors": {"email": "invalid"}}')
      } else if (password !== password_confirmation) {
        response.statusCode = 400
        response.write('password not match')
      }else {
        response.statusCode = 200
      }
      response.end()
    })
  }
	else {
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


