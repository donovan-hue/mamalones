import { supabase } from '../supabase';
import type { CargaLogistica } from '../../types/logistica';

// Función para obtener la lista de cargas desde la base de datos
export const obtenerCargas = async (): Promise<CargaLogistica[] | null> => {
  const { data, error } = await supabase
    .from('cargas')
    .select('*');
    
  if (error) {
    console.error('Error al obtener las cargas:', error);
    return null; // Si hay error, regresamos nulo
  }
  
  return data as CargaLogistica[]; // Retornamos los datos con la estructura correcta
};

// Función para registrar una nueva carga en la base de datos
export const crearCarga = async (nuevaCarga: Omit<CargaLogistica, 'id' | 'fechaCreacion'>) => {
  const { data, error } = await supabase
    .from('cargas')
    .insert([nuevaCarga])
    .select();

  if (error) {
    console.error('Error al crear la carga:', error);
    return null;
  }
  
  return data;
};

