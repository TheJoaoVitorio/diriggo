import React, { useState } from 'react';
import { X, User, Mail, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/sound';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    if (!name.trim()) return;
    onLogin(name.trim(), email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@aluno.diriggo.com`);
  };

  const handleGuest = () => {
    sounds.playClick();
    onLogin('Futuro Condutor', 'visitante@diriggo.com');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border-b-6 border-slate-300 shadow-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FFC800] border-b-4 border-[#CA8A04] flex items-center justify-center text-2xl mx-auto shadow-sm">
            🚦
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-3">
            {isRegister ? 'Criar sua Conta Diriggo' : 'Entrar no Diriggo'}
          </h3>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Salve seu progresso na trilha, ofensiva diária e pontuação dos simulados.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1">
              Nome ou Apelido
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Ex: Carlos Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:outline-none font-semibold text-slate-900 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-600 mb-1">
              E-mail (Opcional)
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-400 focus:outline-none font-semibold text-slate-900 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-2xl duo-btn-yellow font-black text-sm uppercase tracking-wide cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span>{isRegister ? 'Criar Conta e Começar' : 'Entrar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-3 text-xs font-bold text-slate-400 uppercase">
            ou
          </span>
        </div>

        <button
          onClick={handleGuest}
          className="w-full py-3 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 font-bold text-slate-700 text-sm cursor-pointer transition-colors"
        >
          Continuar como Visitante
        </button>

        <div className="mt-5 text-center">
          <button
            onClick={() => {
              sounds.playClick();
              setIsRegister(prev => !prev);
            }}
            className="text-xs font-bold text-amber-700 hover:underline cursor-pointer"
          >
            {isRegister
              ? 'Já tem uma conta? Clique aqui para entrar'
              : 'Novo por aqui? Crie sua conta grátis'}
          </button>
        </div>
      </div>
    </div>
  );
};
