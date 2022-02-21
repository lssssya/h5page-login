/** 
 * @Date: 2022-02-17 14:18:04 
 * @Desc: 通用websocket连接
 * @Param: subscribe 订阅地址
 * @Param: callback  接收数据后的回调
 */
import { onUnmounted, reactive } from 'vue';
import { ajaxCtx } from '@/api/config.js'
import { Toast } from 'vant';

export default function useWebsocket(subscribe, callback) {
  const websocketConfig = reactive({
    websocket: null,
    lockReconnect: false, // websokect 锁
    wsReconnectTimer: null,
    heartBeatTime: 2 * 60 * 1000, // 心跳检测时长
    timer: null // 定时变量
  })
  onUnmounted(() => {
    closeWebsocket
  })
  // 初始化websocket
  const initWebsocket = () => {
    if ('WebSocket' in window) {
      const wsurl = `${location.protocol === 'http:' ? 'ws://' : 'wss://'}${ajaxCtx.socket}${subscribe}`
      console.log('websocket连接地址--', wsurl)
      websocketConfig.websocket = new WebSocket(wsurl)
      websocketConfig.websocket.onopen = () => {
        console.log('WebSocket连接成功')
        clearTimeout(websocketConfig.wsReconnectTimer)
        websocketConfig.wsReconnectTimer = null
        startHeart()
      }
      websocketConfig.websocket.onmessage = async res => {
        const backData = JSON.parse(res.data)
        // 回调处理逻辑
        callback(backData)
      }
      websocketConfig.websocket.onerror = () => {
        reconnectWs()
        Toast.fail('WebSocket连接失败,请刷新当前页面!')
      }
      websocketConfig.websocket.onclose = () => {
        reconnectWs()
      }
    } else {
      Toast('当前环境 Not support websocket')
    }
    // 重连机制
    const reconnectWs = () => {
      if (websocketConfig.lockReconnect) return
      websocketConfig.lockReconnect = true
      initWebsocket(subscribe)
      // 没连接上会一直重连，设置延迟避免请求过多
      websocketConfig.wsReconnectTimer = setTimeout(() => {
        websocketConfig.lockReconnect = false
        reconnectWs()
      }, 10000)
    }
    // 开启心跳
    const startHeart = () => {
      websocketConfig.timer && clearTimeout(websocketConfig.timer)
      websocketConfig.timer = setTimeout(() => {
        // 心跳时间内收不到消息，主动触发连接关闭，开始重连
        websocketConfig.websocket.send(JSON.stringify({ isExit: true }))
      }, websocketConfig.heartBeatTime)
    }
  }

  // 关闭连接
   const closeWebsocket = () => {
    websocketConfig.websocket && websocketConfig.websocket.close()
   }

  return {
    initWebsocket,
    closeWebsocket
  }
}
