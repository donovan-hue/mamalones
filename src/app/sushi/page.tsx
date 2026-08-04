"use client";

import { useState } from "react";
import { Sparkles, ShoppingBag, Plus, Star, ShieldCheck, Flame } from "lucide-react";

const MENU_ITEMS = [
  {
    id: "roll-1",
    name: "Truffle Wagyu Roll",
    description: "Lomo Wagyu A5 flameado, camarón empanizado, aguacate, aceite de trufa negra y láminas de oro comestible.",
    price: 380,
    rating: 4.9,
    tag: "Firma",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "roll-2",
    name: "Spicy Tuna Imperial",
    description: "Atún aleta azul picante, pepino, coronado con masago, chile serrano fresco y reducción de soya dulce.",
    price: 290,
    rating: 4.8,
    tag: "Popular",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "roll-3",
    name: "Black Salmon Omakase",
    description: "Salmón noruego sellado sobre arroz negro con tinta de calamar, queso crema artesanal y gel de yuzu.",
    price: 340,
    rating: 5.0,
    tag: "Exclusivo",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80",
  },
];

export default function PremiumSushiMenu() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div 
      className="min-h-screen text-slate-100 p-4 max-w-md mx-auto relative pb-24 shadow-2xl"
      style={{
        backgroundColor: "#0d0d0d",
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.15), transparent 70%),
          radial-gradient(black 15%, transparent 16%), 
          radial-gradient(black 15%, transparent 16%)
        `,
        backgroundSize: "100% 100%, 8px 8px, 8px 8px",
        backgroundPosition: "0 0, 0 0, 4px 4px"
      }}
    >
      {/* HEADER LUXURY CON DESTELLOS CIAN Y ORO */}
      <div className="flex justify-between items-center py-4 border-b border-cyan-500/30">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-cyan-400 font-bold">
            Izakaya & Omakase
          </span>
          <h1 className="text-2xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-cyan-400">
            KRONOS SUSHI
          </h1>
        </div>
        <div className="relative bg-slate-900/90 p-3 rounded-xl border border-cyan-500/40 shadow-lg shadow-cyan-500/10">
          <ShoppingBag className="w-5 h-5 text-cyan-400" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-cyan-400 text-slate-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* BANNER EXPERIENCIA */}
      <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30 flex items-center justify-between shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Carbon Fiber Edition</span>
          </div>
          <p className="text-xs text-slate-400">Cortes finos preparados al instante.</p>
        </div>
        <Flame className="w-6 h-6 text-amber-500 animate-pulse shrink-0" />
      </div>

      {/* LISTA DE PLATILLOS */}
      <div className="space-y-5">
        {MENU_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden shadow-2xl backdrop-blur-sm"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
              
              <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-cyan-500/50 text-cyan-300 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
                {item.tag}
              </span>

              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-700 text-xs text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="font-bold">{item.rating}</span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-serif font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h3>
                <span className="text-base font-extrabold text-cyan-400 font-mono">
                  ${item.price}
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setCartCount(cartCount + 1)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Agregar al Pedido</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BARRA INFERIOR DE CHECKOUT */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
          <button className="w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 font-extrabold py-3.5 px-6 rounded-2xl shadow-2xl flex justify-between items-center border border-cyan-300/40 active:scale-98 transition-all">
            <span className="text-xs font-mono uppercase tracking-wider bg-slate-950/20 px-2 py-1 rounded-md">
              {cartCount} {cartCount === 1 ? "Roll" : "Rolls"}
            </span>
            <span className="text-sm font-bold text-white">Ordenar Ahora</span>
            <ShieldCheck className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
