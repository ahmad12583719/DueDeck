self.addEventListener('notificationclick', event => {
  event.notification.close();
  const data = event.notification.data || {};
  event.waitUntil(self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(clients => {
    const client = clients.find(item => 'focus' in item) || clients[0];
    if (client) {
      client.postMessage({type: 'notification-action', action: event.action || 'open', taskId: data.taskId, kind: data.kind});
      return client.focus();
    }
    return self.clients.openWindow('./');
  }));
});
