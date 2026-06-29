import { useNotification } from '../stores/NotificationStore';

export default function Notification() {
  const message = useNotification();
  if (!message) {
    return;
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  };

  return (
    <div style={style}>
      {message}
    </div>
  );
}
