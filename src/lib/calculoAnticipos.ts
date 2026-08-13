export type DesgloseAnticipo = {
  km: number
  rendimientoKmL: number
  precioDiesel: number
  litros: number
  costoDiesel: number
  casetas: number
  viaticosDia: number
  dias: number
  viaticos: number
  colchonPct: number
  colchon: number
  total: number
}

export function calcularAnticipo(input: {
  km: number
  rendimientoKmL?: number
  precioDiesel?: number
  casetas?: number
  viaticosDia?: number
  dias?: number
  colchonPct?: number
}): DesgloseAnticipo {
  const rendimientoKmL = input.rendimientoKmL ?? 2.4
  const precioDiesel = input.precioDiesel ?? 25.8
  const casetas = input.casetas ?? 0
  const viaticosDia = input.viaticosDia ?? 850
  const dias = input.dias ?? Math.max(1, Math.ceil(input.km / 650))
  const colchonPct = input.colchonPct ?? 0.08
  const litros = input.km / rendimientoKmL
  const costoDiesel = litros * precioDiesel
  const viaticos = viaticosDia * dias
  const subtotal = costoDiesel + casetas + viaticos
  const colchon = subtotal * colchonPct
  return {
    km: input.km,
    rendimientoKmL,
    precioDiesel,
    litros: Number(litros.toFixed(1)),
    costoDiesel: Number(costoDiesel.toFixed(2)),
    casetas,
    viaticosDia,
    dias,
    viaticos: Number(viaticos.toFixed(2)),
    colchonPct,
    colchon: Number(colchon.toFixed(2)),
    total: Number((subtotal + colchon).toFixed(2)),
  }
}

export function detectarAnomaliaCombustible(pesoTon: number, litros: number, km: number, desnivelM: number) {
  const base = 2.6 - pesoTon * 0.018 - desnivelM / 8000
  const real = km / Math.max(litros, 0.1)
  const umbral = Math.max(1.2, base)
  return {
    kmPorLitro: Number(real.toFixed(2)),
    esperado: Number(umbral.toFixed(2)),
    anomalia: real < umbral * 0.82,
  }
}
