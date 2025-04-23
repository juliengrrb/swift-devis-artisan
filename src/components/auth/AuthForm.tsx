
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { toast } from "sonner";

interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple validation
      if (!email.includes('@')) {
        toast.error("Veuillez entrer une adresse email valide");
        return;
      }
      
      if (password.length < 6) {
        toast.error("Le mot de passe doit contenir au moins 6 caractères");
        return;
      }
      
      if (mode === 'register' && !name) {
        toast.error("Veuillez entrer votre nom");
        return;
      }
      
      // Successful login/registration
      toast.success(mode === 'login' ? "Connexion réussie" : "Inscription réussie");
      navigate('/');
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === 'login' ? 'Connexion' : 'Créer un compte'}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {mode === 'login' 
            ? "Accédez à votre espace personnel" 
            : "Commencez à créer des devis professionnels"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean Dupont"
                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Adresse email
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'login' ? "Votre mot de passe" : "Créer un mot de passe"}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        {mode === 'login' && (
          <div className="flex justify-end">
            <button type="button" className="text-sm text-primary hover:text-primary-700 transition-colors">
              Mot de passe oublié?
            </button>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 mt-2 bg-primary hover:bg-primary-600 text-white font-medium rounded-md flex items-center justify-center transition ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <span className="mr-2">{mode === 'login' ? 'Connexion...' : 'Inscription...'}</span>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            </>
          ) : (
            mode === 'login' ? 'Se connecter' : 'S\'inscrire'
          )}
        </button>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-secondary text-gray-500">ou continuer avec</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="py-3 px-4 border border-gray-300 rounded-md flex justify-center items-center bg-white hover:bg-gray-50 transition"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5 mr-2" />
              Google
            </button>
            <button
              type="button"
              className="py-3 px-4 border border-gray-300 rounded-md flex justify-center items-center bg-white hover:bg-gray-50 transition"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.3861 12.5969C17.3637 10.8203 18.5059 9.3037 20.3203 8.5547C19.2861 7.0547 17.6905 6.2381 16.0291 6.1953C14.2705 6.0361 12.5925 7.1915 11.6982 7.1915C10.7896 7.1915 9.45728 6.2109 7.96289 6.2397C6.03125 6.2686 4.25489 7.3604 3.2832 9.0326C1.25977 12.4248 2.75416 17.4131 4.70471 20.2119C5.66797 21.5807 6.79885 23.1094 8.26807 23.0518C9.69532 22.9941 10.2363 22.1377 11.9416 22.1377C13.6324 22.1377 14.1445 23.0518 15.6289 23.0229C17.1562 22.9941 18.127 21.6543 19.0469 20.2709C19.7676 19.3145 20.3203 18.2516 20.6729 17.1311C18.4746 16.2033 17.3861 14.4453 17.3861 12.5969Z" fill="currentColor" />
                <path d="M14.7539 4.63871C15.5898 3.63286 16.04 2.3316 15.9248 1C14.7109 1.05764 13.5693 1.58594 12.7334 2.47754C11.9248 3.3252 11.4033 4.60254 11.542 5.9056C12.8105 5.9919 13.918 5.6377 14.7539 4.63871Z" fill="currentColor" />
              </svg>
              Apple
            </button>
          </div>
        </div>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          {mode === 'login' ? (
            <>
              Pas encore de compte?{' '}
              <button 
                type="button"
                onClick={() => navigate('/register')}
                className="font-medium text-primary hover:text-primary-700 transition-colors"
              >
                S'inscrire
              </button>
            </>
          ) : (
            <>
              Déjà inscrit?{' '}
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="font-medium text-primary hover:text-primary-700 transition-colors"
              >
                Se connecter
              </button>
            </>
          )}
        </p>
      </form>
      
      <p className="mt-8 text-center text-xs text-gray-500">
        <span className="block">Swift Devis - 9,99€/mois sans engagement</span>
        <span className="mt-1 block">Annulez quand vous voulez, sans frais.</span>
      </p>
    </div>
  );
};

export default AuthForm;
