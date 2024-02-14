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

  // TASK
  static getTasks = () => (
    _get('/tasks')
  )

  static createTask = (body) => (
    _post('/tasks', body)
  )

  static deleteTask = (id) => (
    _delete(`/task/${id}`)
  )

  // URLS
  static getUrls = (subdomain, page, resultsPerPage, search) => (
    _get('/url?subdomain=' + subdomain + '&page=' + page + '&resultsPerPage=' + resultsPerPage + '&search=' + search)
  )


  // SUBDOMAIN
  static getSubdomains = (page, resultsPerPage, search, program_id, technologies) => (
    _get('/subdomain?page=' + page + '&resultsPerPage=' + resultsPerPage + '&search=' + search + '&program_id=' + program_id + '&technologies=' + technologies)
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
  static getVulnerabilities = (page, resultsPerPage, searchTerm, severity, program) => (
    _get('/vulnerability?page=' + page + '&resultsPerPage=' + resultsPerPage + '&search=' + searchTerm + '&severity=' + severity + '&program_id=' + program)
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

  // STAT
  static getStats = (platform_id) => (
    _get('/stats?platform_id=' + platform_id)
  )

  static reloadStats = (platform_id) => (
    _get('/stats/reload?platform_id=' + platform_id)
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
   static getAllPrograms = () => (
    _get('/programs?all=1')
  )

   static getPrograms = (page, resultsPerPage, search, type, platform_id) => (
    _get('/programs?page=' + (page || 0 ) + '&resultsPerPage=' + (resultsPerPage || 30) + '&search=' + (search || '') + '&type=' + (type || "") + '&platform_id=' + (platform_id || 0))
  )

  static createProgram = (body) => (
    _post('/program', body)
  )

  static updateProgram = (body) => (
    _put('/program', body)
  )

  static deleteProgram = (id) => (
    _delete(`/program/${id}`)
  )

  static reloadPrograms = () => (
    _get('/programs?reload=1')
  )

  static getScope = (id) => (
    _get(`/scope/${id}`)
  )

  static favouriteProgram = (id) => (
    _get(`/program/favourite/${id}`)
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
