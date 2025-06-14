import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import BillForm from '../components/BillForm';
import BillList from '../components/BillList';

export interface Bill {
  id?: string;
  clientName: string;
  billNumber: string;
  date: Date;
  dueDate: Date;
  items: BillItem[];
  totalAmount: number;
  paid: boolean;
  notes?: string;
}

export interface BillItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export default function BillingManagement() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const snapshot = await getDocs(collection(db, 'bills'));
    const billsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate(),
      dueDate: doc.data().dueDate.toDate()
    })) as Bill[];
    setBills(billsData);
  };

  const handleAddBill = async (billData: Omit<Bill, 'id'>) => {
    await addDoc(collection(db, 'bills'), {
      ...billData,
      date: new Date(billData.date),
      dueDate: new Date(billData.dueDate)
    });
    fetchBills();
    setIsFormOpen(false);
  };

  const handleUpdateBill = async (billData: Bill) => {
    if (!billData.id) return;
    const billRef = doc(db, 'bills', billData.id);
    await updateDoc(billRef, {
      ...billData,
      date: new Date(billData.date),
      dueDate: new Date(billData.dueDate)
    });
    fetchBills();
    setSelectedBill(null);
    setIsFormOpen(false);
  };

  const handleDeleteBill = async (billId: string) => {
    await deleteDoc(doc(db, 'bills', billId));
    fetchBills();
  };

  const handleMarkAsPaid = async (billId: string) => {
    const billRef = doc(db, 'bills', billId);
    await updateDoc(billRef, { paid: true });
    fetchBills();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Billing Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary"
        >
          Create New Bill
        </button>
      </div>

      <BillList
        bills={bills}
        onEdit={(bill) => {
          setSelectedBill(bill);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteBill}
        onMarkAsPaid={handleMarkAsPaid}
      />

      {isFormOpen && (
        <BillForm
          bill={selectedBill}
          onSubmit={selectedBill ? handleUpdateBill : handleAddBill}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedBill(null);
          }}
        />
      )}
    </div>
  );
}