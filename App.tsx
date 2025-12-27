import React, { useState, useCallback, useMemo } from 'react';
import { QUESTIONS, RESULTS, DEFAULT_LINE_URL } from './constants';
import { AxisScore, PersonalityType } from './types';
import { logEvent } from './services/analytics';
import ResultChart from './components/ResultChart';

// --- Components ---

// 1. Static Image Component with Fallback
interface StaticImageProps {
  src: string;
  type: 'question' | 'result';
  alt: string;
}

const StaticImage: React.FC<StaticImageProps> = ({ src, type, alt }) => {
  const [error, setError] = useState(false);

  // If image fails to load, show a nice placeholder
  if (error) {
    return (
      <div className={`w-full ${type === 'result' ? 'aspect-square' : 'aspect-[4/3]'} bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl flex flex-col items-center justify-center border-2 border-white shadow-inner p-6 text-center`}>
        <div className="text-4xl mb-2 opacity-30">🌸</div>
        <span className="text-xs text-gray-400 font-medium">No Image</span>
      </div>
    );
  }

  return (
    <div className={`w-full ${type === 'result' ? 'aspect-square' : 'aspect-[4/3]'} relative group animate-fade-in overflow-hidden rounded-2xl bg-gray-100 shadow-lg`}>
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
    </div>
  );
};


// 2. Home View
const HomeView: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center bg-gradient-to-b from-pink-50 via-white to-purple-50 relative overflow-hidden">
    {/* Decorative blobs */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

    <div className="max-w-md w-full space-y-8 relative z-10">
      <div className="space-y-4 animate-fade-in">
        <div className="inline-block p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-4 ring-4 ring-pink-50 animate-float">
          <span className="text-5xl">🔮</span>
        </div>
        <div className="py-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50">
          <p className="text-gray-600 font-medium mb-2">文章ではなく画像を入れようと思うので</p>
          <p className="text-gray-500 text-sm">クライアント向けにデザインは思案中です</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur p-6 rounded-3xl shadow-sm border border-white text-left space-y-3 mx-4">
        <h3 className="font-bold text-gray-700 text-center text-sm border-b border-gray-100 pb-2 mb-2">診断でわかること</h3>
        <ul className="text-sm text-gray-600 space-y-3">
          <li className="flex items-center">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-pink-100 text-pink-500 rounded-full text-xs mr-3">✓</span>
            あなたの「強み」と「魅力」
          </li>
          <li className="flex items-center">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-100 text-purple-500 rounded-full text-xs mr-3">✓</span>
            相性の良いパートナーや環境
          </li>
          <li className="flex items-center">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-500 rounded-full text-xs mr-3">✓</span>
            あなたを表す性格イメージイラスト
          </li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 px-6 text-lg font-bold text-white bg-gradient-to-r from-primary to-primaryDark rounded-full shadow-lg shadow-pink-200 hover:shadow-xl transform transition hover:-translate-y-1 active:scale-95"
      >
        診断をはじめる ✨
      </button>

      <p className="text-[10px] text-gray-400 mt-8">
        ※この診断は医学的なものではなく、自己理解のヒントとしてお楽しみください。
      </p>
    </div>
  </div>
);

// 3. Quiz View
interface QuizViewProps {
  currentStep: number;
  totalSteps: number;
  questions: typeof QUESTIONS;
  answers: Record<number, string>;
  onAnswer: (questionId: number, value: string) => void;
  onNext: () => void;
  onReferenceClick: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({
  currentStep,
  totalSteps,
  questions,
  answers,
  onAnswer,
  onNext,
  onReferenceClick
}) => {
  // Questions for this step (4 questions per step)
  const stepQuestions = useMemo(() => {
    const startIndex = (currentStep - 1) * 4;
    return questions.slice(startIndex, startIndex + 4);
  }, [currentStep, questions]);

  // Check if all questions in this step are answered
  const isStepComplete = useMemo(() => {
    return stepQuestions.every(q => answers[q.id] !== undefined);
  }, [stepQuestions, answers]);

  // Progress percentage (based on steps)
  const progress = ((currentStep - 1) / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-pink-50/50 flex flex-col pb-24">
      {/* Header / Step Indicator */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-20 shadow-sm">
        <div className="px-6 py-4">
          {/* Step Circles */}
          <div className="flex justify-center items-center space-x-4 mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 text-xs font-bold transition-colors duration-300 ${currentStep === step
                  ? 'border-pink-200 bg-white text-primary'
                  : currentStep > step
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 bg-gray-100 text-gray-400'
                  }`}>
                  {currentStep > step ? '✓' : step}
                </div>
                <span className={`text-[10px] mt-1 font-bold ${currentStep === step ? 'text-primary' : 'text-gray-300'}`}>Step{step}</span>
              </div>
            ))}
          </div>

          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-300 to-primary h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep - 0.5) / 3) * 100}%` }} // Visual progress
            ></div>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="flex-1 max-w-lg mx-auto w-full px-6 py-6 space-y-12">
        {stepQuestions.map((question, idx) => (
          <div key={question.id} className="animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className="flex items-start mb-4">
              <span className="text-3xl text-gray-200 font-bold mr-3 -mt-1">Q</span>
              <h2 className="text-lg font-bold text-gray-700 leading-relaxed">
                {question.text}
              </h2>
            </div>

            <div className="flex justify-between gap-2">
              {/* YES */}
              <button
                onClick={() => onAnswer(question.id, question.options[0].value)}
                className={`flex-1 py-4 text-center rounded-2xl border-2 font-bold transition-all duration-200 active:scale-95 ${answers[question.id] === question.options[0].value
                  ? 'bg-pink-500 border-pink-500 text-white shadow-md shadow-pink-200'
                  : 'bg-white border-pink-100 text-pink-400 hover:bg-pink-50'
                  }`}
              >
                はい
              </button>

              {/* NEITHER */}
              <button
                onClick={() => onAnswer(question.id, 'SKIP')}
                className={`flex-1 py-4 text-center rounded-2xl border-2 font-bold transition-all duration-200 active:scale-95 ${answers[question.id] === 'SKIP'
                  ? 'bg-gray-400 border-gray-400 text-white shadow-md'
                  : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'
                  }`}
              >
                どちらでもない
              </button>

              {/* NO */}
              <button
                onClick={() => onAnswer(question.id, question.options[1].value)}
                className={`flex-1 py-4 text-center rounded-2xl border-2 font-bold transition-all duration-200 active:scale-95 ${answers[question.id] === question.options[1].value
                  ? 'bg-blue-500 border-blue-500 text-white shadow-md shadow-blue-200'
                  : 'bg-white border-blue-100 text-blue-400 hover:bg-blue-50'
                  }`}
              >
                いいえ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Next Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-30">
        <div className="max-w-md mx-auto">
          <button
            onClick={onNext}
            disabled={!isStepComplete}
            className={`w-full py-4 px-6 text-lg font-bold text-white rounded-full shadow-lg transition-all transform ${isStepComplete
              ? 'bg-gradient-to-r from-primary to-primaryDark hover:shadow-xl hover:-translate-y-1 active:scale-95'
              : 'bg-gray-300 cursor-not-allowed text-gray-100'
              }`}
          >
            {currentStep === 3 ? '診断結果を見る ✨' : '次へ進む'}
          </button>
        </div>
      </div>

    </div>
  );
};

// 4. Result View
interface ResultViewProps {
  resultType: PersonalityType;
  axisScore: AxisScore;
}

const ResultView: React.FC<ResultViewProps> = ({ resultType, axisScore }) => {
  const data = RESULTS[resultType];
  const url = data.lineUrl || DEFAULT_LINE_URL;

  const handleLineClick = useCallback(() => {
    logEvent('line_click', { result_type: resultType });
    window.open(url, '_blank');
  }, [resultType, url]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 pb-32">
      {/* Header Area */}
      <div className="relative bg-white pt-12 px-6 pb-8 text-center rounded-b-[3rem] shadow-sm z-10">
        <p className="text-primary font-bold tracking-widest text-xs mb-2 bg-pink-50 inline-block px-3 py-1 rounded-full">診断結果</p>
        <h1 className="text-4xl font-black text-gray-800 mb-1 tracking-tight">{data.title}</h1>
        <p className="text-sm text-gray-400 font-mono tracking-widest">{data.type}</p>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-4 relative z-20 space-y-6">

        {/* Result Image Card */}
        <div className="bg-white p-2 rounded-3xl shadow-xl shadow-pink-100/50 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
          <StaticImage
            key={resultType}
            src={data.imagePath}
            type="result"
            alt={data.title}
          />
        </div>

        {/* Description Card */}
        <div className="bg-white/80 backdrop-blur p-6 rounded-3xl shadow-sm border border-white">
          <p className="text-gray-700 leading-8 text-justify text-sm">
            {data.description}
          </p>
          {/* Chart */}
          <div className="mt-4 opacity-90">
            <ResultChart score={axisScore} />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100/50">
            <h3 className="font-bold text-green-700 mb-2 flex items-center text-sm">
              <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2 shadow-sm">✨</span>
              あなたの魅力・強み
            </h3>
            <p className="text-xs text-green-800 font-bold mb-3 leading-relaxed">
              {data.strengthIntro}
            </p>
            <ul className="space-y-2">
              {data.strengths.map((s, i) => (
                <li key={i} className="text-sm text-green-800 flex items-start">
                  <span className="mr-2 text-green-400">●</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100/50">
            <h3 className="font-bold text-orange-700 mb-2 flex items-center text-sm">
              <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2 shadow-sm">💡</span>
              注意したいポイント
            </h3>
            <p className="text-xs text-orange-800 font-bold mb-3 leading-relaxed">
              {data.weaknessIntro}
            </p>
            <ul className="space-y-2">
              {data.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-orange-800 flex items-start">
                  <span className="mr-2 text-orange-400">●</span> {w}
                </li>
              ))}
            </ul>
          </div>

          {/* Suitable Professions (Blur + CTA) */}
          <div className="relative overflow-hidden rounded-2xl mt-4 cursor-pointer group" onClick={handleLineClick}>
            {/* Blurred Background Content */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100/50 blur-sm select-none transition-all duration-300 group-hover:blur-md">
              <h3 className="font-bold text-blue-700 mb-3 flex items-center text-sm opacity-50">
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2 shadow-sm">💼</span>
                あなたに向いている職業
              </h3>
              <ul className="space-y-2 opacity-50">
                {/* Dummy items that look like text to hint at content */}
                <li className="text-sm text-blue-800 flex items-start"><span className="mr-2 text-blue-400">●</span> 〇〇〇〇〇〇</li>
                <li className="text-sm text-blue-800 flex items-start"><span className="mr-2 text-blue-400">●</span> 〇〇・〇〇〇〇</li>
                <li className="text-sm text-blue-800 flex items-start"><span className="mr-2 text-blue-400">●</span> 〇〇〇〇〇</li>
                <li className="text-sm text-blue-800 flex items-start"><span className="mr-2 text-blue-400">●</span> 〇〇〇〇・〇〇</li>
              </ul>
            </div>

            {/* Overlay CTA */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/10 backdrop-blur-[2px] transition-all duration-300 group-hover:bg-white/20">
              <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-lg shadow-blue-100/50 text-center transform transition-all duration-300 group-hover:scale-105 active:scale-95">
                <p className="text-sm font-bold text-gray-700 mb-2">あなたにあったお仕事は？</p>
                <div className="inline-flex items-center text-[#06C755] font-black text-xs bg-white border border-[#06C755] px-4 py-2 rounded-full shadow-sm animate-pulse-slow">
                  LINEで答えを見る 👉
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-50 animate-fade-in">
        <div className="max-w-md mx-auto">
          <p className="text-center text-[10px] text-gray-500 mb-2">
            もっと詳しい分析や相性診断を受け取る
          </p>
          <button
            onClick={handleLineClick}
            className="w-full flex items-center justify-center py-4 bg-[#06C755] hover:bg-[#05b34c] text-white font-bold rounded-2xl shadow-lg shadow-green-100 transition-transform active:scale-95"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.5C6.5 2.5 2 6.6 2 11.6c0 2.8 1.4 5.3 3.6 7 .2.1.3.4.2.6l-.8 2.9c-.1.4.3.7.6.5l3.2-1.9c.2-.1.5-.1.7 0 1.2.3 2.5.5 3.8.5 5.5 0 10-4.1 10-9.1S18.8 2.5 12 2.5z" />
            </svg>
            LINEで完全版レポートを見る
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---

type ViewState = 'HOME' | 'QUIZ' | 'RESULT';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [resultType, setResultType] = useState<PersonalityType | null>(null);
  const [axisScore, setAxisScore] = useState<AxisScore>({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });

  // Reset state
  const startQuiz = useCallback(() => {
    setView('QUIZ');
    setCurrentStep(1);
    setAnswers({});
    setResultType(null);
    logEvent('diagnosis_start');
    window.scrollTo(0, 0);
  }, []);

  // Calculate Result
  const calculateResult = useCallback((finalAnswers: Record<number, string>) => {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    Object.values(finalAnswers).forEach(val => {
      if (val in scores) {
        scores[val as keyof AxisScore]++;
      }
    });

    setAxisScore(scores);

    // Determine type letters
    const e_i = scores.E >= scores.I ? 'E' : 'I';
    const s_n = scores.S >= scores.N ? 'S' : 'N';
    const t_f = scores.T >= scores.F ? 'T' : 'F';
    const j_p = scores.J >= scores.P ? 'J' : 'P';

    const type = `${e_i}${s_n}${t_f}${j_p}` as PersonalityType;
    setResultType(type);
    logEvent('diagnosis_complete', { result_type: type });
    setView('RESULT');
    window.scrollTo(0, 0);
  }, []);

  // Handle Answer One Question
  const handleAnswer = useCallback((questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  // Next Step Logic
  const handleNextStep = useCallback(() => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      calculateResult(answers);
    }
  }, [currentStep, answers, calculateResult]);

  return (
    <div className="antialiased text-textMain font-sans max-w-[100vw] overflow-x-hidden">
      {view === 'HOME' && <HomeView onStart={startQuiz} />}

      {view === 'QUIZ' && (
        <QuizView
          currentStep={currentStep}
          totalSteps={3}
          questions={QUESTIONS}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNextStep}
          onReferenceClick={() => window.location.reload()}
        />
      )}

      {view === 'RESULT' && resultType && (
        <ResultView resultType={resultType} axisScore={axisScore} />
      )}
    </div>
  );
};

export default App;