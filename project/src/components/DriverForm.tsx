import { useState, useEffect } from 'react';
import { Driver } from '../pages/DriversManagement';
import Modal from './Modal';

interface DriverFormProps {
  driver?: Driver | null;
  onSubmit: (data: Driver) => void;
  onClose: () => void;
}

export default function DriverForm({ driver, onSubmit, onClose }: DriverFormProps) {
  const [formData, setFormData] = useState<Omit<Driver, 'id'>>({
    name: '',
    licenseNumber: '',
    phone: '',
    experience: 0,
    aadharNumber: '',
    joiningDate: new Date(),
    status: 'active'
  });

  useEffect(() => {
    if (driver) {
      setFormData(driver);
    }
  }, [driver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(driver ? { ...formData, id: driver.id } : formData);
  };

  return (
    <Modal title={`${driver ? 'Edit' : 'Add'} Driver`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="form-label">Name</label>
          <input
            type="text"
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="form-label">License Number</label>
          <input
            type="text"
            className="input-field"
            value={formData.licenseNumber}
            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="input-field"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="form-label">Experience (years)</label>
          <input
            type="number"
            className="input-field"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
            required
          />
        </div>

        <div>
          <label className="form-label">Aadhar Number</label>
          <input
            type="text"
            className="input-field"
            value={formData.aadharNumber}
            onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="form-label">Joining Date</label>
          <input
            type="date"
            className="input-field"
            value={new Date(formData.joiningDate).toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, joiningDate: new Date(e.target.value) })}
            required
          />
        </div>

        <div>
          <label className="form-label">Status</label>
          <select
            className="input-field"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {driver ? 'Update' : 'Add'} Driver
          </button>
        </div>
      </form>
    </Modal>
  );
}