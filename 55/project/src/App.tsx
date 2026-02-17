import { useState } from 'react';
import { Play, Loader2, AlertCircle } from 'lucide-react';
import { EvaluationMetrics } from './components/EvaluationMetrics';
import { ConfusionMatrix } from './components/ConfusionMatrix';
import { EducationalSection } from './components/EducationalSection';

interface ModelResults {
  id: string;
  train_size: number;
  test_size: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  confusion_matrix: {
    truePositives: number;
    falsePositives: number;
    trueNegatives: number;
    falseNegatives: number;
  };
}

function App() {
  const [datasetSize, setDatasetSize] = useState(303);
  const [testSplitRatio, setTestSplitRatio] = useState(0.2);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ModelResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTrainModel = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/train-model`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          datasetSize,
          testSplitRatio,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to train model');
      }

      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Model Evaluation Learning Platform
          </h1>
          <p className="text-gray-600 text-lg">
            Learn Train-Test Split & Evaluation Metrics with Heart Disease Dataset
          </p>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Train Your Model
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dataset Size: {datasetSize} samples
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    value={datasetSize}
                    onChange={(e) => setDatasetSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>100</span>
                    <span>1000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Split Ratio: {(testSplitRatio * 100).toFixed(0)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="0.4"
                    step="0.05"
                    value={testSplitRatio}
                    onChange={(e) => setTestSplitRatio(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10%</span>
                    <span>40%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Training: {(100 - testSplitRatio * 100).toFixed(0)}% | Testing:{' '}
                    {(testSplitRatio * 100).toFixed(0)}%
                  </p>
                </div>

                <button
                  onClick={handleTrainModel}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Training Model...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Train Logistic Regression Model
                    </>
                  )}
                </button>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>

            {results && (
              <>
                <EvaluationMetrics
                  accuracy={results.accuracy}
                  precision={results.precision}
                  recall={results.recall}
                  f1Score={results.f1_score}
                  trainSize={results.train_size}
                  testSize={results.test_size}
                />

                <ConfusionMatrix matrix={results.confusion_matrix} />
              </>
            )}
          </div>

          <div className="lg:col-span-1">
            <EducationalSection />
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>Student Learning Platform - Model Evaluation Fundamentals</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
