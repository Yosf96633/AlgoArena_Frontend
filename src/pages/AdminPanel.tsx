import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import API from '../lib/axiosInstance';
import AddProblemForm from '../components/AddProblemForm';
import ProblemList from '../components/ProblemList';

function AdminPanel() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const response = await API.get('/auth/sync');
        setUser(response.data.user);
        setIsAdmin(response.data.user.role === 'admin');
      } catch (err) {
        console.error('Failed to check admin role:', err);
      }
    };

    checkRole();
  }, []);

  if (!user) return <p className="text-center mt-10">Checking admin access...</p>;

  return (
    <div className="p-4">
      {isAdmin ? (
       <div>
         <AddProblemForm />
         <ProblemList/>
       </div>

      ) : (
        <p className="text-center text-red-600 text-lg">Access denied — admin only</p>
      )}
    </div>
  );
}

export default AdminPanel;
