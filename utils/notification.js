import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const LOCAL_NOTIFICATION_KEY = 'Flashcard:NOTIFICATION_KEY'

const notification = {
  title: 'Challenge yourself!',
  body: "Please don't forget to quiz yourself on any of flashcards!",
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  }
}

const getNextDate = (date=new Date()) => {
  date.setDate(date.getDate() + 1)
  date.setHours(18)
  date.setMinutes(0)
  return date
}

export function setLocalNotif () {
  AsyncStorage.getItem(LOCAL_NOTIFICATION_KEY)
    .then(result => { 
      if (JSON.parse(result) === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let options = {
                date: getNextDate(),
                repeat: 'day',
              }

              Notifications.scheduleLocalNotificationAsync(notification, options)
              AsyncStorage.setItem(LOCAL_NOTIFICATION_KEY, JSON.stringify(options))
            }
          })
      }
    })
}

export const clearLocalNotif = () => {
  return AsyncStorage.removeItem(LOCAL_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}
