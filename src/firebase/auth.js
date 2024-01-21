import { auth, firestore } from '../firebaseConfig';

export const checkUserStatus = (setCurrentUser, setLoadingAuthState) => {
    return auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = firestore.collection('user').doc(user.uid);
        const doc = await userRef.get();
        if (doc.exists && doc.data().role === 'web') {
          setCurrentUser(user);
        } else {
          await auth.signOut();
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoadingAuthState(false);
    });
  };

export const handleLogin = async (email, password, setIsLoggingIn, router) => {
    setIsLoggingIn(true);
    try {
        await auth.signInWithEmailAndPassword(email, password);
        router.push('/dashboard');
    } catch (error) {
        console.error("Error signing in: ", error);
        alert(`Login failed: ${error.message}`);
    }
    setIsLoggingIn(false);
};

export const handleLogout = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error("Error signing out: ", error);
    }
};
