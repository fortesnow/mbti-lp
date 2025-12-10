import React, { useState, useCallback } from 'react';
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
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide leading-relaxed">
          <span className="block text-lg text-primary font-medium mb-1">本当の私に出会う</span>
          16タイプ性格診断
        </h1>
        <p className="text-gray-600 leading-relaxed text-sm">
          たった12問・2分で完了。<br/>
          直感で答えて、あなたの本質を見つけましょう。
        </p>
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
  currentQuestionIndex: number;
  totalQuestions: number;
  question: typeof QUESTIONS[0];
  onAnswer: (value: string) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ currentQuestionIndex, totalQuestions, question, onAnswer }) => {
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-pink-50/50 flex flex-col">
      {/* Header / Progress */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-10 px-6 py-4 shadow-sm">
        <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
          <span className="text-primary">Q.{currentQuestionIndex + 1}</span>
          <span>あと {totalQuestions - currentQuestionIndex} 問</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-300 to-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col justify-center px-6 py-6 max-w-lg mx-auto w-full">
        
        {/* Static Image for Question */}
        <div className="mb-6 rounded-3xl shadow-lg shadow-pink-100/50 border border-white overflow-hidden bg-white">
          <StaticImage 
            key={question.id} // Important: Force re-render on question change
            src={question.imagePath}
            type="question" 
            alt={question.text} 
          />
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-white mb-6 animate-fade-in relative">
           <span className="absolute -top-4 -left-2 text-4xl transform -rotate-12 opacity-80">💭</span>
           <h2 className="text-lg font-bold text-gray-800 text-center leading-relaxed">
            {question.text}
          </h2>
        </div>

        <div className="space-y-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(option.value)}
              className="w-full p-4 text-center bg-white border-2 border-transparent text-gray-600 font-medium rounded-2xl shadow-sm hover:border-primary hover:text-primary hover:bg-pink-50 transition-all duration-200 active:scale-95 active:bg-pink-100"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 text-center pb-8">
         <button onClick={() => window.location.reload()} className="text-xs text-gray-400 underline decoration-gray-300">
           最初からやり直す
         </button>
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
            <h3 className="font-bold text-green-700 mb-3 flex items-center text-sm">
              <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2 shadow-sm">✨</span> 
              あなたの魅力・強み
            </h3>
            <ul className="space-y-2">
              {data.strengths.map((s, i) => (
                <li key={i} className="text-sm text-green-800 flex items-start">
                   <span className="mr-2 text-green-400">●</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl border border-orange-100/50">
            <h3 className="font-bold text-orange-700 mb-3 flex items-center text-sm">
              <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-2 shadow-sm">💡</span> 
              注意したいポイント
            </h3>
            <ul className="space-y-2">
              {data.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-orange-800 flex items-start">
                   <span className="mr-2 text-orange-400">●</span> {w}
                </li>
              ))}
            </ul>
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
               <path d="M12 2.5C6.5 2.5 2 6.6 2 11.6c0 2.8 1.4 5.3 3.6 7 .2.1.3.4.2.6l-.8 2.9c-.1.4.3.7.6.5l3.2-1.9c.2-.1.5-.1.7 0 1.2.3 2.5.5 3.8.5 5.5 0 10-4.1 10-9.1S18.8 2.5 12 2.5z"/>
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
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [resultType, setResultType] = useState<PersonalityType | null>(null);
  const [axisScore, setAxisScore] = useState<AxisScore>({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });

  // Reset state
  const startQuiz = useCallback(() => {
    setView('QUIZ');
    setCurrentQuestionIdx(0);
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

  // Handle Answer
  const handleAnswer = useCallback((value: string) => {
    const nextAnswers = { ...answers, [QUESTIONS[currentQuestionIdx].id]: value };
    setAnswers(nextAnswers);

    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIdx(prev => prev + 1);
        window.scrollTo(0, 0);
      }, 200); 
    } else {
      calculateResult(nextAnswers);
    }
  }, [answers, currentQuestionIdx, calculateResult]);

  return (
    <div className="antialiased text-textMain font-sans max-w-[100vw] overflow-x-hidden">
      {view === 'HOME' && <HomeView onStart={startQuiz} />}
      
      {view === 'QUIZ' && (
        <QuizView
          currentQuestionIndex={currentQuestionIdx}
          totalQuestions={QUESTIONS.length}
          question={QUESTIONS[currentQuestionIdx]}
          onAnswer={handleAnswer}
        />
      )}

      {view === 'RESULT' && resultType && (
        <ResultView resultType={resultType} axisScore={axisScore} />
      )}
    </div>
  );
};

export default App;