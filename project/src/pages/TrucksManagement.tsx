import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import TruckForm from '../components/TruckForm';
import TruckList from '../components/TruckList';

export interface Truck {
  id?: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  insuranceExpiry: Date;
  nextMaintenance: Date;
  status: 'active' | 'maintenance' | 'inactive';
}

export default function TrucksManagement() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    const snapshot = await getDocs(collection(db, 'trucks'));
    const trucksData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      insuranceExpiry: doc.data().insuranceExpiry.toDate(),
      nextMaintenance: doc.data().nextMaintenance.toDate()
    })) as Truck[];
    setTrucks(trucksData);
  };

  const handleAddTruck = async (truckData: Omit<Truck, 'id'>) => {
    await addDoc(collection(db, 'trucks'), {
      ...truckData,
      insuranceExpiry: new Date(truckData.insuranceExpiry),
      nextMaintenance: new Date(truckData.nextMaintenance)
    });
    fetchTrucks();
    setIsFormOpen(false);
  };

  const handleUpdateTruck = async (truckData: Truck) => {
    if (!truckData.id) return;
    const truckRef = doc(db, 'trucks', truckData.id);
    await updateDoc(truckRef, {
      ...truckData,
      insuranceExpiry: new Date(truckData.insuranceExpiry),
      nextMaintenance: new Date(truckData.nextMaintenance)
    });
    fetchTrucks();
    setSelectedTruck(null);
    setIsFormOpen(false);
  };

  const handleDeleteTruck = async (truckId: string) => {
    await deleteDoc(doc(db, 'trucks', truckId));
    fetchTrucks();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Trucks Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn-primary"
        >
          Add New Truck
        </button>
      </div>

      <TruckList
        trucks={trucks}
        onEdit={(truck) => {
          setSelectedTruck(truck);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteTruck}
      />

      {isFormOpen && (
        <TruckForm
          truck={selectedTruck}
          onSubmit={selectedTruck ? handleUpdateTruck : handleAddTruck}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedTruck(null);
          }}
        />
      )}
    </div>
  );
}