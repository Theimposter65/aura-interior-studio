import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, ArrowLeft, Check, CheckCircle2 } from 'lucide-react';
import { quizQuestions, serviceTiers } from '../../data/services';
import { ServiceTier } from '../../types';

interface StyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tierId: string) => void;
}

export const StyleQuizModal: React.FC<StyleQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectTier
}) => {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [recommendedTier, setRecommendedTier] = useState<ServiceTier | null>(null);

  const question = quizQuestions[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / quizQuestions.length) * 100);

  const handleSelectOption = (optionId: string) => {
    const updated = { ...selectedAnswers, [question.id]: optionId };
    setSelectedAnswers(updated);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Recommendation
      calculateResult(updated);
    }
  };

  const calculateResult = (answers: Record<number, string>) => {
    // Count scores for tier-essential, tier-comprehensive, tier-architectural
    const scoreMap: Record<string, number> = {
      'tier-essential': 0,
      'tier-comprehensive': 0,
      'tier-architectural': 0
    };

    quizQuestions.forEach(q => {
      const chosenOptionId = answers[q.id];
      const opt = q.options.find(o => o.id === chosenOptionId);
      if (opt && opt.tierScore) {
        scoreMap[opt.tierScore] = (scoreMap[opt.tierScore] || 0) + 1;
      }
    });

    let topTierId = 'tier-comprehensive';
    let maxScore = -1;

    Object.entries(scoreMap).forEach(([tierId, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topTierId = tierId;
      }
    });

    const tier = serviceTiers.find(t => t.id === topTierId) || serviceTiers[1];
    setRecommendedTier(tier);
  };

  const handleRetake = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setRecommendedTier(null);
  };

  const handleProceedToBooking = () => {
    if (recommendedTier) {
      onSelectTier(recommendedTier.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-studio-900/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-studio-50 w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden z-10 border border-studio-200 animate-fadeIn">
        {/* Header */}
        <div className="p-6 border-b border-studio-200 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2.5">
            <span className="p-1.5 bg-studio-100 text-studio-900 rounded-full">
              <Sparkles className="w-4 h-4 text-studio-700" />
            </span>
            <div>
              <h3 className="font-serif text-xl text-studio-900 font-normal">
                Find Your Interior Style
              </h3>
              <p className="text-[11px] text-studio-500 uppercase tracking-wider">
                {recommendedTier ? 'Recommendation Ready' : `Step ${currentStep + 1} of ${quizQuestions.length}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-studio-400 hover:text-studio-900 rounded-full hover:bg-studio-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!recommendedTier && (
          <div className="w-full bg-studio-100 h-1">
            <div
              className="bg-studio-900 h-1 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Quiz Content */}
        <div className="p-6 sm:p-8">
          {recommendedTier ? (
            /* Results Screen */
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-sage-100 text-sage-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Recommended Package</span>
                </span>
                <h4 className="font-serif text-3xl text-studio-900">
                  {recommendedTier.name}
                </h4>
                <p className="text-xs text-studio-500 max-w-md mx-auto">
                  Based on your space, preferred style, and budget, this design package is the best fit for your project.
                </p>
              </div>

              {/* Matched Tier Card */}
              <div className="bg-white p-6 rounded border border-studio-200/80 shadow-sm space-y-4">
                <div className="flex justify-between items-baseline border-b border-studio-100 pb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-studio-400 font-semibold block">
                      Design Package
                    </span>
                    <span className="font-serif text-2xl font-semibold text-studio-900">
                      ${recommendedTier.price} USD
                    </span>
                  </div>
                  <span className="text-xs font-mono text-studio-500">
                    {recommendedTier.timeline} Turnaround
                  </span>
                </div>

                <div className="space-y-2 text-xs text-studio-600">
                  <p className="font-semibold text-studio-800 uppercase tracking-wider text-[11px]">
                    What's included in this package:
                  </p>
                  <ul className="space-y-1.5">
                    {recommendedTier.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-sage-600 flex-shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleProceedToBooking}
                  className="flex-1 py-3.5 px-6 bg-studio-900 hover:bg-studio-800 text-white text-xs uppercase tracking-widest font-semibold rounded-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>Book Consultation For This Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRetake}
                  className="py-3.5 px-4 bg-white border border-studio-200 text-studio-600 hover:text-studio-900 text-xs uppercase tracking-wider rounded-sm transition-colors"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          ) : (
            /* Questions Flow */
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-2xl text-studio-900 font-normal leading-snug">
                  {question.title}
                </h4>
                <p className="text-xs text-studio-500 mt-1">
                  {question.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {question.options.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className="text-left p-4 rounded bg-white border border-studio-200 hover:border-studio-900 hover:shadow-sm transition-all duration-200 group"
                  >
                    <p className="text-xs font-semibold text-studio-900 group-hover:text-studio-700">
                      {option.label}
                    </p>
                    <p className="text-[11px] text-studio-500 mt-1 leading-relaxed">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>

              {/* Navigation Back */}
              {currentStep > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs text-studio-500 hover:text-studio-900 flex items-center space-x-1 uppercase tracking-wider"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Question</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
