import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Bell, Check, CircleHelp, ClipboardList, Gamepad2,
  LayoutDashboard, LogOut, Menu, MessageCircle, MoreHorizontal, Pencil,
  Search, Settings, ShieldCheck, Trash2, UserPlus, Users, X
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Commerce, commercePages } from './commerce.jsx';
import { DemoLogin } from './demo-login.jsx';
import { canVisit, demoUsers } from './demo-auth.js';

const ROLES = {
  Gerente: { label: 'Gerente', initial: 'G', permissions: ['Gerenciar clientes e produtos', 'Excluir cadastros', 'Gerenciar pedidos e campanhas', 'Ver relatórios', 'Acessar equipe e configurações'] },
  Supervisor: { label: 'Supervisor', initial: 'S', permissions: ['Cadastrar e editar clientes', 'Gerenciar produtos e estoque', 'Gerenciar pedidos e campanhas', 'Ver relatórios'] },
  Atendente: { label: 'Atendente', initial: 'A', permissions: ['Consultar e cadastrar clientes', 'Consultar catálogo e eventos', 'Registrar vendas', 'Fazer pesquisa de jogos'] },
};

const seedClients = [
  { id: 1, name: 'Lucas Andrade', phone: '(11) 98765-4321', email: 'lucas.andrade@email.com', address: 'Rua das Palmeiras, 120 — São Paulo/SP', whatsapp: true, createdAt: '28/09/2026' },
  { id: 2, name: 'Mariana Costa', phone: '(21) 99842-1170', email: 'mariana.costa@email.com', address: 'Av. Atlântica, 880 — Rio de Janeiro/RJ', whatsapp: true, createdAt: '27/09/2026' },
  { id: 3, name: 'Rafael Oliveira', phone: '(31) 99125-6638', email: 'rafael.oliveira@email.com', address: 'Rua da Bahia, 450 — Belo Horizonte/MG', whatsapp: false, createdAt: '26/09/2026' },
  { id: 4, name: 'Camila Santos', phone: '(41) 99932-5050', email: 'camila.santos@email.com', address: 'Rua XV de Novembro, 72 — Curitiba/PR', whatsapp: true, createdAt: '25/09/2026' },
  { id: 5, name: 'Diego Ferreira', phone: '(51) 98644-3021', email: 'diego.ferreira@email.com', address: 'Av. Ipiranga, 1550 — Porto Alegre/RS', whatsapp: false, createdAt: '23/09/2026' },
];

const GAME_CATALOG = [
  { title: 'EA Sports FC 26', genre: 'Esportes', platforms: ['PS5', 'Xbox Series', 'Nintendo Switch'], sales: 98, icon: '⚽' },
  { title: 'Grand Theft Auto V', genre: 'Ação', platforms: ['PS5', 'Xbox Series', 'PC'], sales: 97, icon: '🏙️' },
  { title: 'Minecraft', genre: 'Aventura', platforms: ['PS5', 'Xbox Series', 'Nintendo Switch', 'PC'], sales: 96, icon: '⛏️' },
  { title: 'Mario Kart 8 Deluxe', genre: 'Corrida', platforms: ['Nintendo Switch'], sales: 95, icon: '🏎️' },
  { title: 'Call of Duty: Black Ops 7', genre: 'Tiro', platforms: ['PS5', 'Xbox Series', 'PC'], sales: 94, icon: '🎯' },
  { title: 'The Legend of Zelda: Tears of the Kingdom', genre: 'Aventura', platforms: ['Nintendo Switch'], sales: 91, icon: '🗡️' },
  { title: 'God of War Ragnarök', genre: 'Ação', platforms: ['PS5', 'PC'], sales: 90, icon: '🪓' },
  { title: 'Forza Horizon 5', genre: 'Corrida', platforms: ['Xbox Series', 'PC'], sales: 89, icon: '🏁' },
  { title: 'Marvel’s Spider-Man 2', genre: 'Ação', platforms: ['PS5', 'PC'], sales: 88, icon: '🕷️' },
  { title: 'Red Dead Redemption 2', genre: 'Aventura', platforms: ['PS5', 'Xbox Series', 'PC'], sales: 87, icon: '🤠' },
  { title: 'Elden Ring', genre: 'RPG', platforms: ['PS5', 'Xbox Series', 'PC'], sales: 86, icon: '💍' },
  { title: 'Pokémon Legends: Z-A', genre: 'RPG', platforms: ['Nintendo Switch'], sales: 84, icon: '⚡' },
  { title: 'Cyberpunk 2077', genre: 'RPG', platforms: ['PS5', 'Xbox Series', 'PC'], sales: 82, icon: '🌃' },
  { title: 'Mortal Kombat 1', genre: 'Luta', platforms: ['PS5', 'Xbox Series', 'Nintendo Switch', 'PC'], sales: 81, icon: '🥊' },
  { title: 'Street Fighter 6', genre: 'Luta', platforms: ['PS5', 'Xbox Series', 'PC'], sales: 80, icon: '👊' },
  { title: 'Hogwarts Legacy', genre: 'RPG', platforms: ['PS5', 'Xbox Series', 'Nintendo Switch', 'PC'], sales: 79, icon: '🪄' },
  { title: 'Animal Crossing: New Horizons', genre: 'Simulação', platforms: ['Nintendo Switch'], sales: 77, icon: '🏝️' },
  { title: 'The Sims 4', genre: 'Simulação', platforms: ['PS5', 'Xbox Series', 'PC'], sales: 75, icon: '🏠' },
  { title: 'It Takes Two', genre: 'Aventura', platforms: ['PS5', 'Xbox Series', 'Nintendo Switch', 'PC'], sales: 73, icon: '🧶' },
  { title: 'NBA 2K26', genre: 'Esportes', platforms: ['PS5', 'Xbox Series', 'Nintendo Switch', 'PC'], sales: 72, icon: '🏀' },
  { title: 'Sonic Racing: CrossWorlds', genre: 'Corrida', platforms: ['PS5', 'Xbox Series', 'Nintendo Switch', 'PC'], sales: 70, icon: '💨' },
  { title: 'Tekken 8', genre: 'Luta', platforms: ['PS5', 'Xbox Series', 'PC'], sales: 69, icon: '🔥' },
  { title: 'Valorant', genre: 'Tiro', platforms: ['PS5', 'Xbox Series', 'PC'], sales: 68, icon: '💥' },
  { title: 'Civilization VII', genre: 'Estratégia', platforms: ['PS5', 'Xbox Series', 'Nintendo Switch', 'PC'], sales: 65, icon: '🏛️' },
  { title: 'Football Manager 26', genre: 'Estratégia', platforms: ['PS5', 'Xbox Series', 'Nintendo Switch', 'PC'], sales: 63, icon: '📋' },
];

const emptyForm = { name: '', phone: '', email: '', address: '', whatsapp: false };

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initialValue; }
    catch { return initialValue; }
  });
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue];
}

function Sidebar({ page, setPage, user, onLogout, clientsCount, open, close }) {
  const role = user.role;
  const items = [
    ['dashboard', LayoutDashboard, 'Visão geral'],
    ['clients', Users, 'Clientes'],
    ['survey', Gamepad2, 'Pesquisa de jogos'],
    ...commercePages,
    ['team', ShieldCheck, 'Equipe e acessos'],
    ['history', ClipboardList, 'Histórico'],
    ['settings', Settings, 'Configurações'],
  ];
  return <>
    {open && <button className="overlay" onClick={close} aria-label="Fechar menu" />}
    <aside className={`sidebar ${open ? 'is-open' : ''}`}>
      <div className="brand"><span className="brand-mark"><Gamepad2 size={25} /></span><div><strong>LEVEL<span>UP</span></strong><small>CONSOLES · GAMES · PLAY</small></div></div>
      <nav className="nav nav-pills flex-column">
        <p className="nav-title">GESTÃO DA LOJA</p>
        {items.filter(([id]) => canVisit(role, id)).map(([id, Icon, label]) => <button key={id} className={page === id ? 'active' : ''} onClick={() => { setPage(id); close(); }}><Icon size={19}/><span>{label}</span>{id === 'clients' && <b>{clientsCount}</b>}</button>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="store-status"><i/> LOJA EM OPERAÇÃO</div>
        <div className="support"><CircleHelp size={20}/><div><strong>Central de ajuda</strong><span>Suporte da LevelUp</span></div></div>
        <div className="profile">
          <span className="avatar">{ROLES[role].initial}</span>
          <div><strong>{user.name}</strong><span>{role}</span></div>
          <button className="demo-logout" onClick={onLogout} title="Sair e escolher outra demo" aria-label="Sair"><LogOut size={17}/></button>
        </div>
      </div>
    </aside>
  </>;
}

function Header({ role, openMenu }) {
  return <header className="d-flex align-items-center justify-content-between">
    <button className="mobile-menu" onClick={openMenu}><Menu/></button>
    <div className="header-search input-group"><span className="input-group-text bg-transparent border-0"><Search size={18}/></span><input className="form-control border-0 shadow-none" placeholder="Buscar cliente, telefone..." /></div>
    <div className="header-actions d-flex align-items-center"><span className="role-badge badge"><ShieldCheck size={15}/>{role}</span><button className="icon-button"><Bell size={20}/><i/></button></div>
  </header>;
}

function Dashboard({ clients, onNew, setPage, role }) {
  const allowed = clients.filter(c => c.whatsapp).length;
  const now = new Date();
  const newThisMonth = clients.filter(client => {
    const [day, month, year] = client.createdAt.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
  const recent = clients.slice(0, 4);
  return <main className="container-fluid dashboard-page">
    <section className="store-hero">
      <div className="hero-copy"><span className="hero-kicker">VISÃO DO {role.toUpperCase()}</span><h1>Do balcão para o<br/><em>próximo nível.</em></h1><p>{role === 'Gerente' ? 'Controle a operação, os produtos e os resultados da loja.' : role === 'Supervisor' ? 'Acompanhe vendas, estoque, campanhas e atendimento.' : 'Cadastre clientes, descubra preferências e registre pedidos.'}</p><div className="hero-actions"><button className="btn hero-primary" onClick={onNew}><UserPlus size={18}/>Cadastrar cliente</button><button className="btn hero-secondary" onClick={() => setPage(role === 'Atendente' ? 'sales' : 'reports')}>{role === 'Atendente' ? <Gamepad2 size={18}/> : <ClipboardList size={18}/>} {role === 'Atendente' ? 'Registrar venda' : 'Ver relatórios'}</button></div></div>
      <div className="hero-visual" aria-hidden="true"><span className="hero-disc one"/><span className="hero-disc two"/><div className="console-shape"><i/><i/><b>LEVEL<br/>UP</b><i/><i/></div><span className="hero-sticker">PLAY<br/>MORE!</span></div>
    </section>
    <div className="section-label"><div><span>RESUMO DA LOJA</span><h2>Hoje na LevelUp</h2></div><small>Dados atualizados agora</small></div>
    <section className="row g-3 mb-3">
      <div className="col-12 col-sm-6 col-xl-3"><article className="stat-card card h-100 stat-customers"><div className="stat-icon purple"><Users/></div><div><span>Jogadores cadastrados</span><strong>{clients.length}</strong><small><em>base atual</em></small></div><b className="stat-number">01</b></article></div>
      <div className="col-12 col-sm-6 col-xl-3"><article className="stat-card card h-100 stat-whatsapp"><div className="stat-icon green"><MessageCircle/></div><div><span>Aceitam novidades</span><strong>{allowed}</strong><small>{clients.length ? Math.round(allowed / clients.length * 100) : 0}% da comunidade</small></div><b className="stat-number">02</b></article></div>
      <div className="col-12 col-sm-6 col-xl-3"><article className="stat-card card h-100 stat-new"><div className="stat-icon orange"><UserPlus/></div><div><span>Chegaram este mês</span><strong>{newThisMonth}</strong><small><em>novos cadastros</em></small></div><b className="stat-number">03</b></article></div>
      <div className="col-12 col-sm-6 col-xl-3"><article className="stat-card card h-100 stat-team"><div className="stat-icon blue"><ShieldCheck/></div><div><span>Time na missão</span><strong>06</strong><small>3 níveis de acesso</small></div><b className="stat-number">04</b></article></div>
    </section>
    <section className="row g-3">
      <div className="col-12 col-xl-8"><article className="panel card h-100 customers-panel">
        <div className="panel-title"><div><span className="panel-index">ÚLTIMOS CHECK-INS</span><h2>Quem passou por aqui</h2><p>Clientes cadastrados recentemente</p></div><button className="link-button" onClick={() => setPage('clients')}>Ver todos →</button></div>
        <div className="customer-list">{recent.map(c => <div className="customer-row" key={c.id}><span className="initial">{c.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><div className="customer-main"><strong>{c.name}</strong><span>{c.phone}</span></div><div className={`consent ${c.whatsapp ? 'yes' : 'no'}`}>{c.whatsapp ? <><Check size={13}/>Autorizado</> : <><X size={13}/>Não autorizado</>}</div><span className="date">{c.createdAt}</span><button className="dots"><MoreHorizontal/></button></div>)}</div>
      </article></div>
      <div className="col-12 col-xl-4"><article className="panel card h-100 access-panel">
        <div className="panel-title"><div><span className="panel-index">NOSSO TIME</span><h2>Quem faz acontecer</h2><p>Acessos por função na loja</p></div></div>
        <div className="role-stack">
          <div className="role-row"><span className="role-icon manager"><ShieldCheck/></span><div><strong>Gerente</strong><span>Acesso total ao sistema</span></div><b>2</b></div>
          <div className="role-row"><span className="role-icon supervisor"><Users/></span><div><strong>Supervisor</strong><span>Gestão e relatórios</span></div><b>1</b></div>
          <div className="role-row"><span className="role-icon attendant"><UserPlus/></span><div><strong>Atendente</strong><span>Cadastro e consulta</span></div><b>3</b></div>
        </div>
        {role !== 'Atendente' && <button className="manage" onClick={() => setPage('team')}>Ver equipe e acessos</button>}
      </article></div>
    </section>
    <section className="privacy-note"><ShieldCheck/><div><strong>Respeito também faz parte do jogo.</strong><p>Ofertas pelo WhatsApp só chegam para quem autorizou. O cliente pode mudar de ideia quando quiser.</p></div></section>
  </main>;
}

function Clients({ clients, onNew, onEdit, onDelete, role }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => clients.filter(c => `${c.name} ${c.phone} ${c.email}`.toLowerCase().includes(query.toLowerCase())), [clients, query]);
  return <main className="container-fluid">
    <div className="page-heading d-flex justify-content-between align-items-end"><div><span className="eyebrow">CADASTROS</span><h1>Clientes</h1><p>Consulte e gerencie a base de clientes da loja.</p></div><button className="btn btn-primary primary" onClick={onNew}><UserPlus size={18}/>Novo cliente</button></div>
    <article className="panel card table-panel">
      <div className="table-toolbar"><div className="table-search input-group"><span className="input-group-text bg-transparent border-0"><Search size={18}/></span><input className="form-control border-0 shadow-none" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por nome, telefone ou e-mail"/></div><span className="badge text-bg-light">{filtered.length} clientes</span></div>
      <div className="table-responsive"><table className="table table-hover align-middle mb-0"><thead><tr><th>Cliente</th><th>Contato</th><th>Endereço de correspondência</th><th>WhatsApp</th><th>Cadastro</th><th></th></tr></thead><tbody>
        {filtered.map(c => <tr key={c.id}><td><div className="table-name"><span className="initial">{c.name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span><strong>{c.name}</strong></div></td><td><strong>{c.phone}</strong><small>{c.email || 'Sem e-mail'}</small></td><td>{c.address}</td><td><span className={`consent ${c.whatsapp ? 'yes' : 'no'}`}>{c.whatsapp ? 'Autorizado' : 'Não autorizado'}</span></td><td>{c.createdAt}</td><td><div className="row-actions">{role !== 'Atendente' && <button onClick={() => onEdit(c)} title="Editar"><Pencil size={17}/></button>}{role === 'Gerente' && <button className="danger" onClick={() => onDelete(c)} title="Excluir"><Trash2 size={17}/></button>}</div></td></tr>)}
      </tbody></table></div>
      {!filtered.length && <div className="empty-state"><Search/><h3>Nenhum cliente encontrado</h3><p>Tente buscar usando outro termo.</p></div>}
    </article>
  </main>;
}

function GameSurvey({ clients, surveys, onSave }) {
  const genres = ['Ação', 'Aventura', 'Corrida', 'Esportes', 'Estratégia', 'Luta', 'RPG', 'Simulação', 'Tiro'];
  const [form, setForm] = useState({ clientId: '', platform: '', genres: [], playStyle: '', frequency: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const toggleGenre = genre => setForm(current => ({
    ...current,
    genres: current.genres.includes(genre) ? current.genres.filter(item => item !== genre) : [...current.genres, genre],
  }));

  const submit = event => {
    event.preventDefault();
    if (!form.clientId || !form.platform || !form.genres.length) {
      setError('Selecione o cliente, a plataforma e pelo menos um gênero.');
      return;
    }
    const compatible = GAME_CATALOG.filter(game => game.platforms.includes(form.platform));
    const ranked = [...compatible].sort((a, b) => {
      const aMatch = form.genres.includes(a.genre) ? 1 : 0;
      const bMatch = form.genres.includes(b.genre) ? 1 : 0;
      return bMatch - aMatch || b.sales - a.sales;
    });
    const top = ranked.slice(0, 5);
    const others = ranked.slice(5).sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
    const client = clients.find(item => String(item.id) === form.clientId);
    const generated = { top, others, client, preferences: {...form} };
    setResult(generated);
    setError('');
    onSave({
      id: Date.now(), clientId: client.id, clientName: client.name,
      platform: form.platform, genres: form.genres, playStyle: form.playStyle,
      frequency: form.frequency, recommendations: top.map(game => game.title),
      createdAt: new Date().toLocaleDateString('pt-BR'),
    });
  };

  const reset = () => { setForm({ clientId: '', platform: '', genres: [], playStyle: '', frequency: '' }); setResult(null); setError(''); };

  return <main className="container-fluid">
    <div className="page-heading d-flex justify-content-between align-items-end">
      <div><span className="eyebrow">PREFERÊNCIAS DO CLIENTE</span><h1>Pesquisa de jogos</h1><p>Descubra os gostos do cliente e apresente os títulos com maior potencial de venda.</p></div>
      <span className="survey-counter badge rounded-pill"><ClipboardList size={14}/>{surveys.length} pesquisas salvas</span>
    </div>

    {!result ? <div className="row g-3">
      <div className="col-12 col-xl-8">
        <form className="panel card survey-form" onSubmit={submit}>
          <div className="panel-title"><div><h2>Perfil do jogador</h2><p>Preencha as preferências informadas pelo cliente</p></div><span className="step-badge">1 de 1</span></div>
          <div className="card-body p-4">
            {error && <div className="alert alert-danger py-2 small" role="alert">{error}</div>}
            <div className="row g-3 mb-4">
              <div className="col-md-6"><label className="form-label">Cliente *</label><select className="form-select" value={form.clientId} onChange={e => setForm({...form, clientId: e.target.value})}><option value="">Selecione um cliente</option>{clients.map(client => <option value={client.id} key={client.id}>{client.name}</option>)}</select></div>
              <div className="col-md-6"><label className="form-label">Console ou plataforma principal *</label><select className="form-select" value={form.platform} onChange={e => setForm({...form, platform: e.target.value})}><option value="">Selecione uma plataforma</option><option>PS5</option><option>Xbox Series</option><option>Nintendo Switch</option><option>PC</option></select></div>
            </div>
            <fieldset className="mb-4"><legend>Quais gêneros mais gosta? *</legend><p className="field-help">É possível selecionar mais de uma opção.</p><div className="genre-grid">{genres.map(genre => <button type="button" key={genre} className={`genre-option ${form.genres.includes(genre) ? 'selected' : ''}`} onClick={() => toggleGenre(genre)}><span>{form.genres.includes(genre) && <Check size={14}/>}</span>{genre}</button>)}</div></fieldset>
            <div className="row g-3">
              <div className="col-md-6"><label className="form-label">Como prefere jogar?</label><select className="form-select" value={form.playStyle} onChange={e => setForm({...form, playStyle: e.target.value})}><option value="">Não informado</option><option>Sozinho / campanha</option><option>Online competitivo</option><option>Cooperativo com amigos</option><option>Em família</option></select></div>
              <div className="col-md-6"><label className="form-label">Com que frequência compra jogos?</label><select className="form-select" value={form.frequency} onChange={e => setForm({...form, frequency: e.target.value})}><option value="">Não informado</option><option>Todo mês</option><option>A cada 2 ou 3 meses</option><option>Algumas vezes por ano</option><option>Somente em promoções</option></select></div>
            </div>
          </div>
          <div className="card-footer bg-white border-top d-flex justify-content-end p-3"><button className="btn btn-primary primary px-4" type="submit"><Gamepad2 size={18}/>Gerar lista de jogos</button></div>
        </form>
      </div>
      <div className="col-12 col-xl-4"><aside className="panel card survey-tip h-100"><div className="survey-hero"><Gamepad2 size={36}/></div><div className="card-body p-4"><span className="eyebrow">VENDA CONSULTIVA</span><h2>Recomende melhor.<br/>Venda mais.</h2><p>A pesquisa ajuda sua equipe a entender o perfil do jogador antes de apresentar o catálogo.</p><ul><li><Check/>Sugestões por plataforma</li><li><Check/>Preferências de gênero</li><li><Check/>Top 5 em destaque</li><li><Check/>Catálogo em ordem alfabética</li></ul></div></aside></div>
    </div> : <section className="results-area">
      <div className="result-summary panel card mb-3"><div className="card-body d-flex flex-wrap align-items-center justify-content-between gap-3"><div><span className="eyebrow">LISTA GERADA PARA</span><h2>{result.client.name}</h2><p>{result.preferences.platform} · {result.preferences.genres.join(', ')}</p></div><div className="d-flex gap-2"><button className="btn btn-light" onClick={reset}>Nova pesquisa</button><button className="btn btn-primary primary" onClick={() => window.print()}>Imprimir lista</button></div></div></div>
      <div className="top-heading"><div><span className="trophy">★</span><div><span className="eyebrow">DESTAQUES PARA ESTE PERFIL</span><h2>Top 5 mais vendidos</h2></div></div><p>Ordenados por afinidade e desempenho de vendas</p></div>
      <div className="row g-3 top-games">{result.top.map((game, index) => <div className={index === 0 ? 'col-12 col-lg-4' : 'col-6 col-lg-2'} key={game.title}><article className={`game-card card h-100 rank-${index + 1}`}><span className="rank">#{index + 1}</span><div className="game-art"><span>{game.icon}</span></div><div className="card-body"><span className="game-genre">{game.genre}</span><h3>{game.title}</h3><small>{result.preferences.platform}</small></div></article></div>)}</div>
      {result.others.length > 0 && <article className="panel card other-games mt-4"><div className="panel-title"><div><span className="eyebrow">CATÁLOGO COMPATÍVEL</span><h2>Outros jogos</h2><p>Organizados em ordem alfabética</p></div><span className="badge text-bg-light">{result.others.length} títulos</span></div><div className="row g-0">{result.others.map(game => <div className="col-12 col-md-6 col-xl-4" key={game.title}><div className="other-game"><span className="mini-art">{game.icon}</span><div><strong>{game.title}</strong><small>{game.genre} · {result.preferences.platform}</small></div></div></div>)}</div></article>}
    </section>}
  </main>;
}

function Team({ role }) {
  const people = [['Beatriz Martins','Gerente','BM'],['Carlos Almeida','Gerente','CA'],['Fernanda Lima','Supervisor','FL'],['João Santos','Atendente','JS'],['Ana Souza','Atendente','AS'],['Pedro Rocha','Atendente','PR']];
  return <main className="container-fluid"><div className="page-heading d-flex justify-content-between align-items-end"><div><span className="eyebrow">SEGURANÇA</span><h1>Equipe e acessos</h1><p>Controle quem pode acessar cada função do sistema.</p></div>{role === 'Gerente' && <button className="btn btn-primary primary"><UserPlus size={18}/>Adicionar membro</button>}</div>
    <div className="row g-3 mb-3">{Object.entries(ROLES).map(([name, info]) => <div className="col-12 col-lg-4" key={name}><article className="panel card permission-card h-100"><span className={`role-icon ${name.toLowerCase()}`}><ShieldCheck/></span><h3>{name}</h3><p>{name === 'Gerente' ? 'Controle completo da operação' : name === 'Supervisor' ? 'Acompanhamento da equipe' : 'Atendimento aos clientes'}</p><ul>{info.permissions.map(p => <li key={p}><Check size={14}/>{p}</li>)}</ul></article></div>)}</div>
    <article className="panel card team-list"><div className="panel-title"><div><h2>Membros da equipe</h2><p>6 usuários ativos</p></div></div>{people.map(p => <div className="member" key={p[0]}><span className="initial">{p[2]}</span><div><strong>{p[0]}</strong><span>{p[1]}</span></div><span className="badge rounded-pill active-dot">Ativo</span>{role === 'Gerente' && <button className="dots"><MoreHorizontal/></button>}</div>)}</article>
  </main>;
}

function Placeholder({ page }) {
  const copy = page === 'history' ? ['Histórico', 'As alterações de clientes e consentimentos aparecerão aqui.'] : ['Configurações', 'Personalize os dados e preferências da sua loja.'];
  return <main className="container-fluid"><div className="page-heading"><div><span className="eyebrow">LEVELUP</span><h1>{copy[0]}</h1><p>{copy[1]}</p></div></div><article className="panel card empty-page"><Settings size={38}/><h2>Área em preparação</h2><p>Este módulo já está reservado para a próxima etapa do sistema.</p></article></main>;
}

function ClientModal({ client, onClose, onSave }) {
  const [form, setForm] = useState(client || emptyForm);
  const update = (field, value) => setForm(f => ({...f, [field]: value}));
  const submit = e => { e.preventDefault(); if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) return; onSave(form); };
  return <div className="modal-backdrop show d-block" role="presentation"><section className="modal-dialog modal-dialog-centered"><div className="modal-content"><div className="modal-head modal-header"><div><span className="eyebrow">{client ? 'EDITAR CADASTRO' : 'NOVO CADASTRO'}</span><h2 className="modal-title">{client ? 'Dados do cliente' : 'Cadastrar cliente'}</h2></div><button className="btn-close" aria-label="Fechar" onClick={onClose}></button></div>
    <form onSubmit={submit}><div className="modal-body"><label className="form-label">Nome completo *<input className="form-control" autoFocus value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Ex.: Maria da Silva" required/></label><div className="row g-3"><div className="col-md-6"><label className="form-label w-100">Telefone / WhatsApp *<input className="form-control" value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="(00) 00000-0000" required/></label></div><div className="col-md-6"><label className="form-label w-100">E-mail<input className="form-control" type="email" value={form.email} onChange={e=>update('email',e.target.value)} placeholder="cliente@email.com"/></label></div></div><label className="form-label w-100">Endereço de correspondência *<input className="form-control" value={form.address} onChange={e=>update('address',e.target.value)} placeholder="Rua, número, bairro, cidade/UF" required/></label>
      <label className={`whatsapp-box ${form.whatsapp ? 'checked' : ''}`}><input className="form-check-input" type="checkbox" checked={form.whatsapp} onChange={e=>update('whatsapp',e.target.checked)}/><MessageCircle/><span><strong>Autoriza mensagens via WhatsApp</strong><small>O cliente aceita receber ofertas, novidades e comunicações da loja.</small></span></label>
      <p className="lgpd-copy">Registre esta opção somente após informar ao cliente a finalidade do contato. O consentimento poderá ser revogado a qualquer momento.</p>
      </div><div className="modal-actions modal-footer"><button type="button" className="btn btn-light secondary" onClick={onClose}>Cancelar</button><button type="submit" className="btn btn-primary primary">{client ? 'Salvar alterações' : 'Cadastrar cliente'}</button></div></form>
  </div></section></div>;
}

function Toast({ text }) { return <div className="toast"><Check size={17}/>{text}</div>; }

function App() {
  const [clients, setClients] = usePersistentState('levelup-clients', seedClients);
  const [surveys, setSurveys] = usePersistentState('levelup-game-surveys', []);
  const [user, setUser] = useState(() => demoUsers.find(candidate => candidate.id === sessionStorage.getItem('zetasoft-demo-user')) || null);
  const role = user?.role;
  const [page, setPage] = useState('dashboard');
  const [modal, setModal] = useState(null);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState('');
  const login = selected => { sessionStorage.setItem('zetasoft-demo-user', selected.id); setUser(selected); setPage('dashboard'); };
  const logout = () => { sessionStorage.removeItem('zetasoft-demo-user'); setUser(null); setPage('dashboard'); setModal(null); setMenu(false); };
  const notify = text => { setToast(text); window.setTimeout(() => setToast(''), 2600); };
  const saveClient = form => {
    if (modal && modal.id) { setClients(list => list.map(c => c.id === modal.id ? {...c, ...form} : c)); notify('Cadastro atualizado com sucesso'); }
    else { setClients(list => [{...form, id: Date.now(), createdAt: new Date().toLocaleDateString('pt-BR')}, ...list]); notify('Cliente cadastrado com sucesso'); }
    setModal(null);
  };
  const deleteClient = client => { if (window.confirm(`Excluir o cadastro de ${client.name}?`)) { setClients(list => list.filter(c => c.id !== client.id)); notify('Cadastro excluído'); } };
  const saveSurvey = survey => { setSurveys(list => [survey, ...list]); notify('Pesquisa salva com sucesso'); };
  if (!user) return <DemoLogin onLogin={login}/>;
  const currentPage = canVisit(role, page) ? page : 'dashboard';
  return <div className="app-shell"><Sidebar page={currentPage} setPage={setPage} user={user} onLogout={logout} clientsCount={clients.length} open={menu} close={()=>setMenu(false)}/><div className="workspace"><Header role={role} openMenu={()=>setMenu(true)}/>{currentPage === 'dashboard' && <Dashboard clients={clients} onNew={()=>setModal({})} setPage={setPage} role={role}/>} {currentPage === 'clients' && <Clients clients={clients} onNew={()=>setModal({})} onEdit={setModal} onDelete={deleteClient} role={role}/>} {currentPage === 'survey' && <GameSurvey clients={clients} surveys={surveys} onSave={saveSurvey}/>} {commercePages.some(([id]) => id === currentPage) && <Commerce page={currentPage} clients={clients} role={role}/>} {currentPage === 'team' && <Team role={role}/>} {(currentPage === 'history' || currentPage === 'settings') && <Placeholder page={currentPage}/>}</div>{modal !== null && <ClientModal client={modal.id ? modal : null} onClose={()=>setModal(null)} onSave={saveClient}/>} {toast && <Toast text={toast}/>}</div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
