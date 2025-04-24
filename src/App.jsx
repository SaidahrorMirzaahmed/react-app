import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./MainLayout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>home</div>} />
          <Route path="/forbidden" element={<div>forbidden !!!</div>} />
          <Route path="/addquestion" element={<div>Add question</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
