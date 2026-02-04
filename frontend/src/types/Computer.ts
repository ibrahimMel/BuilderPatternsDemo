// Type qui correspond au modèle Computer du backend
export interface Computer {
  id: string;
  cpu: string;
  gpu: string;
  ram: number;
  storage: number;
  storageType: string;
  operatingSystem: string;
  hasWifi: boolean;
  hasBluetooth: boolean;
  price: number;
  createdAt: string;
}

// Type pour créer un nouveau PC (sans id et createdAt)
export interface ComputerRequest {
  cpu: string;
  gpu: string;
  ram: number;
  storage: number;
  storageType: string;
  operatingSystem: string;
  hasWifi: boolean;
  hasBluetooth: boolean;
  price: number;
}