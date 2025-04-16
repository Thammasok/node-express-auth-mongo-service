import { Details } from 'express-useragent'

export const detectDevice = (deviceInfo: Details) => {
  if (deviceInfo.isMobile) {
    if (deviceInfo.isiPhone) return 'iPhone'
    if (deviceInfo.isAndroid) return 'Android'
    if (deviceInfo.isTablet) return 'Tablet'
    if (deviceInfo.isiPad) return 'iPad'
  }

  if (deviceInfo.isDesktop) {
    if (deviceInfo.isWindows) return 'Windows'
    if (deviceInfo.isMac) return 'Mac'
    if (deviceInfo.isLinux) return 'Linux'
    if (deviceInfo.isChromeOS) return 'Chrome OS'
  }

  if (deviceInfo.isSmartTV) return 'Smart TV'
  if (deviceInfo.isBot) return `Bot (${deviceInfo.isBot})`

  return 'Unknown Device'
}

export const detectBrowser = (deviceInfo: Details) => {
  if (deviceInfo.isChrome) return 'Chrome'
  if (deviceInfo.isSafari) return 'Safari'
  if (deviceInfo.isFirefox) return 'Firefox'
  if (deviceInfo.isEdge) return 'Edge'
  if (deviceInfo.isIE) return 'IE'
  if (deviceInfo.isIECompatibilityMode) return 'IE Compatibility Mode'
  if (deviceInfo.isOpera) return 'Opera'

  return 'Unknown Browser'
}

// const userAgent = {
//   isYaBrowser: false,
//   isAuthoritative: false,
//   isMobile: false,
//   isMobileNative: false,
//   isTablet: false,
//   isiPad: false,
//   isiPod: false,
//   isiPhone: false,
//   isiPhoneNative: false,
//   isAndroid: false,
//   isAndroidNative: false,
//   isBlackberry: false,
//   isOpera: false,
//   isIE: false,
//   isEdge: false,
//   isIECompatibilityMode: false,
//   isSafari: false,
//   isFirefox: false,
//   isWebkit: false,
//   isChrome: false,
//   isKonqueror: false,
//   isOmniWeb: false,
//   isSeaMonkey: false,
//   isFlock: false,
//   isAmaya: false,
//   isPhantomJS: false,
//   isEpiphany: false,
//   isDesktop: false,
//   isWindows: false,
//   isLinux: false,
//   isLinux64: false,
//   isMac: false,
//   isChromeOS: false,
//   isBada: false,
//   isSamsung: false,
//   isRaspberry: false,
//   isBot: 'postman',
//   isCurl: false,
//   isAndroidTablet: false,
//   isWinJs: false,
//   isKindleFire: false,
//   isSilk: false,
//   isCaptive: false,
//   isSmartTV: false,
//   isUC: false,
//   isFacebook: false,
//   isAlamoFire: false,
//   isElectron: false,
//   silkAccelerated: false,
//   browser: 'PostmanRuntime',
//   version: '7.42.0',
//   os: 'unknown',
//   platform: 'unknown',
//   geoIp: {},
//   source: 'PostmanRuntime/7.42.0',
//   isWechat: false,
// }
