import { Route, Router, Routes } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";


const App : React.FC = () => {
  return(
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/sign-in" element={<SignIn/>} />

    </Routes>
  )
}

export default App;