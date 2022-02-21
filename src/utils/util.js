/* 工具类 */
/*
 * 随机数，10位时间戳 连接4位随机整数 e.g. 1428910956 + "" +3482
 * */
export const random14 = () => {
  return `${Math.round(new Date().getTime() / 1000)}${Math.floor(Math.random() * 9000 + 1000)}`
}

/**
 * @summary 千分位数字/金额
 * @param {number} money 数字/金额
 * @param {number} places 小数点位数，places=2 (有则展示，无则不展示)
 * @param {number} forcePlaces 强制保留小数点位数, <=0 为不强制保留（保留places位小数点，当长度没有到forcePlaces时，用0补足）
 * @param {string} sysmbol 货币符号
 * @param {boolean} thousand 是否千分位
 * @returns {string}
 * @example
 *  thousandth(2222.2222) => 2,222.22 // 默认
 *  thousandth(2222.2, 2, 2, '$') => $2,222.20 // 强制保留小数点位数2
 *  thousandth(2222.222, 0) => 2,222 // 不保留小数
 *  thousandth(2222.222, 2, 0, '', false) => 2222.22 // 不千分位
 */
export const thousandth = (money, places = 2, forcePlaces = 0, sysmbol = '', thousand = true) => {
  if (money && !isNaN(money)) {
    money = `${money}`
    const left = money.split('.')[0] // 小数点左边部分
    let right = money.split('.')[1] // 小数点右边
    if (forcePlaces > 0) {
      // 保留forcePlaces位小数点，当长度没有到places时，用0补足。
      right = right ? (right.length >= forcePlaces ? '.' + right.substr(0, forcePlaces) : '.' + right + '0'.repeat(forcePlaces - right.length)) : ('.' + '0'.repeat(forcePlaces))
    } else if (places <= 0) {
      // 不保留小数
      right = ''
    } else {
      // 小数点位数，places=2 (有则展示，无则不展示)
      if (right) {
        right = right.length >= places ? '0.' + right.substr(0, places) : '0.' + right
        // 小数最后一位 为 0 处理
        right = (Number(right) + '')
        right = right.substr(1, right.length)
      } else {
        right = ''
      }
      // right = right ? (right.length >= places ? '.' + right.substr(0, places) : '.' + right) : ''
    }
    if (thousand) {
      // 分割反向转为字符串然后最多3个，最少1个，将匹配的值放进数组返回
      var temp = left.split('').reverse().join('').match(/(\d{1,3})/g)
      // 补齐正负号和货币符号，数组转为字符串，通过逗号分隔，再分割（包含逗号也分割）反向转为字符串变回原来的顺序
      return (Number(money) < 0 ? '-' : '') + sysmbol + temp.join(',').split('').reverse().join('') + right
    } else {
      return left + right
    }
  } else {
    return `${sysmbol}0` + (forcePlaces > 0 ? ('.' + '0'.repeat(forcePlaces)) : '')
  }
}

/**
 * @summary 刻度值
 * @param {int} cormax 最大值
 * @param {int} cormin 最小值
 * @param {int} cornumber 刻度数量
 * @example
 *    degreeStandard(1000, 0, 5); // [0, 200, 400, 600, 800, 100]
 * */
export const degreeStandard = (cormax, cormin, cornumber) => {
  // var tmpmax
  // var tmpmin
  var corstep
  var tmpstep
  var tmpnumber
  var temp
  var extranumber
  if (cormax <= cormin) {
    return
  }
  corstep = (cormax - cormin) / cornumber
  if (Math.pow(10, parseInt(Math.log(corstep) / Math.log(10))) === corstep) {
    temp = Math.pow(10, parseInt(Math.log(corstep) / Math.log(10)))
  } else {
    temp = Math.pow(10, parseInt(Math.log(corstep) / Math.log(10)) + 1)
  }
  tmpstep = (corstep / temp).toFixed(6)
  // 选取规范步长
  if (tmpstep >= 0 && tmpstep <= 0.1) {
    tmpstep = 0.1
  } else if (tmpstep >= 0.100001 && tmpstep <= 0.2) {
    tmpstep = 0.2
  } else if (tmpstep >= 0.200001 && tmpstep <= 0.25) {
    tmpstep = 0.25
  } else if (tmpstep >= 0.250001 && tmpstep <= 0.5) {
    tmpstep = 0.5
  } else {
    tmpstep = 1
  }
  tmpstep = tmpstep * temp
  if (parseInt(cormin / tmpstep) !== cormin / tmpstep) {
    if (cormin < 0) {
      cormin = -1 * Math.ceil(Math.abs(cormin / tmpstep)) * tmpstep
    } else {
      cormin = parseInt(Math.abs(cormin / tmpstep)) * tmpstep
    }
  }
  if (parseInt(cormax / tmpstep) !== cormax / tmpstep) {
    cormax = parseInt(cormax / tmpstep + 1) * tmpstep
  }
  tmpnumber = (cormax - cormin) / tmpstep
  if (tmpnumber < cornumber) {
    extranumber = cornumber - tmpnumber
    tmpnumber = cornumber
    if (extranumber % 2 === 0) {
      cormax = cormax + tmpstep * parseInt(extranumber / 2)
    } else {
      cormax = cormax + tmpstep * parseInt(extranumber / 2 + 1)
    }
    cormin = cormin - tmpstep * parseInt(extranumber / 2)
  }
  cornumber = tmpnumber
  return [cormax, cormin, cornumber]
}

/**
 * @summary charts数据转百分比  补齐100%，支持小数点位数
 * @param {array} data 数据
 * @param {string} opts.field 统计发生的字段（求和，求百分比）
 * @param {string} opts.as 结果存储在的字段
 * @param {int} places 小数点位数，places=2
 * */
export const dataTransPercent = (data, opts, places = 2) => {
  if (!data || data.length <= 0) { return [] }
  // 求和
  let iTotal = 0
  data.map((item) => {
    if (isNaN(item[opts.field])) { item[opts.field] = 0 }
    iTotal += item[opts.field]
  })
  // 四舍五入求 百分小数 的100*10的places次方
  data.map((item) => {
    item[opts.as] = Math.round(item[opts.field] / iTotal * (100 * Math.pow(10, places))) // 10的places次方
  })
  // 最大数值的对象，用于如果百分比有出入则从最大数值中增减
  let oMax = {}
  oMax[opts.as] = 0
  let asTotal = 0
  // 得到四舍五入 乘方后的最大值对象 及 总值
  data.map((item) => {
    if (isNaN(item[opts.as])) { item[opts.as] = 0 }
    if (item[opts.as] > oMax[opts.as]) {
      oMax = item
    }
    asTotal += item[opts.as]
  })
  // 总值有出入则从最大数值中增减
  oMax[opts.as] = oMax[opts.as] + ((100 * Math.pow(10, places)) - asTotal)
  if (places > 0) {
    // 如果小数点位数大于0，则数值项需要 / 10的places次方
    data.map((item) => {
      item[opts.as] = item[opts.as] / Math.pow(10, places)
    })
  }
  return data
}

/**
 * @summary 根据key从对象数组中拿对象
 * @param {array} list 对象数组
 * @param {string} key
 * @param {string} keyName
 * @return {Object} 返回对象 / NULL
 * @example
 */
export const getObjFromArrayByKey = (list, key, keyName) => {
  let _o = null
  if (!list || list.length <= 0) {
    return _o
  }
  for (let i = 0; i < list.length; i++) {
    if (key === list[i][keyName]) {
      _o = list[i]
      break
    }
  }
  return _o
}

/**
 * @summary 根据key从对象数组中拿对象
 * @param {array} list 对象数组
 * @param {string} key
 * @param {string} keyName
 * @param {string} keyName
 * @return {Number|String|Boolean} 返回值 / NULL
 * @example
 */
export const getValFromArrayByKey = (list, key, keyName, valName) => {
  if (!list || list.length <= 0) {
    return null
  }
  let _val = null
  for (let i = 0; i < list.length; i++) {
    if (key === list[i][keyName]) {
      _val = list[i][valName]
      break
    }
  }
  return _val
}

/**
 * @summary 根据时间及格式获取时间的字符串
 * @param {int} iDate 时间
 * @param {string} sFormat 格式，默认：yyyy-MM-dd HH:mm:ss
 * @return {string} 格式化后的日期字符串
 * @example
 *    formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss SSS'); // 2017-6-6 11:11:11
 */
export const formatDate = (iDate, sFormat = 'yyyy-MM-dd HH:mm:ss') => {
  if (!iDate) {
    return ''
  }
  if (typeof iDate === 'string') {
    iDate = iDate.replace(/-/g, '/')
  }
  const dDate = new Date(iDate)
  const year = dDate.getFullYear() // 年
  if (sFormat.indexOf('yyyy') >= 0) {
    sFormat = sFormat.replace('yyyy', year + '')
  }
  if (sFormat.indexOf('yy') >= 0) {
    sFormat = sFormat.replace('yy', (year + '').slice(2, 4))
  }
  if (sFormat.indexOf('MM') >= 0) {
    let month = dDate.getMonth() + 1 // 月
    if (month < 10) {
      month = '0' + month
    }
    sFormat = sFormat.replace('MM', month + '')
  }
  if (sFormat.indexOf('dd') >= 0) {
    let date = dDate.getDate() // 日
    if (date < 10) {
      date = '0' + date
    }
    sFormat = sFormat.replace('dd', date + '')
  }
  if (sFormat.indexOf('HH') >= 0) {
    let hour = dDate.getHours() // 时
    if (hour < 10) {
      hour = '0' + hour
    }
    sFormat = sFormat.replace('HH', hour + '')
  }
  if (sFormat.indexOf('mm') >= 0) {
    let minute = dDate.getMinutes() // 分
    if (minute < 10) {
      minute = '0' + minute
    }
    sFormat = sFormat.replace('mm', minute + '')
  }
  if (sFormat.indexOf('ss') >= 0) {
    let second = dDate.getSeconds() // 秒
    if (second < 10) {
      second = '0' + second
    }
    sFormat = sFormat.replace('ss', second + '')
  }
  if (sFormat.indexOf('SSS') >= 0) {
    const millisecond = dDate.getMilliseconds() // 毫秒
    sFormat = sFormat.replace('SSS', millisecond + '')
  }
  return sFormat
}

/**
 * @summary 该方法用于将有父子关系的数组转换成树形结构的数组
 * @param {Array} data 具有父子关系的数组
 * @param {Object} dataMode 数据模型 dataMode: { id: 'id', pid: 'pid', children: 'children'}
 * @param {Int | String} rootId 根节点ID
 * @return {Array} 树形结构的数组
 */
export const translateDataToTree = (data, dataMode, rootId) => {
  // 没有父节点的数据
  const parents = data.filter(
    value => !value[dataMode.pid] || value[dataMode.pid] === rootId
  )
  // console.log('parents', parents)
  // 有父节点的数据
  const children = data.filter(
    value =>
      value[dataMode.pid] !== undefined &&
      value[dataMode.pid] != null &&
      value[dataMode.pid] !== rootId
  )
  // 定义转换方法的具体实现
  const translator = (parents, children) => {
    // 遍历父节点数据
    parents.forEach(parent => {
      // 遍历子节点数据
      children.forEach((current, index) => {
        // 此时找到父节点对应的一个子节点
        if (current[dataMode.pid] === parent[dataMode.id]) {
          // 对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
          const temp = JSON.parse(JSON.stringify(children))
          // 让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
          temp.splice(index, 1)
          // 让当前子节点作为唯一的父节点，去递归查找其对应的子节点
          translator([current], temp)
          // 把找到子节点放入父节点的children属性中
          typeof parent.children !== 'undefined'
            ? parent.children.push(current)
            : (parent.children = [current])
        }
      })
    })
  }
  // 调用转换方法
  translator(parents, children)
  // 返回最终的结果
  return parents
}

// 截取的字符串
export const substringEllipsis = (str, len, flow = '...') => {
  if (!str) return ''
  str = str.toString()
  var newStr = ''
  var reg = /[\u4e00-\u9fa5]/g
  var strLength = str.replace(reg, '**').length

  if (strLength <= len + (strLength % 2 === 0 ? 2 : 1)) return str

  for (var i = 0, newLength = 0, singleChar; i < strLength; i++) {
    singleChar = str.charAt(i).toString()
    if (singleChar.match(reg) != null) {
      newLength += 2
    } else {
      newLength++
    }
    if (newLength > len) {
      break
    }
    newStr += singleChar
  }

  if (strLength > len) {
    newStr = newStr + flow
  }
  return newStr
}

// EPSG:3857转换经纬度(EPSG:4326)
export const mercatorTolonlat = mercator => {
  var lonlat = {
    x: 0,
    y: 0
  }
  var x = (mercator.x / 20037508.34) * 180
  var y = (mercator.y / 20037508.34) * 180
  y =
    (180 / Math.PI) *
    (2 * Math.atan(Math.exp((y * Math.PI) / 180)) - Math.PI / 2)
  lonlat.x = x
  lonlat.y = y
  return lonlat
}
// 经纬度(EPSG:4326)转换EPSG:3857
export const lonLat2Mercator = lonlat => {
  var mercator = {
    x: 0,
    y: 0
  }
  var earthRad = 6378137.0
  mercator.x = ((lonlat.lng * Math.PI) / 180) * earthRad
  var a = (lonlat.lat * Math.PI) / 180
  mercator.y =
    (earthRad / 2) * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)))
  return mercator
}

export const hexToRgba = (hex, opacity) => {
  let rgbaColor = ''
  const reg = /^#[\da-f]{6}$/i
  if (reg.test(hex)) {
    rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt(
      '0x' + hex.slice(3, 5)
    )},${parseInt('0x' + hex.slice(5, 7))},${opacity})`
  }
  return rgbaColor
}
