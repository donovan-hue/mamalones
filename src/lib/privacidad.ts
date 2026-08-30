export type RolViaje = 'solicitante' | 'dueno' | 'operador' | 'ajeno'

export function rolSobreViaje(userId: string | undefined, viaje: {
  solicitante_id?: string | null
  dueno_id?: string | null
  operador_id?: string | null
}): RolViaje {
  if (!userId) return 'ajeno'
  if (viaje.solicitante_id === userId) return 'solicitante'
  if (viaje.dueno_id === userId) return 'dueno'
  if (viaje.operador_id === userId) return 'operador'
  return 'ajeno'
}

/** Solo solicitante y dueño ven coordenadas. El operador no ve el mapa de terceros. */
export function puedeVerTelemetria(rol: RolViaje) {
  return rol === 'solicitante' || rol === 'dueno'
}
