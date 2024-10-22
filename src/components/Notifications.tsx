import React from 'react';
import { Notification } from '../types';

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f8f8' }}>
      <h2>Notificaciones</h2>
      {notifications.map((notification) => (
        <div key={notification.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
          <strong>{notification.type === 'low_stock' ? '⚠️ Stock Bajo' : 
                   notification.type === 'expiration' ? '🕒 Próximo a Vencer' : 
                   '🎉 Promoción'}</strong>
          <p>{notification.message}</p>
          <small>{notification.date.toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Notifications;