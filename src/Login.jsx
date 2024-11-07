import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import { auth } from './firebase'; // Importa o auth configurado
import { signInWithEmailAndPassword } from 'firebase/auth';
import logo from './assets/hcr-logo.png';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Aqui você já pode usar o `auth` importado de `firebase.js`
      await signInWithEmailAndPassword(auth, email, password);
       navigate('/Dashboard');
      // Login bem-sucedido, redirecione ou faça outra ação
      console.log("Login bem-sucedido");
    } catch (error) {
      // Lidando com erros específicos
      console.log("Erro completo:", error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('Usuário não encontrado. Verifique o e-mail digitado ou cadastre-se.');
          break;
        case 'auth/wrong-password':
          setError('Senha incorreta. Tente novamente.');
          break;
        case 'auth/invalid-email':
          setError('Formato de e-mail inválido. Verifique o e-mail digitado.');
          break;
        case 'auth/invalid-credential':
          setError('Credenciais inválidas. Verifique o e-mail ou a senha.');
          break;
        default:
          setError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para alternar visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-section">
          <img src={logo} alt="HCR Logo" className="logo" />
          <h2>Bem vindo à HCR Intranet <span role="img" aria-label="wave">👋</span></h2>
        </div>
        <div className="form-section">
          <form onSubmit={handleLogin}>
            <label htmlFor="user">Email</label>
            <input
              type="email"
              id="user"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Insira seu email"
            />
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Carregando...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
      <div className="sidebar">
        <h3>Connecting Talent to Opportunities</h3>
        <p>
          Discover endless opportunities on FreelanceConnect, where talented freelancers and businesses unite. Jump right in with us!
        </p>
      </div>
    </div>
  );
}

export default Login;
