import { useParams, useNavigate } from 'react-router-dom';
import { useQuizzes } from '../../hooks/useQuizzes';
import { quizAPI } from '../../api/quizzes';
import { useToast } from '../../components/ui/Toast';

export default function QuizAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { data, loading, error, refetch } = useQuizzes();

  const quiz = data.find((q) => q._id === id);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <div className="text-center py-10">Loading quiz...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!quiz) return <div className="text-center py-10">Quiz not found</div>;

  const questions = quiz.questions || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const answerArray = questions.map((_, i) => answers[String(i)] || '');
      await quizAPI.submit(id, answerArray);
      navigate(`/quizzes/${id}/results`);
    } catch (err) {
      addToast(err.response?.data?.message || 'Submit failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
        <p className="text-gray-600">Answer all questions to submit.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, i) => (
          <div key={i} className="card p-5 space-y-3">
            <p className="font-semibold">{i + 1}. {q.question || 'Question'}</p>
            <select
              value={answers[String(i)] || ''}
              onChange={(e) => setAnswers({ ...answers, [String(i)]: e.target.value })}
              className="input-field w-full"
            >
              <option value="">Select an answer</option>
              {[q.optionA, q.optionB, q.optionC, q.optionD].filter(Boolean).map((opt, j) => (
                <option key={j} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full"
        >
          {submitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </form>
    </div>
  );
}