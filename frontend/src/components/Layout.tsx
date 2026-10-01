import { useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { exportData, importData } from '../api/dataApi';
import { useBookings } from '../hooks/useBookings';
import type { AppData } from '../types/domain';
import { useOutletContext } from 'react-router-dom';

export type LayoutContext = { searchQuery: string };
export function useLayoutContext(){ return useOutletContext<LayoutContext>(); }

export function Layout(){
  const location=useLocation(); const navigate=useNavigate(); const [searchQuery,setSearchQuery]=useState(''); const fileRef=useRef<HTMLInputElement>(null);
  const {bookings}=useBookings();
  const active=(path:string)=>location.pathname.startsWith(path);
  const handleImport=async(e:React.ChangeEvent<HTMLInputElement>)=>{const file=e.target.files?.[0]; if(!file)return; try{const data=JSON.parse(await file.text()) as AppData; await importData(data); alert('Импорт успешен!'); window.location.reload();}catch(err){alert(`Ошибка: ${err instanceof Error?err.message:'?'}`)} e.target.value=''};
  return <div className="app">
    <header className="header"><h1>🏢 Room&Assets Manager</h1><div className="header-controls"><input className="search-input" placeholder="🔍 Поиск..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/><button className="btn btn-primary" onClick={()=>exportData()} title="Скачать данные">📥 Экспорт</button><button className="btn btn-primary" onClick={()=>fileRef.current?.click()} title="Загрузить данные">📤 Импорт</button><input ref={fileRef} type="file" accept=".json,application/json" onChange={handleImport} style={{display:'none'}}/></div></header>
    <nav className="navigation"><Link className={`nav-button ${active('/catalog')?'active':''}`} to="/catalog">🏛️ Ресурсы</Link><Link className={`nav-button ${active('/bookings')?'active':''}`} to="/bookings">📅 Бронирования <span className="badge">{bookings.length}</span></Link><Link className={`nav-button ${active('/bookings/new')||location.pathname.match(/^\/bookings\/[^/]+$/)?'active':''}`} to="/bookings/new">➕ Новая бронь</Link></nav>
    <main className="main-content"><Outlet context={{searchQuery}}/></main>
  </div>
}
