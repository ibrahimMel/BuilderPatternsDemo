type PresetButtonsProps = Readonly<{
  onGaming: () => void;
  onDeveloper: () => void;
  onOffice: () => void;
  loading: boolean;
}>;

// Component pour les boutons de presets
export function PresetButtons({
  onGaming,
  onDeveloper,
  onOffice,
  loading,
}: PresetButtonsProps) {
  return (
    <div>
      <div className="section__header">
        <div>
          <p className="kicker">Presets</p>
          <h2 className="section__title">Configuration rapide</h2>
          <p className="section__subtitle">
            Choisissez une configuration prédéfinie.
          </p>
        </div>
        <span className="chip">3 profils</span>
      </div>

      <div className="preset-grid">
        <button
          onClick={onGaming}
          disabled={loading}
          className="preset-card text-left disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="preset-icon">🎮</span>
          <span className="preset-title">Gaming</span>
          <span className="preset-desc">Intel i9 + RTX 4090</span>
        </button>

        {/* Bouton Developer */}
        <button
          onClick={onDeveloper}
          disabled={loading}
          className="preset-card text-left disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="preset-icon">💻</span>
          <span className="preset-title">Developer</span>
          <span className="preset-desc">Intel i7 + RTX 4080</span>
        </button>

        {/* Bouton Office */}
        <button
          onClick={onOffice}
          disabled={loading}
          className="preset-card text-left disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="preset-icon">💼</span>
          <span className="preset-title">Office</span>
          <span className="preset-desc">Intel i5 + RTX 4070</span>
        </button>
      </div>
    </div>
  );
}

export default PresetButtons;
