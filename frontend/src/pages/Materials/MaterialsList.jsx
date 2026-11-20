import { Link } from 'react-router-dom';
import { useMaterials } from '../../hooks/useMaterials';
import MaterialCard from '../../components/domain/MaterialCard';
import { EmptyState, Button } from '../../components/ui';

export default function MaterialsList() {
  const { data, loading, error, refetch } = useMaterials();

  if (loading) return <div className="text-center py-10">Loading materials...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Materials</h1>
          <p className="text-gray-600">Your uploaded PDF course materials.</p>
        </div>
        <Link to="/materials/upload">
          <Button>Upload Material</Button>
        </Link>
      </div>

      <div className="space-y-3">
        {data.length === 0 ? (
          <EmptyState title="No materials" subtitle="Upload your first PDF to get started." />
        ) : (
          data.map((material) => (
            <MaterialCard key={material._id} material={material} />
          ))
        )}
      </div>
    </div>
  );
}