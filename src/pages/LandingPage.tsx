
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export const Logo = () => (
  <div className="flex items-center justify-center">
    <div className="flex items-center">
      <div className="bg-primary p-2 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
          <path d="M7 7h.01"></path>
        </svg>
      </div>
      <div className="ml-2">
        <h1 className="text-2xl font-bold text-gray-900">Swift Devis</h1>
        <p className="text-xs text-gray-500">Pour les artisans du BTP</p>
      </div>
    </div>
  </div>
);

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start">
    <div className="shrink-0">
      <Check size={20} className="text-primary mt-0.5" />
    </div>
    <p className="ml-3 text-gray-700">{children}</p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          
          <div className="flex items-center space-x-4">
            <Link to="/login" className="font-medium text-primary hover:text-primary-700 transition-colors">
              Connexion
            </Link>
            <Link
              to="/register"
              className="py-2 px-4 bg-primary hover:bg-primary-700 text-white font-medium rounded-md transition"
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Créez des devis professionnels <br className="hidden md:inline" />
            <span className="text-primary">en moins de 3 clics</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            L'application la plus simple et abordable pour les artisans du BTP.
            Générez des devis parfaits en quelques secondes avec notre assistant IA.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link
              to="/register"
              className="py-3 px-8 bg-accent hover:bg-accent-700 text-white font-medium rounded-md text-lg transition"
            >
              Essayer gratuitement
            </Link>
            
            <a
              href="#features"
              className="py-3 px-8 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-md text-lg transition"
            >
              En savoir plus
            </a>
          </div>
          
          <div className="mt-10">
            <div className="bg-white p-2 rounded-lg shadow-lg inline-block">
              <div className="text-center text-sm font-medium py-1 px-4 bg-green-100 text-green-800 rounded mb-1">
                Déjà plus de 1 000 artisans conquis !
              </div>
              <div className="flex items-center justify-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                  ))}
                </div>
                <p className="ml-3 text-gray-600 text-sm">
                  "Enfin une appli qui ne me prend pas la tête !"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tout ce dont vous avez besoin, rien de superflu</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Swift Devis est conçu spécifiquement pour les artisans qui veulent consacrer leur temps aux chantiers, pas à l'administratif.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-secondary rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1E88E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="m16 6 4 14"></path>
                  <path d="M12 6v14"></path>
                  <path d="M8 8v12"></path>
                  <path d="M4 4v16"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple et rapide</h3>
              <p className="text-gray-600">
                Interface intuitive conçue pour vous faire gagner un temps précieux. Créez un devis complet en moins d'une minute.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-secondary rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1E88E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Assistant IA</h3>
              <p className="text-gray-600">
                Décrivez votre projet et notre IA génère automatiquement un devis détaillé avec des prix cohérents.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-secondary rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1E88E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mode hors-ligne</h3>
              <p className="text-gray-600">
                Travaillez partout, même sans connexion internet. Vos données se synchronisent automatiquement.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-secondary rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1E88E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <path d="M20.4 14.5 16 10 4 20"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Signature électronique</h3>
              <p className="text-gray-600">
                Faites signer vos devis directement sur votre téléphone ou envoyez un lien par SMS pour une signature à distance.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-secondary rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1E88E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Partage WhatsApp</h3>
              <p className="text-gray-600">
                Envoyez vos devis directement via WhatsApp à vos clients pour une communication rapide et efficace.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-secondary rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#1E88E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Un prix imbattable</h3>
              <p className="text-gray-600">
                Seulement 9,99€/mois sans engagement. 50% moins cher que les autres solutions du marché.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Un prix unique et transparent</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Toutes les fonctionnalités, sans limitations, pour un prix mensuel abordable.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 bg-primary text-white text-center">
                <h3 className="text-2xl font-bold">Offre Premium</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-5xl font-extrabold">9,99€</span>
                  <span className="ml-1 text-xl font-medium">/mois</span>
                </div>
                <p className="mt-4 text-primary-100">Sans engagement - Annulez à tout moment</p>
              </div>
              
              <div className="p-6">
                <ul className="space-y-4">
                  <FeatureItem>Devis et factures illimités</FeatureItem>
                  <FeatureItem>Assistant IA intelligent</FeatureItem>
                  <FeatureItem>Signature électronique</FeatureItem>
                  <FeatureItem>Mode hors-ligne</FeatureItem>
                  <FeatureItem>Partage WhatsApp et Email</FeatureItem>
                  <FeatureItem>Export PDF haute qualité</FeatureItem>
                  <FeatureItem>Gestion des clients</FeatureItem>
                  <FeatureItem>Bibliothèque d'éléments</FeatureItem>
                  <FeatureItem>Support client prioritaire</FeatureItem>
                </ul>
                
                <Link
                  to="/register"
                  className="mt-8 w-full block py-3 px-4 bg-accent hover:bg-accent-700 text-white font-medium rounded-md text-center transition"
                >
                  Essayer gratuitement pendant 14 jours
                </Link>
                
                <p className="mt-4 text-center text-sm text-gray-500">
                  Aucune carte bancaire requise pour l'essai
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Prêt à simplifier votre gestion administrative ?
          </h2>
          
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les milliers d'artisans qui gagnent du temps et créent des devis professionnels en quelques clics.
          </p>
          
          <Link
            to="/register"
            className="py-3 px-8 bg-white hover:bg-gray-100 text-primary font-medium rounded-md text-lg transition"
          >
            Démarrer mon essai gratuit
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <Logo />
              <p className="mt-4 text-gray-400 max-w-xs">
                L'application de devis la plus simple et abordable pour les artisans du BTP.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Produit</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-400 hover:text-white transition">Fonctionnalités</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Tarifs</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Témoignages</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Guide d'utilisation</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">À propos</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Emplois</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Presse</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Légal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Conditions d'utilisation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Politique de confidentialité</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Mentions légales</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 Swift Devis. Tous droits réservés.</p>
            
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
