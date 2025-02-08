import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import Prop from './pages/prop';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/valentine" element={<Prop />} />
    </Routes>
  </Router>
  );
}

export default App;