import http from './httpInstance'

export const getUserInfo = () => {
  return http({
    method: 'get',
    url: 'https://my-json-server.typicode.com/zimplexing/demo/userInfo',
    mode: 'base'
  })
}
