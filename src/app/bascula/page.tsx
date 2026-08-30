'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function BasculaPage() {
  const [folio, setFolio] = useState('');
  const [pesoBruto, setPesoBruto] = useState('');
  const [pesoTara, setPesoTara] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const registrarPesaje = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);

    try {
      if (!folio.trim() || !pesoBruto || !pesoTara) {
        throw new Error('Todos los campos son obligatorios para realizar el registro.');
      }

      const bruto = parseFloat(pesoBruto);
      const tara = parseFloat(pesoTara);

      if (isNaN(bruto) || isNaN(tara) || bruto <= tara) {
        throw new Error('El peso bruto debe ser mayor al peso tara y contener valores numéricos válidos.');
      }

      const pesoNeto = bruto - tara;
      setLoading(true);

      const { error } = await supabase.from('bascula_registros').insert([
        {
          folio: folio.trim(),
          peso_bruto: bruto,
          peso_tara: tara,
          peso_neto: pesoNeto,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setMensaje({ tipo: 'exito', texto: `Pesaje registrado correctamente. Neto: ${pesoNeto} kg` });
      setFolio('');
      setPesoBruto('');
      setPesoTara('');
    } catch (err: any) {
      setMensaje({ tipo: 'error', texto: err.message || 'Ocurrió un error inesperado al guardar el registro.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-black/40 rounded-xl border border-white/10 text-white">
      <h1 className="text-2xl font-bold mb-4 text-neon">Control de Báscula</h1>
      
      <form onSubmit={registrarPesaje} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Folio de Carga</label>
          <input
            type="text"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-900 border border-white/20 rounded-lg focus:outline-none focus:border-neon"
            placeholder="Ej. FOL-2026-001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Peso Bruto (kg)</label>
          <input
            type="number"
            step="any"
            value={pesoBruto}
            onChange={(e) => setPesoBruto(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-900 border border-white/20 rounded-lg focus:outline-none focus:border-neon"
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Peso Tara (kg)</label>
          <input
            type="number"
            step="any"
            value={pesoTara}
            onChange={(e) => setPesoTara(e.target.value)}
            className="w-full px-3 py-2 bg-neutral-900 border border-white/20 rounded-lg focus:outline-none focus:border-neon"
            placeholder="0.00"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 font-semibold rounded-lg transition disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Registrar Pesaje'}
        </button>
      </form>

      {mensaje && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${mensaje.tipo === 'exito' ? 'bg-green-900/50 text-green-200 border border-green-500' : 'bg-red-900/50 text-red-200 border border-red-500'}`}>
          {mensaje.texto}
        </div>
      )}
    </div>
  );
}

