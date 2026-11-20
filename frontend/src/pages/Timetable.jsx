import { useTimetable } from '../hooks/useTimetable';
import TimetableRow from '../components/domain/TimetableRow';
import { EmptyState } from '../components/ui';

export default function Timetable() {
  const { data, loading, error, refetch } = useTimetable();

  if (loading) return <div className="text-center py-10">Loading timetable...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Timetable</h1>
        <p className="text-gray-600">Your weekly class schedule.</p>
      </div>

      <div className="space-y-3">
        {data.length === 0 ? (
          <EmptyState title="No timetable entries" subtitle="Add your classes to stay organized." />
        ) : (
          data.map((entry) => (
            <TimetableRow key={entry._id} entry={entry} />
          ))
        )}
      </div>
    </div>
  );
}