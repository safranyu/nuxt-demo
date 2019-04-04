(function(doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window
    ? 'orientationchange'
    : 'resize'
  let recalc = function() {
    if (pcOrMobile(window.navigator.userAgent) === 'pc') {
      docEl.setAttribute('pc', '')
      docEl.removeAttribute('mobile', '')
    } else {
      docEl.setAttribute('mobile', '')
      docEl.removeAttribute('pc', '')
    }
  }
  if (!doc.addEventListener) {
    return
  }
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)