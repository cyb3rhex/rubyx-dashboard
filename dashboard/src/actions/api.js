import { store } from '../store'

export default class API {
  // SESSION
  static logout = () => (
    _delete('/session')
  )
  static login = (body) => (
    _post('/session', body)
  )

  // RESETS
  static reset = (body) => (
    _post('/reset', body)
  )
  static checkReset = (code) => (
    _get(`/reset/${code}`)
  )

  // USER
  static signup = (body) => (
    _post('/user', body)
  )
  static whoami = () => (
    _get('/user')
  )
  static verify = (body) => (
    _post('/user/verify', body)
  )
  static updatePassword = (body) => (
    _put('/user/password', body)
  )

  // SETTINGS
  static getApiKeys = () => (
    _get('/api')
  )

  static createApiKey = () => (
    _post('/api')
  )

  static deleteApiKey = (id) => (
    _delete(`/api/${id}`)
  )

  // STAT
  static getStats = () => (
    _get('/stats')
  )

  static reloadStats = () => (
    _get('/stats/reload')
  )

  // SUBDOMAIN
  static getSubdomains = () => (
    _get('/subdomain')
  )

  static createSubdomain = (body) => (
    _post('/subdomain', body)
  )

  static updateSubdomain = (body) => (
    _put('/subdomain', body)
  )

  static deleteSubdomain = (id) => (
    _delete(`/subdomain/${id}`)
  )

  // IP
  static getIps = () => (
    _get('/ip')
  )

  static createIp = (body) => (
    _post('/ip', body)
  )

  static updateIp = (body) => (
    _put('/ip', body)
  )

  static deleteIp = (id) => (
    _delete(`/ip/${id}`)
  )

  // URL
  static getUrls = () => (
    _get('/url')
  )

  static createUrl = (body) => (
    _post('/url', body)
  )

  static updateUrl = (body) => (
    _put('/url', body)
  )

  static deleteUrl = (id) => (
    _delete(`/url/${id}`)
  )

  // VULNERABILITY
  static getVulnerabilities = () => (
    _get('/vulnerability')
  )

  static createVulnerability = (body) => (
    _post('/vulnerability', body)
  )

  static updateVulnerability = (body) => (
    _put('/vulnerability', body)
  )

  static deleteVulnerability = (id) => (
    _delete(`/vulnerability/${id}`)
  )
  

  // PLATFORM
  static getPlatforms = () => (
    _get('/platform')
  )

  static createPlatform = (body) => (
    _post('/platform', body)
  )

  static updatePlatform = (body) => (
    _put('/platform', body)
  )

  static deletePlatform = (id) => (
    _delete(`/platform/${id}`)
  )

   // PROGRAM
   static getPrograms = () => (
    _get('/program')
  )

  static createProgram = (body) => (
    _post('/program', body)
  )

  static updateProgram = (body) => (
    _put('/program', body)
  )

  static deleteProgram = (id) => (
    _delete(`/program/id/${id}`)
  )

  static reloadPrograms = () => (
    _get('/program/reload')
  )

  static getScope = (id) => (
    _get(`/program/scope/${id}`)
  )
  
}

// internal utils
const _get = (url) => {
  return _fetch('GET', url);
}

const _post = (url, body) => {
  return _fetch('POST', url, body);
}

const _delete = (url) => {
  return _fetch('DELETE', url);
}

const _put = (url, body) => {
  return _fetch('PUT', url, body);
}

const _fetch = (method, url, body) => {
  return fetch(`/api${url}`, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      // CSRF prevention
      // https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet#Use_of_Custom_Request_Headers
      'X-Requested-With': 'XMLHttpRequest',
      'Api-Key': store.getState().user.token
    }
  })
    .then(resp => resp.json())
    .then(result => {
      if (result.error) {
        return Promise.reject(result.error);
      }
      return Promise.resolve(result);
    })
    .catch(error => {
      return Promise.reject(error.toString());
    });
}
