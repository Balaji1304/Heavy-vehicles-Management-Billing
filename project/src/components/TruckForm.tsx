import { useState, useEffect } from 'react';
import { Truck } from '../pages/TrucksManagement';
import Modal from './Modal';

interface TruckFormProps {
  truck?: Truck | null;
  onSubmit: (data: Truck) => void;
  onClose: () => void;
}

export default function TruckForm({ truck, onSubmit, onClose }: TruckFormProps) {
  const [formData, setFormData] = useState<Omit<Truck, 'id'>>({
    registrationNumber: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    insuranceExpiry: new Date(),
    nextMaintenance: new Date(),
    status: 'active'
  });

  useEffect(() => {
    if (truck) {
      setFormData(truck);
    }
  }, [truck]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(truck ? { ...formData, id: truck.id } : formData);
  };

  return (
    <Modal title={`${truck ? 'Edit' : 'Add'} Truck`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="form-label">Registration Number</label>
          <input
            type="text"
            className="input-field"
            value={formData.registrationNumber}
            onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="form-label">Make</label>
          <input
            type="text"
            className="input-field"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="form-label">Model</label>
          <input
            type="text"
            className="input-field"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="form-label">Year</label>
          <input
            type="number"
            className="input-field"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
            min={1900}
            max={new Date().getFullYear() + 1}
            required
          />
        </div>

        <div>
          <label className="form-label">Insurance Expiry</label>
          <input
            type="date"
            className="input-field"
            value={new Date(formData.insuranceExpiry).toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, insuranceExpiry: new Date(e.target.value) })}
            required
          />
        </div>

        <div>
          <label className="form-label">Next Maintenance</label>
          <input
            type="date"
            className="input-field"
            value={new Date(formData.nextMaintenance).toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, nextMaintenance: new Date(e.target.value) })}
            required
          />
        </div>

        <div>
          <label className="form-label">Status</label>
          <select
            className="input-field"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'maintenance' | 'inactive' })}
            required
          >
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {truck ? 'Update' : 'Add'} Truck
          </button>
        </div>
      </form>
    </Modal>
  );
}