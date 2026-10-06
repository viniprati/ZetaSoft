import React, { useState } from 'react';
import { Gamepad2, LogIn, ShieldCheck } from 'lucide-react';
import { authenticateDemo, demoUsers } from './demo-auth.js';
import './demo-login.css';

export function DemoLogin({ onLogin }) {
  const [email, setEmail] = useState(demoUsers[0].email);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = event => {
    event.preventDefault();
    const user = authenticateDemo(email, password);
    if (!user) { setError('E-mail ou senha de demonstração incorretos.'); return; }
    setError('');
    onLogin(user);
  };
  return <main className="demo-login-page">
    <div className="demo-login-shell">
      <section className="demo-login-intro">
        <span className="demo-login-brand"><Gamepad2 size={26}/> LEVEL<span>UP</span></span>
        <span className="hero-kicker">ZETASOFT · AMBIENTE DE DEMONSTRAÇÃO</span>
        <h1>Uma loja.<br/><em>Três visões.</em></h1>
        <p>Entre com um dos perfis para conhecer as tarefas e permissões de cada função.</p>
        <div className="demo-login-roles">{demoUsers.map(user => <button key={user.id} type="button" className={email === user.email ? 'selected' : ''} onClick={() => { setEmail(user.email); setError(''); }}><strong>{user.role}</strong><span>{user.name}</span><small>{user.email}</small></button>)}</div>
      </section>
      <section className="demo-login-form-wrap"><div className="demo-login-form-card"><span className="eyebrow">ACESSO À DEMO</span><h2>Entrar no painel</h2><p>Use um dos e-mails ao lado. A senha de demonstração é <strong>demo123</strong>.</p><form onSubmit={submit}><label>E-mail<input className="form-control" type="email" required autoComplete="username" value={email} onChange={e => setEmail(e.target.value)}/></label><label>Senha<input className="form-control" type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}/></label>{error && <div className="alert alert-danger py-2 small" role="alert">{error}</div>}<button className="btn btn-primary primary" type="submit"><LogIn size={17}/>Entrar como {demoUsers.find(u => u.email === email)?.role || 'usuário'}</button></form><div className="demo-login-disclaimer"><ShieldCheck size={18}/><span>Os logins demonstram permissões na interface. Dados e senhas continuam locais ao navegador.</span></div></div></section>
    </div>
  </main>;
}
