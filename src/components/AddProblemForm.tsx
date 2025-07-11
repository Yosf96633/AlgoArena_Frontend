import { useState } from 'react';
import API from '../lib/axiosInstance';

export default function AddProblemForm() {
  const [form, setForm] = useState({
    title: 'Sum of Two Numbers',
    slug: 'sum-of-two-numbers',
    description: 'Given two integers, return their sum.',
    inputFormat: 'Two space-separated integers a and b.',
    outputFormat: 'Single integer — the sum of a and b.',
    sampleInput: '4 5',
    sampleOutput: '9',
    difficulty: 'easy',
    tags: 'math, basics',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await API.post('/problem', {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()),
      });

      alert('✅ Problem added!');
      setForm({
        title: '',
        slug: '',
        description: '',
        inputFormat: '',
        outputFormat: '',
        sampleInput: '',
        sampleOutput: '',
        difficulty: 'easy',
        tags: '',
      });
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || '❌ Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold">Add New Problem</h2>

      <input className="input" type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input className="input" type="text" name="slug" placeholder="Slug (unique URL)" value={form.slug} onChange={handleChange} required />
      
      <textarea className="input" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
      <textarea className="input" name="inputFormat" placeholder="Input Format" value={form.inputFormat} onChange={handleChange} required />
      <textarea className="input" name="outputFormat" placeholder="Output Format" value={form.outputFormat} onChange={handleChange} required />
      <textarea className="input" name="sampleInput" placeholder="Sample Input" value={form.sampleInput} onChange={handleChange} required />
      <textarea className="input" name="sampleOutput" placeholder="Sample Output" value={form.sampleOutput} onChange={handleChange} required />

      <select className="input" name="difficulty" value={form.difficulty} onChange={handleChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input className="input" type="text" name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Problem</button>
    </form>
  );
}
