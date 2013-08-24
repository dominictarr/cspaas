
var http         = require('http')
var fs           = require('fs')

var shoe         = require('shoe')
var serializer   = require('stream-serializer')()
var shasum       = require('shasum')
var EventEmitter = require('events').EventEmitter
var through      = require('through')
var bl           = require('bl')

var files = {}

var deploy = new EventEmitter()

var hypervisor = fs.readFileSync(__dirname + '/index.html')

function buffer(cb) {
  var d = ''
  return through(function (b) {
    d += b
  }, function () {
    cb(null, d)
  })
}

shoe(function (stream) {
  //when a client connects, route messages to them.
  console.log('connection')
  var tr = serializer(through())
  tr.pipe(stream)
  deploy.on('deploy', function (hash) {
    tr.queue(hash)
  })
  
}).install(
  http.createServer(
    function (req, res) {
      var hash = req.url.substring(1)
      
      if(req.method == 'PUT' || req.method == 'POST')
        //save this file.
        return req.pipe(buffer(function (err, data) {
          var hash = shasum(data)
          console.log(err, data.toString())
          files[hash] = data.toString()
          deploy.emit('deploy', hash)
          res.end(JSON.stringify({ok: true, created: hash}) + '\n')
        }))
      else if(req.method == 'GET' && files[hash])
        res.end(files[hash])
      else
        res.end(hypervisor)
    }
  )
  .listen(7000),
  '/platform')
