self.addEventListener('push', function(event) {
    const options = {
        body: event.data.text(),
        icon: 'ILOGOT.jpeg', // Replace with your logo
        badge: 'thewone.png', // Replace with badge icon
    };
    event.waitUntil(
        self.registration.showNotification('Come back to VGAMES!', options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://vgames1.github.io/') // URL to redirect
    );
});
