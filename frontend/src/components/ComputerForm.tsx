import { useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import type { ComputerRequest } from '../types/Computer';

type ComputerFormProps = Readonly<{
  onSubmit: (request: ComputerRequest) => void;
  loading: boolean;
}>;

// Component pour le formulaire de creation de PC personnalise (builder)
export function ComputerForm({ onSubmit, loading }: ComputerFormProps) {
  const [formData, setFormData] = useState<ComputerRequest>({
    cpu: '',
    gpu: '',
    ram: 16,
    storage: 512,
    storageType: 'SSD',
    operatingSystem: 'Windows 11',
    hasWifi: true,
    hasBluetooth: true,
    price: 0,
  });

  // Gestion des changements dans le formulaire
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = event.currentTarget;
    const field = target.name as keyof ComputerRequest;
    const isCheckbox =
      target instanceof HTMLInputElement && target.type === 'checkbox';
    const isNumericField =
      field === 'ram' || field === 'storage' || field === 'price';
    const nextValue = isCheckbox
      ? target.checked
      : isNumericField
        ? Number(target.value)
        : target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: nextValue,
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <div className="section__header">
        <div>
          <p className="kicker">Builder</p>
          <h2 className="section__title">Configuration personnalisée</h2>
          <p className="section__subtitle">
            Créez votre PC sur mesure (Builder Pattern)
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form">
        {/* CPU */}
        <div>
          <label htmlFor="cpu" className="label">
            CPU
          </label>
          <select
            id="cpu"
            name="cpu"
            value={formData.cpu}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Sélectionner...</option>
            <option value="Intel Core i9-14900K">Intel Core i9-14900K</option>
            <option value="Intel Core i7-14700K">Intel Core i7-14700K</option>
            <option value="Intel Core i5-14600K">Intel Core i5-14600K</option>
            <option value="AMD Ryzen 9 7950X">AMD Ryzen 9 7950X</option>
            <option value="AMD Ryzen 7 7800X3D">AMD Ryzen 7 7800X3D</option>
            <option value="Apple M3 Max">Apple M3 Max</option>
          </select>
        </div>

        {/* GPU */}
        <div>
          <label htmlFor="gpu" className="label">
            GPU
          </label>
          <select
            id="gpu"
            name="gpu"
            value={formData.gpu}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="">Sélectionner...</option>
            <option value="NVIDIA GeForce RTX 4090">NVIDIA GeForce RTX 4090</option>
            <option value="NVIDIA GeForce RTX 4080">NVIDIA GeForce RTX 4080</option>
            <option value="NVIDIA GeForce RTX 4070">NVIDIA GeForce RTX 4070</option>
            <option value="AMD Radeon RX 7900 XTX">AMD Radeon RX 7900 XTX</option>
            <option value="Intel Arc A770">Intel Arc A770</option>
            <option value="Integrated Graphics">Integrated Graphics</option>
          </select>
        </div>

        {/* RAM et Storage sur la même ligne */}
        <div className="form__grid">
          <div>
            <label htmlFor="ram" className="label">
              RAM (GB)
            </label>
            <select
              id="ram"
              name="ram"
              value={formData.ram}
              onChange={handleChange}
              className="input"
            >
              <option value={8}>8 GB</option>
              <option value={16}>16 GB</option>
              <option value={32}>32 GB</option>
              <option value={64}>64 GB</option>
              <option value={128}>128 GB</option>
            </select>
          </div>

          <div>
            <label htmlFor="storage" className="label">
              Stockage (GB)
            </label>
            <select
              id="storage"
              name="storage"
              value={formData.storage}
              onChange={handleChange}
              className="input"
            >
              <option value={256}>256 GB</option>
              <option value={512}>512 GB</option>
              <option value={1000}>1 TB</option>
              <option value={2000}>2 TB</option>
              <option value={4000}>4 TB</option>
            </select>
          </div>
        </div>

        {/* Type de stockage et OS */}
        <div className="form__grid">
          <div>
            <label htmlFor="storageType" className="label">
              Type de Stockage
            </label>
            <select
              id="storageType"
              name="storageType"
              value={formData.storageType}
              onChange={handleChange}
              className="input"
            >
              <option value="SSD">SSD</option>
              <option value="NVMe SSD">NVMe SSD</option>
              <option value="HDD">HDD</option>
            </select>
          </div>

          <div>
            <label htmlFor="operatingSystem" className="label">
              Système d'exploitation
            </label>
            <select
              id="operatingSystem"
              name="operatingSystem"
              value={formData.operatingSystem}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="">Sélectionner...</option>
              <option value="Windows 11 Pro">Windows 11 Pro</option>
              <option value="Windows 11 Home">Windows 11 Home</option>
              <option value="Ubuntu 24.04 LTS">Ubuntu 24.04 LTS</option>
              <option value="macOS Sonoma">macOS Sonoma</option>
            </select>
          </div>
        </div>

        {/* Prix */}
        <div>
          <label htmlFor="price" className="label">
            Prix (DH)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min={0}
            className="input"
          />
        </div>

        {/* Options WiFi et Bluetooth */}
        <div className="check-group">
          <label className="check-pill">
            <input
              type="checkbox"
              id="hasWifi"
              name="hasWifi"
              checked={formData.hasWifi}
              onChange={handleChange}
              className="w-4 h-4"
            />
            WiFi
          </label>

          <label className="check-pill">
            <input
              type="checkbox"
              id="hasBluetooth"
              name="hasBluetooth"
              checked={formData.hasBluetooth}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Bluetooth
          </label>
        </div>

        {/* Bouton Soumettre */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
        >
          {loading ? 'Création...' : 'Construire mon PC'}
        </button>
      </form>
    </div>
  );
}

export default ComputerForm;
