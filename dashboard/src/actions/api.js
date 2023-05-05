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
  static updateEmail = (body) => (
    _put('/user/email', body)
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

  static pullRubyxData = () => (
    _get('/settings/pull_rubyx_data')
  )

  static getDataRepoUrl = () => (
    _get('/settings/data_repo_url')
  )

  static setDataRepoUrl = (body) => (
    _post('/settings/data_repo_url', body)
  )

  // URLS
  static getUrls = (subdomain, page, resultsPerPage) => (
    _get('/url?subdomain=' + subdomain + '&page=' + page + '&resultsPerPage=' + resultsPerPage)
  )


  // SUBDOMAIN
  static getSubdomains = (page, resultsPerPage) => (
    _get('/subdomain?page=' + page + '&resultsPerPage=' + resultsPerPage)
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


  // VULNERABILITY
  static getVulnerabilities = (page, resultsPerPage) => (
    _get('/vulnerability?page=' + page + '&resultsPerPage=' + resultsPerPage)
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

  // SCAN
  static getScans = () => (
    _get('/scans')
  )

  static createScan = (body) => (
    _post('/scans', body)
  )

  static deleteScan = (id) => (
    _delete(`/scan/${id}`)
  )
  

  // STAT
  static getStats = () => (
    _get('/stats')
  )

  static reloadStats = () => (
    _get('/stats/reload')
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

  // NOTES
  static getNotes = () => (
    _get('/notes')
  )

  static getNotesByProgram = (id) => (
    _get('/notes/program/' + id)
  )

  static createNote = (body) => (
    _post('/notes', body)
  )

  static updateNote = (body) => (
    _put('/notes', body)
  )

  static deleteNote = (id) => (
    _delete(`/notes/${id}`)
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
