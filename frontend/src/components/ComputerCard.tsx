import type { Computer } from '../types/Computer';

type ComputerCardProps = Readonly<{
  computer: Computer;
  onDelete: (id: string) => void;
}>;

// Component pour afficher les details d'un PC
export function ComputerCard({ computer, onDelete }: ComputerCardProps) {
  return (
    <div className="card card--soft">
      <div className="card__body">
        <div className="flex justify-between items-start mb-4">
        <div>
          <p className="kicker">Configuration</p>
          <h3 className="section__title mt-2">{computer.cpu}</h3>
          <p className="section__subtitle">{computer.gpu}</p>
        </div>
        <span className="chip">{computer.price} DH</span>
      </div>

      {/* Specifications */}
      <div className="spec-grid">
        <div>
          <p className="spec-label">RAM</p>
          <p className="spec-value">{computer.ram} GB</p>
        </div>
        <div>
          <p className="spec-label">Stockage</p>
          <p className="spec-value">
            {computer.storage} {computer.storageType}
          </p>
        </div>
        <div className="col-span-2">
          <p className="spec-label">OS</p>
          <p className="spec-value">{computer.operatingSystem}</p>
        </div>
      </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="chip">Wifi : {computer.hasWifi ? 'Oui' : 'Non'}</span>
          <span className="chip">
            Bluetooth : {computer.hasBluetooth ? 'Oui' : 'Non'}
          </span>
        </div>

        {/* Bouton de suppression */}
        <button
          onClick={() => onDelete(computer.id)}
          className="btn btn-danger w-full mt-4"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

export default ComputerCard;
