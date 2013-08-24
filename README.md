# cspaas

Client Side Platform as a Service

It's a PaaS in your browser!

## Example

```
git clone git:github.com/dominictarr/cspaas.git
cd cspaas
node server.js
open localhost:7000 #open this in a browser
curl -sSNT deployme/hi.html localhost:7000
```


## What? How? Why?

### what

You just did a push deploy into your browser!
your browser is a PaaS!

### how

The main page opens a ws connection, and then when you push
to the server, it messages the page asking it to create iframes.

Then the page creates an iframe by pulling in the code you have pushed.

### why

Because, you should be able to pipe to a graphing system and see a real time graph as easily as piping to grep.

Because, if you have 3 devices, you should be able to update code on them in an instance, and view logs coming back in the next instant.

Because, [the computer revolution hasn't happened yet](http://www.youtube.com/watch?v=oKg1hTOQXoY)

## License

MIT
