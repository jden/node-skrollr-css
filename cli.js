#!/usr/bin/env node
var fs = require('fs')
var concat = require('concat-stream')
var skrollrCss = require('./.')
var watch = require('chokidar').watch
var minimist = require('minimist')
var argv = minimist(process.argv)
var from = require('literal-stream')

function cli(src, dest) {
  src.pipe(concat(function (file) {
    var out = skrollrCss(file.toString())
    from(out).pipe(dest)
      .on('close', function () {
        if (dest !== process.stdout) {
          console.log('build successful')
        }    
      })
    
  }))
  .on('error', function (e) {
    console.error(e)
    process.exit(1)
  })
}

if (argv.v) {
  var package = require('./package.json')
  console.log(package.name, package.version)
  process.exit()
}
else if (argv.h) {
  help()
  process.exit()
}

var srcFile = argv._[2]
var src = srcFile ? fs.createReadStream(srcFile) : process.stdin
var destFile = argv.o
var dest = destFile ? fs.createWriteStream(destFile) : process.stdout
cli(src, dest)

if (argv.w) {
  if (src == process.stdin || dest == process.stdout) {
    console.error('to use with watch, must give source and dest file as argument\n')
    help()
    process.exit()
  }
  watch(srcFile, {persistent: true})
    .on('change', function () {
      cli(fs.createReadStream(srcFile), fs.createWriteStream(destFile))
    })
}

function help() {
  console.log(argv._[1], ' [source file?] [-o out file] [-w watch]')
  console.log('  -v  version')
  console.log('  -h  this help text')
}

if (src == process.stdin) {
  setTimeout(function () {
    if (!process.stdin._readableState.highWaterMark) {
      help()
      process.exit()
    }
  }, 50)
}