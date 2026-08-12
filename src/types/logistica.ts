export interface CargaLogistica {
  id: string;
  folio: string;
  tipoMaterial: string;
  pesoBruto: number;
  pesoTara: number;
  pesoNeto: number;
  estatus: 'Pendiente' | 'En Báscula' | 'En Tránsito' | 'Entregado';
  camionPlacas: string;
  conductor: string;
  fechaCreacion: string;
}

export interface RegistroBascula {
  id: string;
  cargaId: string;
  pesoEntrada: number;
  pesoSalida: number;
  fechaRegistro: string;
}

