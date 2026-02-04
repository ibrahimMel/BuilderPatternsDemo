import type { Computer, ComputerRequest } from '../types/Computer';

// URL de base de l'API backend
const API_URL = 'http://localhost:5052/api/Computer';

// Récupérer tous les PC
export const getAllComputers = async (): Promise<Computer[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

// Créer un PC personnalisé (Builder)
export const buildCustomComputer = async (request: ComputerRequest): Promise<Computer> => {
  const response = await fetch(`${API_URL}/build`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  return response.json();
};

// PC Gaming (Director)
export const getGamingPreset = async (): Promise<Computer> => {
  const response = await fetch(`${API_URL}/presets/gaming`);
  return response.json();
};

// PC Developer (Director)
export const getDeveloperPreset = async (): Promise<Computer> => {
  const response = await fetch(`${API_URL}/presets/developer`);
  return response.json();
};

// PC Office (Director)
export const getOfficePreset = async (): Promise<Computer> => {
  const response = await fetch(`${API_URL}/presets/office`);
  return response.json();
};

// Supprimer un PC
export const deleteComputer = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};