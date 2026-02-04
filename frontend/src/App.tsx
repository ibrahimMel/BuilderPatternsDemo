import { useEffect, useState } from 'react';
import type { Computer, ComputerRequest } from './types/Computer';
import ComputerCard from './components/ComputerCard';
import ComputerForm from './components/ComputerForm';
import PresetButtons from './components/PresetButtons';
import {
  buildCustomComputer,
  deleteComputer,
  getAllComputers,
  getDeveloperPreset,
  getGamingPreset,
  getOfficePreset,
} from './services/computerService';

function App() {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadComputers();
  }, []);

  const loadComputers = async () => {
    try {
      setLoading(true);
      const data = await getAllComputers();
      setComputers(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des PC');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGamingPreset = async () => {
    try {
      setLoading(true);
      await getGamingPreset();
      await loadComputers();
    } catch (err) {
      setError('Erreur lors de la création du PC Gaming');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeveloperPreset = async () => {
    try {
      setLoading(true);
      await getDeveloperPreset();
      await loadComputers();
    } catch (err) {
      setError('Erreur lors de la création du PC Developer');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOfficePreset = async () => {
    try {
      setLoading(true);
      await getOfficePreset();
      await loadComputers();
    } catch (err) {
      setError('Erreur lors de la création du PC Office');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomBuild = async (request: ComputerRequest) => {
    try {
      setLoading(true);
      await buildCustomComputer(request);
      await loadComputers();
    } catch (err) {
      setError('Erreur lors de la création du PC personnalisé');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      await deleteComputer(id);
      await loadComputers();
    } catch (err) {
      setError('Erreur lors de la suppression du PC');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <div className="container">
          <div className="hero__grid">
            <div>
              <p className="kicker">PC Builder Studio</p>
              <h1 className="hero__title">Composez votre PC simplement.</h1>
              <p className="hero__subtitle">
                Configurez, comparez et enregistrez vos builds avec des presets
                clairs et un formulaire lisible.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip">Presets rapides</span>
                <span className="chip">Builder sur mesure</span>
                <span className="chip">Gestion claire</span>
              </div>
            </div>

            <div className="card card--soft">
              <div className="card__body">
                <p className="kicker">Configurations</p>
                <p className="text-3xl font-semibold mt-2">
                  {computers.length}
                </p>
                <p className="section__subtitle">PC enregistrés</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="chip">Prêt à construire</span>
                  <span className="chip">API locale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container pb-16">
        {error && (
          <div className="card card--soft">
            <div className="card__body text-red-600">{error}</div>
          </div>
        )}

        <section className="section grid-2">
          <div className="stack">
            <div className="card">
              <div className="card__body">
                <PresetButtons
                  onGaming={handleGamingPreset}
                  onDeveloper={handleDeveloperPreset}
                  onOffice={handleOfficePreset}
                  loading={loading}
                />
              </div>
            </div>

            <div className="card">
              <div className="card__body">
                <ComputerForm onSubmit={handleCustomBuild} loading={loading} />
              </div>
            </div>
          </div>

          <aside className="stack">
            <div className="card card--soft">
              <div className="card__body">
                <p className="kicker">Guide rapide</p>
                <h3 className="section__title">Composez un PC équilibré</h3>
                <ul className="section__subtitle list-none mt-3 space-y-2">
                  <li>Choisissez un preset pour aller plus vite.</li>
                  <li>Ajustez CPU, GPU et stockage selon votre usage.</li>
                  <li>Validez le prix avant de sauvegarder.</li>
                </ul>
              </div>
            </div>

            <div className="stat-card">
              <p className="stat-card__label">Statut</p>
              <p className="stat-card__value">
                {loading ? 'Synchronisation...' : 'Prêt à construire'}
              </p>
              <p className="section__subtitle text-white/70 mt-2">
                API locale disponible.
              </p>
            </div>
          </aside>
        </section>

        <section className="section">
          <div className="section__header">
            <div>
              <p className="kicker">Inventaire</p>
              <h2 className="section__title">Configurations sauvegardées</h2>
            </div>
            <span className="chip">{computers.length} éléments</span>
          </div>

          {loading && <p className="section__subtitle">⏳ Chargement...</p>}

          {!loading && computers.length === 0 && (
            <p className="section__subtitle">
              Aucun PC configuré. Créez-en un !
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {computers.map((computer) => (
              <ComputerCard
                key={computer.id}
                computer={computer}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        Built by Ibrahim Amine Melhaoui | Builder Pattern Demo
      </footer>
    </div>
  );
}

export default App;
