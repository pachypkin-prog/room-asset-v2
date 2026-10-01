import { useEffect, useState } from 'react';
import { roomsApi } from '../api/roomsApi';
import { assetsApi } from '../api/assetsApi';
import type { Asset, Room } from '../types/domain';
export function useCatalog() { const [rooms,setRooms]=useState<Room[]>([]); const [assets,setAssets]=useState<Asset[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); useEffect(()=>{Promise.all([roomsApi.getAll(),assetsApi.getAll()]).then(([r,a])=>{setRooms(r);setAssets(a)}).catch(e=>setError(e?.message??'Ошибка загрузки')).finally(()=>setLoading(false));},[]); return {rooms,assets,loading,error}; }
