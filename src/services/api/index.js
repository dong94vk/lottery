/* eslint-disable no-param-reassign */
import axios from 'axios'

import addNotification, { NOTIFICATION_TYPE } from 'src/utils/toast'
import { validateStatus } from 'src/utils/api'
const BASE_URL = process.env.REACT_APP_HOST
const HEADERS_MULTIPLE_PART = {
  'Content-Type': 'multipart/form-data; boundary=something',
}
const REFRESH_TOKEN_URL = '/v1/auth/token/refresh'

export const createInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      contentType: 'application/json',
      accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })

  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      if (config.url !== REFRESH_TOKEN_URL) {
        // const token = localStorage.getItem('token')
        const token = "zrqz5suG8SPWzaXLS8vsArxZaoHnjx8WFtagkyQEFJzJ2JYGzsEQKFy-GkQy";
        config.headers['Authorization'] = `Bearer ${token}`
        config.headers['lang'] = 'vi'
      }
      // if (config.url !== REFRESH_TOKEN_URL && localStorage.getItem('token')) {
      //   // const token = localStorage.getItem('token')
      //   const token = "zrqz5suG8SPWzaXLS8vsArxZaoHnjx8WFtagkyQEFJzJ2JYGzsEQKFy-GkQy";
      //   config.headers['Authorization'] = `Bearer ${token}`
      //   config.headers['lang'] = 'vi'
      // }
      return config
    },
    function (error) {
      // Các trường hợp lỗi 5xx, 4xx, network xử lý ở đây
      // Do something with request error
      return Promise.reject(error)
    },
  )

  // Add a response interceptor
  instance.interceptors.response.use(
    async function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response
      if (validateStatus(response?.status)) {
        if (response?.config?.getHeaders) {
          return { data: response?.data, header: response?.headers }
        }
        return response.data
      } else if (response?.status === 500) {
        addNotification(
          'Có lỗi xảy ra vui lòng thử lại',
          NOTIFICATION_TYPE.ERROR,
        )
      }
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const response = error.response
      if (
        response?.status === 403 &&
        response.config &&
        !response.config._isRefreshBefore &&
        response.config.url !== REFRESH_TOKEN_URL &&
        localStorage.getItem('refreshToken')
      ) {
        return refreshAccessToken()
          .then((refresh) => {
            if (refresh.statusCode === 200) {
              axios.defaults.headers.common['Authorization'] =
                refresh.data.accessToken
              localStorage.setItem('token', refresh.data.accessToken)
              localStorage.setItem('refreshToken', refresh.data.refreshToken)
              response.config._isRefreshBefore = true
              return instance(response.config)
            } else {
              logout()
            }
          })
          .catch(() => {
            logout()
          })
      } else if (response?.status === 401) {
        logout()
      } else {
        addNotification(response?.data?.message, NOTIFICATION_TYPE.ERROR)
        return Promise.reject(error)
      }
    },
  )

  return instance
}

export const createApi = (instance) => ({
  instance,

  post: (endpoint, params) => {
    return instance
      .post(endpoint, params, {
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },

  postMultiplePart: (endpoint, params) => {
    return instance
      .post(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },

  get: (endpoint, params = {}, options = {}) => {
    return instance
      .get(endpoint, {
        ...options,
        params: params,
        paramsSerializer: (params) => {
          let result = ''
          Object.keys(params).forEach((key) => {
            result += `${key}=${encodeURIComponent(params[key])}&`
          })
          return result.substring(0, result.length - 1)
        },
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },

  put: (endpoint, params) => {
    return instance
      .put(endpoint, params, {
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },

  putMultiplePart: (endpoint, params) => {
    return instance
      .put(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },
  patch: (endpoint, params) => {
    return instance
      .patch(endpoint, params, {
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },

  delete: (endpoint, params) => {
    return instance
      .delete(endpoint, {
        data: params,
        validateStatus: (status) => validateStatus(status),
      })
      .then(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
      .catch(
        (response) => {
          return response
        },
        (err) => {
          return err.response || err
        },
      )
  },
})

const instance = createInstance(BASE_URL)

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  // window.location.href = '/login'
}
/**
 *
 * @returns {Promise}
 */
export const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem('refreshToken')
  return instance.get(REFRESH_TOKEN_URL, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      'x-auth-token': `Bearer ${refreshToken}`,
    },
  })
}

const api = createApi(instance)

export { api }
