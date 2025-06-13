// plugins/firebase.ts or composables/useFirebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { useRuntimeConfig } from '#app';

export const useFirebase = () => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey as string,
    authDomain: config.public.firebaseAuthDomain as string,
    projectId: config.public.firebaseProjectId as string,
    storageBucket: config.public.firebaseStorageBucket as string,
    messagingSenderId: config.public.firebaseMessagingSenderId as string,
    appId: config.public.firebaseAppId as string,
    measurementId: config.public.firebaseMeasurementId as string,
  };

  // Firebase アプリの初期化（既に初期化されていれば再利用）
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  // Firestore インスタンスを取得
  const db = getFirestore(app);

  // Analytics（クライアントサイドのみ）
  if (import.meta.client && firebaseConfig.measurementId) {
    import('firebase/analytics').then(({ getAnalytics }) => {
      getAnalytics(app);
    });
  }

  return { app, db };
};