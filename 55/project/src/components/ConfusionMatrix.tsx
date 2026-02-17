interface ConfusionMatrixProps {
  matrix: {
    truePositives: number;
    falsePositives: number;
    trueNegatives: number;
    falseNegatives: number;
  };
}

export function ConfusionMatrix({ matrix }: ConfusionMatrixProps) {
  const { truePositives, falsePositives, trueNegatives, falseNegatives } = matrix;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Confusion Matrix</h3>

      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <div></div>
        <div className="text-center font-semibold text-sm text-gray-600">
          Predicted: NO
        </div>
        <div className="text-center font-semibold text-sm text-gray-600">
          Predicted: YES
        </div>

        <div className="flex items-center justify-end font-semibold text-sm text-gray-600 pr-2">
          Actual: NO
        </div>
        <div className="bg-green-100 border-2 border-green-500 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-700">{trueNegatives}</div>
          <div className="text-xs text-green-600 mt-1">True Negative</div>
        </div>
        <div className="bg-red-100 border-2 border-red-500 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-700">{falsePositives}</div>
          <div className="text-xs text-red-600 mt-1">False Positive</div>
        </div>

        <div className="flex items-center justify-end font-semibold text-sm text-gray-600 pr-2">
          Actual: YES
        </div>
        <div className="bg-red-100 border-2 border-red-500 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-700">{falseNegatives}</div>
          <div className="text-xs text-red-600 mt-1">False Negative</div>
        </div>
        <div className="bg-green-100 border-2 border-green-500 p-6 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-700">{truePositives}</div>
          <div className="text-xs text-green-600 mt-1">True Positive</div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600 space-y-2">
        <p><strong className="text-green-700">Green boxes</strong>: Correct predictions</p>
        <p><strong className="text-red-700">Red boxes</strong>: Incorrect predictions</p>
      </div>
    </div>
  );
}
