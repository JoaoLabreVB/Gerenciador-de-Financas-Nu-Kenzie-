import { useAuth } from "../../contexts/AuthContext";
import './styleWelcomePage.css';  // Ou o nome exato do seu arquivo CSS

export default function WelcomePage() {
  const { login } = useAuth();

  const handleLogin = async () => {
    const result = await login('test@example.com', 'password123');
    if (!result.success) {
      alert(result.error || 'Login failed');
    }
  };

  return (
     <main className="HomePage">
        <aside>
          <div className="conteudos">
            <img
              className="logo"
              src="assets/Nu Kenzie.png"
              alt="Logo Nu Kenzie Branco"
            />
            <h1>Centralize o controle das suas finanças</h1>
            <p className="bordao">de forma rápida e segura</p>
            <button className="button" onClick={() => handleLogin()}>
              Iniciar
            </button>
          </div>
          <div className="divImgIlustracao">
            <img
              className="ilustracao"
              src="assets/illustration.png"
              alt="Ilustração"
            />
          </div>
        </aside>
      </main>
   
  );
}