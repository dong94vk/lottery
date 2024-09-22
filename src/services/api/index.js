/* eslint-disable no-param-reassign */
import axios from 'axios'

import addNotification, { NOTIFICATION_TYPE } from 'src/utils/toast'
import { validateStatus } from 'src/utils/api'
import { API_URL, BASE_URL } from 'src/services/api/constant'

const HEADERS_MULTIPLE_PART = {
  'Content-Type': 'multipart/form-data; boundary=something',
}

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
      if (
        config.url !== API_URL.AUTH.REFRESH_TOKEN &&
        localStorage.getItem('token')
      ) {
        // const token = localStorage.getItem('token')
        const token = localStorage.getItem('token')
        config.headers['Authorization'] = `Bearer ${token}`
        config.headers['lang'] = 'vi'
      }
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
        response?.status === 401 &&
        response.config &&
        !response.config._isRefreshBefore &&
        response.config.url !== API_URL.AUTH.REFRESH_TOKEN &&
        localStorage.getItem('refreshToken')
      ) {
        logout()
      }
      //   return refreshAccessToken()
      //     .then((refresh) => {
      //       if (refresh.status === 200) {
      //         axios.defaults.headers.common['Authorization'] =
      //           refresh.token
      //         localStorage.setItem('token', refresh.token)
      //         localStorage.setItem('refreshToken', refresh.refresh_token)
      //         response.config._isRefreshBefore = true
      //         return instance(response.config)
      //       } else {
      //         logout()
      //       }
      //     })
      //     .catch(() => {
      //       logout()
      //     })
      // } else if (response?.status === 401) {
      //   logout()
      // } else {
      //   addNotification(response?.data?.message, NOTIFICATION_TYPE.ERROR)
      //   return Promise.reject(error)
      // }
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
  localStorage.removeItem('isShowConfirm')
  window.dispatchEvent('removeToken')
}
/**
 *
 * @returns {Promise}
 */
export const refreshAccessToken = () => {
  const refreshToken = localStorage.getItem('refreshToken')
  return instance.get(API_URL.AUTH.REFRESH_TOKEN, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      'x-auth-token': `Bearer ${refreshToken}`,
    },
  })
}

const api = createApi(instance)

export { api }
