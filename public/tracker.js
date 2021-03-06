#!/usr/bin/env node

const Server = require('bittorrent-tracker');
const express = require('express')
const app = express()

// https://wiki.theory.org/BitTorrentSpecification#peer_id
const whitelist = {
   UT: true // uTorrent
}

const server = new Server({
   http: false, // we do our own
   udp: false, // not interested
   ws: false, // not interested
   filter: function (params)
   {
      // black/whitelist for disallowing/allowing specific clients [default=allow all]
      // this example only allows the uTorrent client
      const client = params.peer_id[1] + params.peer_id[2]
      return whitelist[client]
   }
})

const onHttpRequest = server.onHttpRequest.bind(server)
app.get('/announce', onHttpRequest)
app.get('/scrape', onHttpRequest)

app.listen(8080)