const KEY = 'kronos_viaje_activo'

export function setViajeActivo(id: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, id)
}

export function getViajeActivo() {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(KEY) || ''
}
