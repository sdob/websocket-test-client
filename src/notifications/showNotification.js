export default function showNotification(message) {
  // TODO: this will return immediately on mobiles; we'll need an active
  // service worker to show them notifications
  if (!('Notification' in window)) {
    return;
  }
  // If we haven't received permission to show notifications, then also return
  if (Notification.permission !== 'granted') {
    return;
  }
  const { content, icon } = createContentAndIcon(message);
  // If we have content, then create a notification
  if (content) {
    try {
      return new Notification(content, {
        icon: `https://images.fallenlondon.com/images/icons_small/${icon}.png`,
      });
    } catch (e) {
      return;
    }
  }
}

/**
 * Create a content string and an icon for this notification
 */
export function createContentAndIcon({ type, payload }) {
  // Different types of message should show different types of notification
  switch (type) {
    case 'actions/REFRESH_ACTIONS':
      return {
        icon: 'candle',
        content: `Your actions have refreshed! ${payload}/20`,
      }
    case 'myself/MYSELF_CHANGED':
      return {
        icon: 'boxpurple',
        content: `Your qualities have been updated!`,
      };
    default:
      return {};
  }
}