import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import BasicLayout from './layouts/BasicLayout';


function App() {
  return (<BrowserRouter>
    <Routes>
          <Route index element={<Home />} />
          <Route path='xwabout' element={<About />} />
    </Routes>
  </BrowserRouter>)
}

export default App;
