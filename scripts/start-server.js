#!/usr/bin/env babel-node

import which from 'which';
import startServer from '../src/server';
const port = 3000;

try {
  which.sync('mplayer');
} catch(e) {
  console.log('You need mplayer installed on your PATH');
  process.exit();
}

startServer({ port });
