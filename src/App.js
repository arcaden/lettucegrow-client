import logo from './logo.svg';
import './App.css';
import LoginForm from './components/loginForm';
import RecordTable from './containers/recordTable';
import CreateRecordForm from './components/createRecordForm';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import PodContainer from './containers/podContainer';


function App() {
  return (
    <div className="App">
      <AppProvider>
        <LoginForm />
        <PodContainer />
      </AppProvider>
    </div>
  );
}

export default App;
