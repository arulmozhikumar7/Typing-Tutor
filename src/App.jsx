import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useStore from "./context/store";
import Navbar from "./layout/Navbar";
import TextInput from "./components/TextInput";
import Countdown from "./components/Countdown";
import Footer from "./layout/Footer";
import { signInWithGoogle } from "./Auth/Authentication";
function App() {
  const { user, setUser, getHighScore } = useStore();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        getHighScore(currentUser.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [setUser, getHighScore]);

  return (
    <div>
      {user ? (
        <>
          <Navbar />
          <TextInput />
          <Countdown />
          <Footer />
        </>
      ) : (
        <>
          <Navbar />
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-3xl font-bold">
              Please Sign In to continue...
            </h1>
            <button
              className="px-5 mt-3 btn btn-accent"
              onClick={signInWithGoogle}
            >
              Sign In
            </button>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
