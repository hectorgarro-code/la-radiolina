import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Lock, KeyRound, X, Check, ShieldAlert } from 'lucide-react';

export const AdminModal: React.FC = () => {
  const { isAdminOpen, setIsAdminOpen, isAdminLoggedIn, loginAdmin } = useAppContext();
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<boolean>(false);

  if (!isAdminOpen || isAdminLoggedIn) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (!success) {
      setErrorMsg(true);
      setTimeout(() => setErrorMsg(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#161b22] border border-[#21262d] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        <button
          onClick={() => setIsAdminOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-white">Acceso Administrador</h3>
          <p className="text-xs text-gray-400">
            Ingresá tu clave para editar los contenidos, audios, PDFs y textos de La Radiolina.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Clase de Acceso</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresá la contraseña (ej: radiolina2026)"
                className="w-full bg-[#0d1117] border border-[#21262d] rounded-xl px-4 py-3 text-white text-sm focus:border-[#f59e0b] focus:outline-none pr-10"
                autoFocus
              />
              <KeyRound className="w-4 h-4 text-gray-500 absolute right-3 top-3.5" />
            </div>
          </div>

          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-xs text-red-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Clave incorrecta. Intentá con: radiolina2026</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#f59e0b] to-[#ff6b4a] text-black font-bold py-3.5 rounded-xl text-sm shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Ingresar al Panel</span>
          </button>
        </form>
      </div>
    </div>
  );
};
