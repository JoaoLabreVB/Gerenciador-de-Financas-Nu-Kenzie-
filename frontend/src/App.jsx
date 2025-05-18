import "./App.css";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import WelcomePage from "./components/WelcomePage/WelcomePage";
import MainPage from "./components/MainPage/MainPage";

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container">
      {isAuthenticated ? <MainPage /> : <WelcomePage />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}