(function () {

  var o = /*keyframes*/;

  each(o, function (anim, name) {
    var el = document.getElementById(name)
    each(anim, function (keyframe, num) {
      el.dataset[num] = keyframe
    })
  })

  function each(obj, fn) {
    return Object.keys(obj).forEach(function (key) {
      return fn(obj[key], key)
    })
  }

})()