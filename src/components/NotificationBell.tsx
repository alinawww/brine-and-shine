import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNotifications } from '../hooks/useNotifications'

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { notifications, unreadCount, readIds, markRead, markAllRead, clearAll } = useNotifications()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} unread` : ''}`}
        style={{
          position: 'relative',
          background: open ? '#2A1A4E' : 'transparent',
          border: '1.5px solid',
          borderColor: open ? '#2A1A4E' : 'rgba(42,26,78,0.2)',
          borderRadius: 999,
          width: 40, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 200ms ease',
          fontSize: 18,
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: -4, right: -4,
            background: '#F4845A',
            color: '#FDF4E3',
            borderRadius: 999,
            minWidth: 18, height: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
            padding: '0 4px',
            border: '2px solid #FDF4E3',
            animation: 'bs-pulse 2s ease infinite',
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          width: 'min(360px, calc(100vw - 32px))',
          maxHeight: 480,
          background: '#FDF4E3',
          borderRadius: 20,
          boxShadow: '0 8px 40px rgba(42,26,78,0.18), 0 2px 0 rgba(42,26,78,0.08)',
          border: '1.5px solid rgba(42,26,78,0.1)',
          overflow: 'hidden',
          zIndex: 200,
          animation: 'bs-fade-in 150ms ease',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(42,26,78,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#2A1A4E',
          }}>
            <span style={{
              fontFamily: '"Bagel Fat One"', fontSize: 18,
              color: '#FDF4E3',
            }}>
              Updates 🫙
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(253,244,227,0.3)',
                    borderRadius: 999,
                    padding: '4px 10px',
                    color: '#FDF4E3',
                    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(253,244,227,0.3)',
                    borderRadius: 999,
                    padding: '4px 10px',
                    color: 'rgba(253,244,227,0.6)',
                    fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Notification list */}
          <div style={{ overflowY: 'auto', maxHeight: 400 }}>
            {notifications.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🫙</div>
                <div style={{
                  fontFamily: '"Bagel Fat One"', fontSize: 18,
                  color: '#2A1A4E', marginBottom: 8,
                }}>
                  All quiet
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: 13,
                  color: '#7A5A9E',
                }}>
                  Start a jar to get fermentation updates
                </div>
              </div>
            ) : (
              notifications.map(notif => {
                const isUnread = !readIds.has(notif.id)
                const isAction = notif.milestone.type === 'action'
                const isReady = notif.milestone.type === 'ready'

                return (
                  <div
                    key={notif.id}
                    onClick={() => markRead(notif.id)}
                    style={{
                      padding: '14px 20px',
                      borderBottom: '1px solid rgba(42,26,78,0.06)',
                      display: 'flex', gap: 12, alignItems: 'flex-start',
                      background: isUnread
                        ? isReady ? 'rgba(168,216,168,0.15)'
                          : isAction ? 'rgba(244,132,90,0.08)'
                          : 'rgba(212,232,66,0.08)'
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'background 200ms ease',
                    }}
                  >
                    {/* Type indicator dot */}
                    <div style={{
                      width: 8, height: 8,
                      borderRadius: '50%',
                      background: isReady ? '#A8D8A8'
                        : isAction ? '#F4845A'
                        : '#D4E842',
                      flexShrink: 0,
                      marginTop: 6,
                    }} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.10em',
                        color: '#7A5A9E', marginBottom: 2,
                      }}>
                        {notif.jarName} · Day {Math.floor(notif.milestone.day)}
                      </div>

                      <div style={{
                        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700,
                        color: '#2A1A4E', marginBottom: 4,
                      }}>
                        {notif.milestone.title}
                      </div>

                      <div style={{
                        fontFamily: 'var(--font-body)', fontSize: 12,
                        color: '#7A5A9E', lineHeight: 1.4,
                      }}>
                        {notif.milestone.desc}
                      </div>

                      {isAction && notif.milestone.action && (
                        <div style={{
                          marginTop: 8,
                          padding: '8px 12px',
                          background: 'rgba(244,132,90,0.12)',
                          borderRadius: 8,
                          borderLeft: '3px solid #F4845A',
                          fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600,
                          color: '#2A1A4E',
                        }}>
                          {notif.milestone.action}
                        </div>
                      )}

                      <Link
                        to={`/jars/${notif.jarId}`}
                        onClick={e => e.stopPropagation()}
                        style={{
                          display: 'inline-block',
                          marginTop: 8,
                          fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                          color: '#2A1A4E',
                          textDecoration: 'underline',
                          textUnderlineOffset: 2,
                        }}
                      >
                        View jar →
                      </Link>
                    </div>

                    {isUnread && (
                      <div style={{
                        width: 6, height: 6,
                        borderRadius: '50%',
                        background: '#F4845A',
                        flexShrink: 0,
                        marginTop: 8,
                      }} />
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
