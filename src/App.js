import logo from './logo.svg';
import './App.css';
import LoginForm from './components/loginForm';
import RecordTable from './containers/recordTable';
import CreateRecordForm from './components/createRecordForm';
import { AppProvider } from '@shopify/polaris';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <LoginForm />
        {/* <RecordTable /> */}
        <CreateRecordForm />
      </AppProvider>
    </div>
  );
}

export default App;
