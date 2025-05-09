import { useAuth } from "../../../contexts/AuthContext";
import "./styleHeader.css";

export default function Header() {
    const { logout } = useAuth();
  
  function backToWelcomePage() {
    logout();
  }
  return (
    <>
      <header className="headerContainer">
        <img src="assets/Nu Kenzie Preto.png" alt="Logo" />
        <button className="btn" onClick={() => backToWelcomePage()}>
          Inicio
        </button>
      </header>
    </>
  );
}
