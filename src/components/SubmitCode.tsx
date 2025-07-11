import { useState, type FormEvent, type ChangeEvent } from 'react';
import axios from '../lib/axiosInstance';
import { supabase } from '../lib/supabaseClient';

const languages = [
  { id: 63, name: 'JavaScript (Node.js)' },
  { id: 71, name: 'Python 3' },
  { id: 54, name: 'C++ (GCC 9.2.0)' },
];

export default function SubmitCode() {
  const [code, setCode] = useState('');
  const [languageId, setLanguageId] = useState(63);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    status: string;
    output?: string;
    error?: string;
    isCorrect?: boolean;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    if (!token) return alert('You must be logged in');

    try {
      const res = await axios.post(
        '/submit',
        {
          code,
          languageId,
          stdin: '4 5', // example input
          problemId: '6860eeb5d984cb1e3435ad43', // example problem
        });

      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-bold">Submit Your Code</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border px-3 py-2 rounded"
          value={languageId}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setLanguageId(Number(e.target.value))
          }
        >
          {languages.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>

        <textarea
          className="w-full h-40 border px-3 py-2 rounded font-mono"
          placeholder="Write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Running...' : 'Submit'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <p className="font-semibold">Status: {result.status}</p>

          {result.isCorrect !== undefined && (
            <p
              className={`mt-2 font-bold ${
                result.isCorrect ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {result.isCorrect ? '✅ Correct Answer' : '❌ Wrong Answer'}
            </p>
          )}

          {result.output && (
            <div>
              <p className="mt-2 font-medium">Output:</p>
              <pre className="bg-white p-2 border rounded">
                {result.output}
              </pre>
            </div>
          )}

          {result.error && (
            <div>
              <p className="mt-2 font-medium text-red-600">Error:</p>
              <pre className="bg-red-100 p-2 border border-red-400 rounded">
                {result.error}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
