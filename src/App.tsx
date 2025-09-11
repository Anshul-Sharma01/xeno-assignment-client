import { Route, Router, Routes } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import { lazy, Suspense } from "react";
import XenoLoader from "./components/XenoLoader";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import RequireAuth from "./helpers/RequireAuth";



const HomePage = lazy(() => import("./Pages/HomePage"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const SignIn = lazy(() => import("./Pages/SignIn"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));



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

          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
          </Route>
      </Routes>
    </Suspense>
  )
}

export default App;