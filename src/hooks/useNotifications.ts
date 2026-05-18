import { useState, useEffect, useCallback } from 'react'
import { useJars } from './useJars'
import { MILESTONES } from '../data/milestones'

export interface Notification {
  id: string
  jarId: string
  jarName: string
  ingredientId: string
  milestone: {
    day: number
    type: 'fact' | 'action' | 'ready'
    title: string
    desc: string
    action?: string
  }
  triggeredAt: string
  readAt?: string
}

const STORAGE_KEY = 'brineandshine_notifications'
const READ_KEY = 'brineandshine_notifications_read'

function loadNotifications(): Notification[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch { return [] }
}

function loadReadIds(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(READ_KEY) ?? '[]'))
  } catch { return new Set() }
}

function saveNotifications(notifications: Notification[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
}

function saveReadIds(ids: Set<string>) {
  localStorage.setItem(READ_KEY, JSON.stringify([...ids]))
}

export function useNotifications() {
  const { jars } = useJars()
  const [notifications, setNotifications] = useState<Notification[]>(loadNotifications)
  const [readIds, setReadIds] = useState<Set<string>>(loadReadIds)

  const generateNotifications = useCallback(() => {
    const now = new Date()
    const existing = loadNotifications()
    const existingIds = new Set(existing.map(n => n.id))
    const newNotifications: Notification[] = []

    jars
      .filter(jar => jar.status === 'fermenting' || jar.status === 'ready')
      .forEach(jar => {
        const milestones = MILESTONES[jar.ingredient] ?? []
        const startDate = new Date(jar.dateStarted)
        const msPerDay = 1000 * 60 * 60 * 24

        milestones.forEach(milestone => {
          const notifId = `${jar.id}-day${milestone.day}-${milestone.type}`
          if (existingIds.has(notifId)) return

          const daysElapsed = (now.getTime() - startDate.getTime()) / msPerDay

          if (daysElapsed >= milestone.day) {
            newNotifications.push({
              id: notifId,
              jarId: jar.id,
              jarName: jar.name,
              ingredientId: jar.ingredient,
              milestone,
              triggeredAt: now.toISOString(),
            })
          }
        })
      })

    if (newNotifications.length > 0) {
      const updated = [...existing, ...newNotifications]
        .sort((a, b) =>
          new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime()
        )
      saveNotifications(updated)
      setNotifications(updated)
    }
  }, [jars])

  useEffect(() => {
    generateNotifications()
  }, [generateNotifications])

  const markRead = useCallback((notifId: string) => {
    const updated = new Set([...readIds, notifId])
    setReadIds(updated)
    saveReadIds(updated)
  }, [readIds])

  const markAllRead = useCallback(() => {
    const allIds = new Set(notifications.map(n => n.id))
    setReadIds(allIds)
    saveReadIds(allIds)
  }, [notifications])

  const clearAll = useCallback(() => {
    saveNotifications([])
    saveReadIds(new Set())
    setNotifications([])
    setReadIds(new Set())
  }, [])

  const unreadNotifications = notifications.filter(n => !readIds.has(n.id))
  const unreadCount = unreadNotifications.length

  return {
    notifications,
    unreadNotifications,
    unreadCount,
    readIds,
    markRead,
    markAllRead,
    clearAll,
  }
}
