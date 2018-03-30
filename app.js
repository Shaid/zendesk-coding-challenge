#!/usr/bin/env node

const vorpal = require('vorpal')
const datasets = require('./src/datasets')

const cli = require('./src/cli')
// now, begin!
const app = cli(vorpal, datasets)

app.show()
