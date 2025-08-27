// import ModuleList from './components/ModuleList';
// import ApiKeyInput from './components/ApiKeyInput';
import Dashboard from "./app/dashboard/main";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="App">
        <Dashboard />
        {/* <h1>QMAdmin Dashboard</h1>
      <ApiKeyInput />
      <ModuleList /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
