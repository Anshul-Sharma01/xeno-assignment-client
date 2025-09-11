import { Route, Router, Routes } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Pages/Dashboard";
import { Suspense } from "react";
import XenoLoader from "./components/XenoLoader";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";



const App : React.FC = () => {

  const { isHydrating } = useSelector((state : RootState) => state?.auth);

  if(isHydrating){
    return <XenoLoader/>;
  }

  return(
    <Suspense fallback={<XenoLoader/>}>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </Suspense>
  )
}

export default App;