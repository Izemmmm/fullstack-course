import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  message: '',
  showNotification: (message) => {
    set(() => ({ message }));
    setTimeout(() => set(() => ({ message: '' })), 3000);
  }
}));

export const useShowNotification = () => useNotificationStore(state => state.showNotification);
export const useNotification = () => useNotificationStore(state => state.message);
