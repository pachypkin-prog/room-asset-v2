export type ResourceType = 'room' | 'asset';
export type AssetStatus = 'available' | 'broken' | 'maintenance';
export interface Room { id: string; name: string; capacity: number; features: string[]; }
export interface Asset { id: string; name: string; inventoryCode: string; status: AssetStatus; }
export interface Booking { id: string; resourceType: ResourceType; resourceId: string; title: string; start: string; end: string; notes: string; }
export interface BookingInput { resourceType: ResourceType; resourceId: string; title: string; start: string; end: string; notes: string; }
export interface AppData { rooms: Room[]; assets: Asset[]; bookings: Booking[]; }
