import { defineStore } from 'pinia';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useFirebase } from '@/composables/useFirebase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as null | { uid: string; email: string | null },
  }),
  actions: {
    initializeUser() {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          this.user = JSON.parse(storedUser);
        }
      }
    },
    async login(email: string, password: string) {
      const { app } = useFirebase();
      const auth = getAuth(app);
      const result = await signInWithEmailAndPassword(auth, email, password);
      this.user = {
        uid: result.user.uid,
        email: result.user.email,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    },
    async register(email: string, password: string) {
      const { app } = useFirebase();
      const auth = getAuth(app);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      this.user = {
        uid: result.user.uid,
        email: result.user.email,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    },
    async logout() {
      const { app } = useFirebase();
      const auth = getAuth(app);
      await signOut(auth);
      this.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
    async loginWithGoogle() {
      const { app } = useFirebase();
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      this.user = {
        uid: result.user.uid,
        email: result.user.email,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    },
  },
});