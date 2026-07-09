import { useEffect, useState } from 'react';
import { getMyQueries } from '../api/auth';

function TrackPage() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('fetching user queries for tracking page...');
    getMyQueries()
      .then((res) => {
        setQueries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to pull system records.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <div className="mb-10 pb-8 border-b border-white/5">
        <p className="text-xs font-semibold text-teal-300 uppercase tracking-widest mb-3">Query Hub</p>
        <h1 className="text-3xl font-bold text-white tracking-[3px] mb-2 font-poppins">Live Status Tracking</h1>
        <p className="text-sm text-slate-500 font-sans font-semibold">
          {loading ? 'Analyzing...' : `${queries.length} active query(ies) in the system`}
        </p>
      </div>

      {error && (
        <div className="bg-rose-500/5 border border-rose-500/10 text-rose-400 p-4 text-xs font-mono rounded mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-slate-600 text-sm text-center py-20 uppercase tracking-widest font-mono">Syncing system logs...</p>
      ) : queries.length === 0 ? (
        <div className="text-slate-600 text-sm text-center py-20 backdrop-blur-md bg-white/[0.02] border border-white/5 rounded uppercase tracking-widest font-mono">
          No queries submitted yet
        </div>
      ) : (
        <div className="space-y-4">
          {queries.map((query) => {
            return (
              <div key={query._id} className="p-6 backdrop-blur-md bg-white/[0.02] border border-white/5 rounded-xl hover:border-violet-500/20 transition-all duration-300">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <p className="text-xs text-slate-500 font-mono">
                    {new Date(query.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>

                  <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border flex items-center gap-2
                    ${query.status === 'pending' ? 'bg-amber-500/5 border-amber-500/10 text-amber-400' : ''}
                    ${query.status === 'in-progress' ? 'bg-violet-500/5 border-violet-500/10 text-violet-400' : ''}
                    ${query.status === 'resolved' ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' : ''}
                  `}>
                    <span className={`w-1.5 h-1.5 rounded-full
                      ${query.status === 'pending' ? 'bg-amber-400' : ''}
                      ${query.status === 'in-progress' ? 'bg-violet-400' : ''}
                      ${query.status === 'resolved' ? 'bg-emerald-400' : ''}
                    `} />
                    {query.status === 'in-progress' ? 'In Progress' : query.status}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">{query.message}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TrackPage;
