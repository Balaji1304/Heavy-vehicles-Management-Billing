import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Truck, Users, Receipt, AlertTriangle } from 'lucide-react';
import { db } from '../lib/firebase';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const [stats, setStats] = useState({
    drivers: 0,
    trucks: 0,
    pendingBills: 0,
    alerts: 0
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [driversSnap, trucksSnap, billsSnap] = await Promise.all([
          getDocs(collection(db, 'drivers')),
          getDocs(collection(db, 'trucks')),
          getDocs(collection(db, 'bills'))
        ]);
  
        setStats({
          drivers: driversSnap.size,
          trucks: trucksSnap.size,
          pendingBills: billsSnap.docs.filter(doc => !doc.data().paid).length,
          alerts: trucksSnap.docs.filter(doc => {
            const data = doc.data();
            const maintenanceDate = data.nextMaintenance?.toDate();
            return maintenanceDate && maintenanceDate <= new Date();
          }).length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
  
    fetchStats();
  }, []);

  // useEffect(() => {
  //   const fetchStats = async () => {
  //     const [driversSnap, trucksSnap, billsSnap] = await Promise.all([
  //       getDocs(collection(db, 'drivers')),
  //       getDocs(collection(db, 'trucks')),
  //       getDocs(collection(db, 'bills'))
  //     ]);

  //     setStats({
  //       drivers: driversSnap.size,
  //       trucks: trucksSnap.size,
  //       pendingBills: billsSnap.docs.filter(doc => !doc.data().paid).length,
  //       alerts: trucksSnap.docs.filter(doc => {
  //         const data = doc.data();
  //         const maintenanceDate = data.nextMaintenance?.toDate();
  //         return maintenanceDate && maintenanceDate <= new Date();
  //       }).length
  //     });
  //   };

  //   fetchStats();
  // }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Drivers"
          value={stats.drivers}
          icon={<Users className="h-6 w-6" />}
          color="blue"
        />
        <StatCard
          title="Total Trucks"
          value={stats.trucks}
          icon={<Truck className="h-6 w-6" />}
          color="green"
        />
        <StatCard
          title="Pending Bills"
          value={stats.pendingBills}
          icon={<Receipt className="h-6 w-6" />}
          color="yellow"
        />
        <StatCard
          title="Maintenance Alerts"
          value={stats.alerts}
          icon={<AlertTriangle className="h-6 w-6" />}
          color="red"
        />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activity</h2>
        
      </div>
    </div>
  );
}