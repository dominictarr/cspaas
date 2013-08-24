
var reconnect   = require('reconnect')
//var MuxDemux  = require('mux-demux')
var serializer  = require('stream-serializer')()
var through     = require('through')
var h           = require('hyperscript')

reconnect(function (stream) {
  //incoming
  stream.pipe(serializer(through(function (hash) {
    var url =  window.location.origin+'/'+hash
    console.log('opening:', url)
    document.body.appendChild(
      h('iframe', {src: url})
    )
  }))).pipe(stream)
}).connect('/platform')


