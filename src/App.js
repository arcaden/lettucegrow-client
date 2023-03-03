import logo from './logo.svg';
import './App.css';
import LoginForm from './components/loginForm';
import RecordTable from './containers/recordTable';

function App() {
  return (
    <div className="App">
      <LoginForm />
      <RecordTable />
    </div>
  );
}

export default App;
