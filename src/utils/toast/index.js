import { Store } from 'react-notifications-component'

const NOTIFICATION_DURATION = 3000

export const NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  ERROR: 'danger',
  INFO: 'info',
  WARNING: 'warning',
  CONFLICT: 'conflict',
}

/**
 * Add toast notification
 * @param {string} message
 * @param {string} type Type in NOTIFICATION_TYPE
 * @param {string} title Default is i18n.t("toast.notificationTitle")
 * @param {number} duration Duration in milliseconds
 */
const addNotification = (
  message,
  type = NOTIFICATION_TYPE.INFO,
  title = 'Notification',
  duration = NOTIFICATION_DURATION,
) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'bottom',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeInRight'],
    animationOut: ['animate__animated', 'animate__fadeOutRight'],
    dismiss: {
      duration,
      onScreen: false,
      click: true,
      touch: true,
      showIcon: true,
    },
  })
}

export default addNotification
