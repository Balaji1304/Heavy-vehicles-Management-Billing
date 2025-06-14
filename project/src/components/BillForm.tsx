import { useState, useEffect } from 'react';
import { Bill, BillItem } from '../pages/BillingManagement';
import Modal from './Modal';

interface BillFormProps {
  bill?: Bill | null;
  onSubmit: (data: Bill) => void;
  onClose: () => void;
}

export default function BillForm({ bill, onSubmit, onClose }: BillFormProps) {
  const [formData, setFormData] = useState<Omit<Bill, 'id'>>({
    clientName: '',
    billNumber: '',
    date: new Date(),
    dueDate: new Date(),
    items: [],
    totalAmount: 0,
    paid: false,
    notes: ''
  });

  useEffect(() => {
    if (bill) {
      setFormData(bill);
    }
  }, [bill]);

  const handleAddItem = () => {
    const newItem: BillItem = {
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setFormData({
      ...formData,
      items: [...formData.items, newItem]
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    const newTotal = calculateTotal(newItems);
    setFormData({
      ...formData,
      items: newItems,
      totalAmount: newTotal
    });
  };

  const handleItemChange = (index: number, field: keyof BillItem, value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
      amount: field === 'quantity' || field === 'rate'
        ? Number(value) * (field === 'quantity' ? newItems[index].rate : newItems[index].quantity)
        : newItems[index].amount
    };
    const newTotal = calculateTotal(newItems);
    setFormData({
      ...formData,
      items: newItems,
      totalAmount: newTotal
    });
  };

  const calculateTotal = (items: BillItem[]) => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(bill ? { ...formData, id: bill.id } : formData);
  };

  return (
    <Modal title={`${bill ? 'Edit' : 'Create'} Bill`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Client Name</label>
            <input
              type="text"
              className="input-field"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="form-label">Bill Number</label>
            <input
              type="text"
              className="input-field"
              value={formData.billNumber}
              onChange={(e) => setFormData({ ...formData, billNumber: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Date</label>
            <input
              type="date"
              className="input-field"
              value={new Date(formData.date).toISOString().split('T')[0]}
              onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
              required
            />
          </div>
          <div>
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="input-field"
              value={new Date(formData.dueDate).toISOString().split('T')[0]}
              onChange={(e) => setFormData({ ...formData, dueDate: new Date(e.target.value) })}
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="form-label">Items</label>
            <button
              type="button"
              onClick={handleAddItem}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              + Add Item
            </button>
          </div>
          
          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 mb-2">
              <div className="col-span-5">
                <input
                  type="text"
                  placeholder="Description"
                  className="input-field"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  required
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="Qty"
                  className="input-field"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                  required
                  min="1"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="Rate"
                  className="input-field"
                  value={item.rate}
                  onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                  required
                  min="0"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="Amount"
                  className="input-field"
                  value={item.amount}
                  readOnly
                />
              </div>
              <div className="col-span-1">
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="form-label">Notes</label>
          <textarea
            className="input-field"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            Total Amount: ₹{formData.totalAmount}
          </div>
          <div className="flex space-x-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {bill ? 'Update' : 'Create'} Bill
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}