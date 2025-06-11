// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { useRuntimeConfig } from "#app";

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

  // Firebase アプリを初期化（既に初期化済みの場合は既存のアプリを取得）
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  // Firebase Analytics をクライアントサイドでのみ初期化
  if (import.meta.client && firebaseConfig.measurementId) {
    import("firebase/analytics").then(({ getAnalytics }) => {
      getAnalytics(app);
    });
  }

  return { app };
};
