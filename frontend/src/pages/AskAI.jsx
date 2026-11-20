import { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { useMaterials } from '../hooks/useMaterials';
import { ragAPI } from '../api/rag';
import { useToast } from '../components/ui/Toast';
import SourceCitation from '../components/domain/SourceCitation';
import { Card, Button, EmptyState } from '../components/ui';

export default function AskAI() {
  const { data: courses, loading: coursesLoading } = useCourses();
  const { data: materials, loading: materialsLoading } = useMaterials();
  const { addToast } = useToast();
  const [question, setQuestion] = useState('');
  const [courseId, setCourseId] = useState('');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const ask = async (e) => {
    e.preventDefault();
    if (!question.trim() || !courseId) {
      addToast('Please enter a question and select a course', 'error');
      return;
    }
    setLoading(true);
    setAnswer(null);
    try {
      const res = await ragAPI.ask({ question, courseId });
      setAnswer(res.data);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to get answer', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (coursesLoading || materialsLoading) {
    return <div className="text-center py-10">Loading courses and materials...</div>;
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <EmptyState
          title="No courses found"
          subtitle="Please create a course and upload a material before asking questions."
          action={{
            label: 'Create Course',
            onClick: () => {},
          }}
        />
      </div>
    );
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <EmptyState
          title="No materials found"
          subtitle="Please upload a PDF first."
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ask AI</h1>
        <p className="text-gray-600">Ask questions about your uploaded course materials.</p>
      </div>

      <form onSubmit={ask} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="input-field w-full"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="input-field w-full"
            placeholder="What is the main topic covered in this document?"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !courseId || !question.trim()}
          className="btn-primary w-full"
        >
          {loading ? 'Thinking...' : 'Ask Question'}
        </button>
      </form>

      {answer && (
        <Card className="bg-blue-50 border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-3">Answer</h3>
          <div className="prose prose-sm max-w-none text-gray-800 mb-4 whitespace-pre-wrap">
            {answer.answer}
          </div>
          {answer.sources && answer.sources.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Sources</h4>
              <div className="space-y-2">
                {answer.sources.map((src) => (
                  <SourceCitation key={src.index} source={src} />
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}