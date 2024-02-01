export const copyText = (str: string) => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.value = str
    document.body.appendChild(input)
    input.select()
    if (document.execCommand('copy')) {
      document.execCommand('copy')
      document.body.removeChild(input)
      resolve(true)
    } else {
      reject(new Error('Copy failed'))
    }
  })
}

export const handleOpenUrl = (url: string, isMobile: boolean) => {
  if (isMobile) {
    window.location.href = url
  } else {
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('target', '_blank')
    link.click()
    link.addEventListener('click', () => {
      link.remove()
    })
  }
}

/* 判断客户端 */
export const judgeClient = () => {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // 判断是否是 android终端
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // 判断是否是 iOS终端
  console.log(`是否是Android：${isAndroid}`) // true,false
  console.log(`是否是iOS：${isIOS}`)
  if (isAndroid) {
    return 0
  }
  if (isIOS) {
    return 1
  }
  return 2
}
