import ModuleList from './components/ModuleList';
import ApiKeyInput from './components/ApiKeyInput';

function App() {
  return (
    <div className="App">
      <h1>QMAdmin Dashboard</h1>
      <ApiKeyInput />
      <ModuleList />
    </div>
  );
}

export default App;
