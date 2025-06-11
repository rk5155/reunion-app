import { defineStore } from 'pinia';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useFirebase } from '@/composables/useFirebase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { uid: string; email: string | null },
  }),
  actions: {
    async login(email: string, password: string) {
      const { app } = useFirebase();
      const auth = getAuth(app);
      const result = await signInWithEmailAndPassword(auth, email, password);
      this.user = {
        uid: result.user.uid,
        email: result.user.email,
      };
    },
    async logout() {
      const { app } = useFirebase();
      const auth = getAuth(app);
      await signOut(auth);
      this.user = null;
    },
  },
});