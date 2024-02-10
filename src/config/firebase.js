import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAGtM4KXJIfTm8S27EAgrVuUBcqI5NzPHs",
  authDomain: "recipeapp-a7c6c.firebaseapp.com",
  projectId: "recipeapp-a7c6c",
  storageBucket: "recipeapp-a7c6c.appspot.com",
  messagingSenderId: "263051379316",
  appId: "1:263051379316:web:55838020fe3addf2b1c721",
  measurementId: "G-0BZSFRTESM"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);