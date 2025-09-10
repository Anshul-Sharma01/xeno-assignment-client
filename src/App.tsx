import { Route, Router, Routes } from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import HomePage from "./Pages/HomePage";


const App : React.FC = () => {
  return(
    <Routes>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
  )
}

export default App;