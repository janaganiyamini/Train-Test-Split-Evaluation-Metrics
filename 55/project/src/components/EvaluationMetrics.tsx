interface MetricsProps {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainSize: number;
  testSize: number;
}

export function EvaluationMetrics({
  accuracy,
  precision,
  recall,
  f1Score,
  trainSize,
  testSize,
}: MetricsProps) {
  const metrics = [
    {
      name: 'Accuracy',
      value: accuracy,
      description: 'Overall correctness of the model',
      color: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      name: 'Precision',
      value: precision,
      description: 'Accuracy of positive predictions',
      color: 'bg-green-50 border-green-200 text-green-700',
    },
    {
      name: 'Recall',
      value: recall,
      description: 'How many actual positives were found',
      color: 'bg-orange-50 border-orange-200 text-orange-700',
    },
    {
      name: 'F1 Score',
      value: f1Score,
      description: 'Balance between precision and recall',
      color: 'bg-purple-50 border-purple-200 text-purple-700',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Evaluation Metrics</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Training Samples</div>
          <div className="text-2xl font-bold text-gray-800">{trainSize}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600">Testing Samples</div>
          <div className="text-2xl font-bold text-gray-800">{testSize}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className={`p-4 rounded-lg border-2 ${metric.color}`}
          >
            <div className="text-sm font-medium mb-1">{metric.name}</div>
            <div className="text-3xl font-bold mb-2">
              {(metric.value * 100).toFixed(2)}%
            </div>
            <div className="text-xs opacity-80">{metric.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
