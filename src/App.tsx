import { BrowserRouter, Route, Routes } from 'react-router';
import { PriorizationPage } from './pages/PriorizationPage';
import { WelcomePage } from './pages/WelcomePage';
import { DemographicsPage } from './pages/DemographicsPage';
import { SuccessPage } from './pages/SuccessPage';
import { SamplesPage } from './pages/SamplesPage';

function App() {
  return (
    <div className="py-24 px-36">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/demographics" element={<DemographicsPage />} />
          <Route path="/priorization" element={<PriorizationPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/samples" element={<SamplesPage />} />
          <Route path="*" element={<WelcomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
