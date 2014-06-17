var cssParse = require('css').parse
var fs = require('fs')

var prelude = fs.readFileSync(__dirname + '/prelude.js').toString()

module.exports = skrollrCss
function skrollrCss (css) {

  var style = cssParse(css)

  var o = {}

  style.stylesheet.rules
  .filter(function (rule) {
    return rule.type === 'keyframes'
  })
  .forEach(function (rule) {
    var anim = o[rule.name] = {}
    
    rule.keyframes.forEach(function (keyframe) {
      anim[keyframe.values[0]] = cssStringify(keyframe.declarations)
    })
  })

  var animation = prelude.replace('/*keyframes*/', JSON.stringify(o))
  return animation 
}

function cssStringify(declarations) {
  return declarations.map(function (declaration) {
    return declaration.property + ': ' + declaration.value
  })
  .join(';')
}
