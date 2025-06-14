import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from '../lib/firebase';

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const q = query(
        collection(db, 'activities'),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      
      const snapshot = await getDocs(q);
      const activityData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      })) as Activity[];
      
      setActivities(activityData);
    };

    fetchActivities();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        {activities.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id} className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(activity.timestamp, 'PPp')}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent activity</p>
        )}
      </div>
    </div>
  );
}