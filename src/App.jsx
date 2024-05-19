import React, { useEffect } from "react";
import Countdown from "./components/Countdown";
import TextInput from "./components/TextInput";
const App = () => {
  useEffect(() => {
    console.log("Hello World");
  }, []);
  return (
    <>
      <TextInput />
      <Countdown />
    </>
  );
};

export default App;
