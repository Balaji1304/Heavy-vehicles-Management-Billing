import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import DriverForm from '../components/DriverForm';
import DriverList from '../components/DriverList';

export interface Driver {
  id?: string;
  name: string;
  licenseNumber: string;
  phone: string;
  experience: number;
  aadharNumber: string;
  joiningDate: Date;
  status: 'active' | 'inactive';
}

export default function DriversManagement() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const snapshot = await getDocs(collection(db, 'drivers'));
    const driversData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      joiningDate: doc.data().joiningDate.toDate()
    })) as Driver[];
    setDrivers(driversData);
  };

  const handleAddDriver = async (driverData: Omit<Driver, 'id'>) => {
    await addDoc(collection(db, 'drivers'), {
      ...driverData,
      joiningDate: new Date(driverData.joiningDate)
    });
    fetchDrivers();
    setIsFormOpen(false);
  };

  const handleUpdateDriver = async (driverData: Driver) => {
    if (!driverData.id) return;
    const driverRef = doc(db, 'drivers', driverData.id);
    await updateDoc(driverRef, {
      ...driverData,
      joiningDate: new Date(driverData.joiningDate)
    });
    fetchDrivers();
    setSelectedDriver(null);
    setIsFormOpen(false);
  };

  const handleDeleteDriver = async (driverId: string) => {
    await deleteDoc(doc(db, 'drivers', driverId));
    fetchDrivers();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Drivers Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary"
        >
          Add New Driver
        </button>
      </div>

      <DriverList
        drivers={drivers}
        onEdit={(driver) => {
          setSelectedDriver(driver);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteDriver}
      />

      {isFormOpen && (
        <DriverForm
          driver={selectedDriver}
          onSubmit={selectedDriver ? handleUpdateDriver : handleAddDriver}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedDriver(null);
          }}
        />
      )}
    </div>
  );
}