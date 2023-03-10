import logo from './logo.svg';
import './App.css';
import LoginForm from './components/loginForm';
import RecordTable from './containers/recordTable';
import CreateRecordForm from './components/createRecordForm';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PodContainer from './containers/podContainer';
import RecordTableContainer from './components/recordTableContainer';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/" element={<RecordTableContainer/>} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
