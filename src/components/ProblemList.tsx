import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import axios from '../lib/axiosInstance';
import type { Problem } from '../types';
import { useNavigate } from 'react-router';

const ProblemList: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchProblems = async () => {
    try {
      const res = await axios.get<Problem[]>('/problem');
      setProblems(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching problems:', err);
    }
  };

  const deleteProblem = async (slug: string) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return alert('Login required');
    try {
      await axios.delete(`/problem/${slug}`);
      setProblems((prev) => prev.filter((p) => p.slug !== slug));
      alert("deleted")
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">All Problems</h2>
      <ul className="space-y-4">
        {problems.map((problem) => (
          <li key={problem._id} className="p-4 bg-white shadow border rounded">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{problem.title}</h3>
                <p className="text-sm text-gray-500">Slug: {problem.slug}</p>
                <p className="text-sm">Difficulty: {problem.difficulty}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/edit/${problem.slug}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProblem(problem.slug)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemList;
