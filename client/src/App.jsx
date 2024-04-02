import DashPresident from './components/DashPresident'; 
import DashAdmin from './components/DashAdmin';
import {Routes, Route} from 'react-router-dom';

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Routes>
        <Route path="/adminHome" element={<DashAdmin />} />
        <Route path="/presidentHome" element={<DashPresident />} />
      </Routes>
    </div>
  );
}

export default App;
