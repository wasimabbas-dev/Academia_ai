import { useState } from 'react';
import { materialAPI } from '../../api/materials';
import { useToast } from '../ui/Toast';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useCourses } from '../../hooks/useCourses';

export default function MaterialUploadForm({ onSuccess }) {
  const { addToast } = useToast();
  const { data: courses, loading: coursesLoading } = useCourses();
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null);

  if (coursesLoading) {
    return <div className="text-center py-10">Loading courses...</div>;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      addToast('Please select a PDF file', 'error');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('course', e.target.elements.course.value);

    setSubmitting(true);
    try {
      await materialAPI.upload(formData);
      addToast('PDF uploaded and processed successfully', 'success');
      onSuccess();
    } catch (err) {
      addToast(err.response?.data?.message || 'Upload failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Please create a course before uploading materials.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
        <select
          name="course"
          className="input-field"
          required
        >
          <option value="">Select a course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title || c.code || 'Course'}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
        <input
          type="file"
          accept=".pdf"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
      </div>
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Processing...' : 'Upload & Process PDF'}
      </Button>
    </form>
  );
}