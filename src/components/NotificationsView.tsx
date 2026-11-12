import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCheck } from 'lucide-react';
import { EmptyState } from './ui/primitives';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, navigateToProfile } = useApp();

  return (
    <div className="min-h-screen bg-paper-0 text-ink-800 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-signal-100 text-signal-600 flex items-center justify-center" aria-hidden="true">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink-900">Activity Notifications</h1>
              <p className="text-xs text-ink-400">Updates on your edits, upvotes, and challenge achievements</p>
            </div>
          </div>

          {notifications.length > 0 && (
            <button
              onClick={markAllNotificationsAsRead}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-paper-50 hover:bg-paper-100 text-xs font-bold text-signal-600 border border-ink-100 cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" aria-hidden="true" />
              Mark all read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <EmptyState icon={<Bell className="w-5 h-5" />} title="No notifications yet" description="Likes, comments, follows, and challenge updates will show up here." />
        ) : (
          <ul className="space-y-2 list-none">
            {notifications.map((notif) => (
              <li
                key={notif.id}
                className={`p-4 rounded-md border flex items-start justify-between gap-4 ${
                  notif.isRead ? 'bg-paper-50/50 border-ink-100 text-ink-500' : 'bg-paper-50 border-signal-200 text-ink-800'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button onClick={() => navigateToProfile(notif.actor.username)} className="shrink-0 cursor-pointer rounded-full">
                    <img src={notif.actor.avatar} alt="" className="w-10 h-10 rounded-full object-cover bg-paper-100" />
                  </button>

                  <div>
                    <p className="text-sm font-medium leading-snug">
                      <button
                        onClick={() => navigateToProfile(notif.actor.username)}
                        className="font-bold text-ink-900 hover:text-signal-600 cursor-pointer"
                      >
                        @{notif.actor.username}
                      </button>{' '}
                      {notif.message}
                    </p>
                    <span className="text-[11px] text-ink-300 mt-1 block">{notif.createdAt}</span>
                  </div>
                </div>

                <button
                  onClick={() => markNotificationAsRead(notif.id)}
                  disabled={notif.isRead}
                  className="shrink-0 flex items-center gap-1.5 text-[11px] font-semibold text-ink-400 hover:text-ink-700 disabled:opacity-0 disabled:pointer-events-none cursor-pointer p-2 -m-2"
                >
                  <span className="w-2 h-2 rounded-full bg-signal-600" aria-hidden="true" />
                  Mark read
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
