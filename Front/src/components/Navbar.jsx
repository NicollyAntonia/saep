import { Link } from "react-router-dom";

export default function Navbar() {
  const nome = localStorage.getItem("usuario") || "Usuário";

  return (
    <nav className="navbar">
      <div className="brand">SAEP</div>
      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/estoque">Estoque</Link>
      </div>
      <div className="user">Olá, {nome}</div>
    </nav>
  );
}
