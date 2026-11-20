import MaterialUploadForm from '../../components/forms/MaterialUploadForm';

export default function UploadMaterial() {
  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Material</h1>
        <p className="text-gray-600">Upload a PDF to process and ask questions about it.</p>
      </div>

      <MaterialUploadForm onSuccess={() => {}} />
    </div>
  );
}