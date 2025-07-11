import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useParams } from 'react-router';
import type { Problem } from '../types';
import axios from '../lib/axiosInstance';
import { supabase } from '../lib/supabaseClient';

const EditProblem: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [form, setForm] = useState<Partial<Problem>>({});

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get<Problem>(`/problem/${slug}`);
        setProblem(res.data);
        setForm(res.data);
      } catch (err) {
        console.error('Fetch problem error:', err);
      }
    };

    if (slug) fetchProblem();
  }, [slug]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return alert('Login required');

    try {
      await axios.put(`/problem/${slug}`, form);
      alert('Problem updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  if (!problem) return <p className="text-center mt-10">Loading problem...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold">Edit Problem</h2>

      <input
        className="input"
        name="title"
        value={form.title || ''}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      
      <textarea
        className="input"
        name="description"
        value={form.description || ''}
        onChange={handleChange}
        placeholder="Description"
        required
      />

      {/* ✅ Difficulty dropdown */}
      <select
        name="difficulty"
        className="input"
        value={form.difficulty || 'easy'}
        onChange={handleChange}
        required
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>
  );
};

export default EditProblem;
