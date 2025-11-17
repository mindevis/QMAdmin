// import ModuleList from './components/ModuleList';
// import ApiKeyInput from './components/ApiKeyInput';
import Dashboard from "./app/dashboard/main";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./contexts/auth-context";
import { useAuth } from "./hooks/use-auth";
import { AuthPage } from "./app/auth/auth-page";
import { ProfilePage } from "./app/profile/profile-page";

function AppContent() {
  const { isAuthenticated, isLoading, needsProfile } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      {!isAuthenticated ? (
        <AuthPage />
      ) : needsProfile ? (
        <ProfilePage />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
