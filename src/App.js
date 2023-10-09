import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import PropertyState from './context/property/PropertyState';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProperties from './components/UserProperties';


function App() {
  return (
    <>
      <PropertyState>
        <Router>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/userProperties" element={<UserProperties />} />
            </Routes> 
          </div>
        </Router>
      </PropertyState>
    </>
  );
}

export default App;
