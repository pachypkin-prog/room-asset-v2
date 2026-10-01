export function toLocalInputValue(iso: string): string { const d = new Date(iso); const pad=(n:number)=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`; }
export function localInputToUtc(value: string): string { return new Date(value).toISOString(); }
export function formatLocal(iso: string): string { return new Intl.DateTimeFormat(undefined,{dateStyle:'short',timeStyle:'short'}).format(new Date(iso)); }
