import { BookOpen, Brain, Target, Grid3x3, Split } from 'lucide-react';

export function EducationalSection() {
  const concepts = [
    {
      icon: Split,
      title: 'Why Split Data?',
      content:
        'We split data into training and testing sets to evaluate how well our model performs on unseen data. Training data teaches the model, while testing data checks if it learned correctly.',
    },
    {
      icon: Brain,
      title: 'What is Overfitting?',
      content:
        'Overfitting occurs when a model learns the training data too well, including its noise and outliers. It performs great on training data but poorly on new, unseen data.',
    },
    {
      icon: Target,
      title: 'Accuracy vs Precision',
      content:
        'Accuracy measures overall correctness (correct predictions / total predictions). Precision measures how many positive predictions were actually correct (true positives / all positive predictions).',
    },
    {
      icon: BookOpen,
      title: 'What is Recall?',
      content:
        'Recall (also called sensitivity) measures how many actual positive cases were correctly identified by the model. Formula: True Positives / (True Positives + False Negatives).',
    },
    {
      icon: Grid3x3,
      title: 'Confusion Matrix',
      content:
        'A confusion matrix shows the performance of a classification model. It displays True Positives, True Negatives, False Positives, and False Negatives, helping us understand where the model makes mistakes.',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <BookOpen className="w-6 h-6" />
        Learn the Concepts
      </h3>

      <div className="space-y-4">
        {concepts.map((concept) => (
          <div
            key={concept.title}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <concept.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {concept.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {concept.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Quick Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>A typical train-test split is 70-30 or 80-20</li>
          <li>Higher accuracy doesn't always mean a better model</li>
          <li>Consider both precision and recall for imbalanced datasets</li>
          <li>F1 Score balances precision and recall</li>
        </ul>
      </div>
    </div>
  );
}
