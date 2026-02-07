//Liane Raji
import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BubblyButton } from '../ui/BubblyButton';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon,
  Volume2Icon } from
'lucide-react';
interface DetailedCheckInProps {
  onComplete: (summary: string) => void;
}
type Language = 'en' | 'ar';
const translations = {
  en: {
    welcome: 'Hello! Welcome to Amal',
    next: 'Next',
    back: 'Back',
    finish: 'Finish',
    scale: ['Not at all', 'A little', 'A lot', 'A lot + hard to stop'],
    questions: {
      basics: "Let's get to know you!",
      feelings: 'How are you feeling right now?',
      worry: 'In the last 7 days...',
      stress: 'Have you had scary thoughts?',
      sadness: 'Have you felt sad?',
      anger: 'Have you felt angry?',
      sleep: 'How is your sleep?',
      school: 'How is learning going?',
      body: 'How does your body feel?',
      safety: 'Do you feel safe?',
      strengths: 'What makes you strong?'
    }
  },
  ar: {
    welcome: 'مرحباً! أهلاً بك في أمل',
    next: 'التالي',
    back: 'سابق',
    finish: 'إنهاء',
    scale: ['أبداً', 'قليلاً', 'كثيراً', 'كثيراً + صعب التوقف'],
    questions: {
      basics: 'دعنا نتعرف عليك!',
      feelings: 'كيف تشعر الآن؟',
      worry: 'في الأيام السبعة الماضية...',
      stress: 'هل راودتك أفكار مخيفة؟',
      sadness: 'هل شعرت بالحزن؟',
      anger: 'هل شعرت بالغضب؟',
      sleep: 'كيف هو نومك؟',
      school: 'كيف هو التعلم؟',
      body: 'كيف يشعر جسمك؟',
      safety: 'هل تشعر بالأمان؟',
      strengths: 'ما الذي يجعلك قوياً؟'
    }
  }
};
export function DetailedCheckIn({ onComplete }: DetailedCheckInProps) {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];
  // Form State
  const [answers, setAnswers] = useState({
    name: '',
    age: '',
    mode: '',
    mood: [] as string[],
    worrySize: '',
    bodyFeeling: '',
    anxiety: [0, 0, 0, 0],
    stress: [0, 0, 0, 0, 0],
    sadness: [0, 0, 0],
    anger: [0, 0, 0],
    sleep: {
      fallAsleep: '',
      wakeUp: 0,
      tired: 0
    },
    school: {
      focus: '',
      drift: 0,
      missed: 0
    },
    somatic: [] as string[],
    bodyWorse: 0,
    support: {
      trustedAdult: '',
      safeHome: '',
      withWho: ''
    },
    strengths: {
      coping: '',
      proud: ''
    }
  });
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };
  const handleScaleChange = (section: string, index: number, value: number) => {
    // @ts-ignore
    const newSection = [...answers[section]];
    newSection[index] = value;
    setAnswers({
      ...answers,
      [section]: newSection
    });
  };
  const calculateFlags = () => {
    const flags = [];
    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
    if (avg(answers.stress) >= 2) flags.push('Stress');
    if (avg(answers.anxiety) >= 2) flags.push('Anxiety');
    if (avg(answers.sadness) >= 2) flags.push('Low Mood');
    if (answers.sleep.fallAsleep === 'no' || answers.sleep.wakeUp >= 2)
    flags.push('Sleep');
    if (
    answers.support.safeHome === 'not safe' ||
    answers.support.trustedAdult === 'no')

    flags.push('Safety');
    if (flags.length === 0) return 'You seem to be doing okay today!';
    return `It looks like ${flags.join(' + ')} are big today.`;
  };
  const nextStep = () => {
    if (step === 11) {
      const summary = calculateFlags();
      onComplete(summary);
    } else {
      setStep(step + 1);
    }
  };
  const prevStep = () => setStep(step - 1);
  const renderScale = (value: number, onChange: (val: number) => void) =>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-4">
      {[0, 1, 2, 3].map((score) =>
    <button
      key={score}
      onClick={() => onChange(score)}
      className={`
            p-3 rounded-xl border-2 transition-all font-bold text-sm md:text-base
            ${value === score ? 'bg-amal-green text-white border-amal-green scale-105 shadow-lg' : 'bg-white text-gray-600 border-gray-200 hover:border-amal-green/50'}
          `}>

          {t.scale[score]}
        </button>
    )}
    </div>;

  const AudioButton = ({ text }: {text: string;}) =>
  <button
    onClick={() => speak(text)}
    className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-amal-green transition-colors inline-flex items-center justify-center"
    aria-label="Read text">

      <Volume2Icon className="w-5 h-5" />
    </button>;

  const steps = [
  // Step 0: Welcome & Language
  <div className="text-center space-y-8">
      <img
      src="/ChatGPT_Image_Feb_6,_2026,_04_12_21_PM.png"
      alt="Amal Logo"
      className="h-32 mx-auto drop-shadow-xl animate-bounce-slow" />

      <h1 className="text-4xl font-black text-amal-black flex items-center justify-center">
        {t.welcome} <AudioButton text={t.welcome} />
      </h1>
      <div className="flex justify-center gap-4">
        <BubblyButton
        onClick={() => setLang('en')}
        variant={lang === 'en' ? 'primary' : 'outline'}>

          English
        </BubblyButton>
        <BubblyButton
        onClick={() => setLang('ar')}
        variant={lang === 'ar' ? 'primary' : 'outline'}>

          العربية
        </BubblyButton>
      </div>
    </div>,
  // Step 1: Basics
  <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amal-green flex items-center">
        {t.questions.basics} <AudioButton text={t.questions.basics} />
      </h2>
      <div className="space-y-4">
        <input
        placeholder={lang === 'en' ? 'What is your name?' : 'ما اسمك؟'}
        className="w-full p-4 rounded-2xl border-2 border-gray-200 text-lg focus:border-amal-green outline-none"
        value={answers.name}
        onChange={(e) =>
        setAnswers({
          ...answers,
          name: e.target.value
        })
        } />

        <input
        placeholder={lang === 'en' ? 'How old are you?' : 'كم عمرك؟'}
        type="number"
        className="w-full p-4 rounded-2xl border-2 border-gray-200 text-lg focus:border-amal-green outline-none"
        value={answers.age}
        onChange={(e) =>
        setAnswers({
          ...answers,
          age: e.target.value
        })
        } />

        <div className="grid grid-cols-3 gap-2">
          {['Text', 'Voice', 'Signs'].map((m) =>
        <button
          key={m}
          onClick={() =>
          setAnswers({
            ...answers,
            mode: m
          })
          }
          className={`p-3 rounded-xl border-2 font-bold ${answers.mode === m ? 'bg-amal-black text-white border-amal-black' : 'border-gray-200'}`}>

              {m}
            </button>
        )}
        </div>
      </div>
    </div>,
  // Step 2: Feelings (Mood)
  <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amal-green flex items-center">
        {t.questions.feelings} <AudioButton text={t.questions.feelings} />
      </h2>
      <div className="flex flex-wrap gap-2">
        {['Calm', 'Okay', 'Worried', 'Scared', 'Angry', 'Sad', 'Tired'].map(
        (feeling) =>
        <button
          key={feeling}
          onClick={() => {
            const newMood = answers.mood.includes(feeling) ?
            answers.mood.filter((f) => f !== feeling) :
            [...answers.mood, feeling];
            setAnswers({
              ...answers,
              mood: newMood
            });
          }}
          className={`px-4 py-2 rounded-full border-2 font-bold transition-all ${answers.mood.includes(feeling) ? 'bg-amal-red text-white border-amal-red' : 'border-gray-200'}`}>

              {feeling}
            </button>

      )}
      </div>
      <div className="space-y-2">
        <p className="font-bold flex items-center">
          {lang === 'en' ? 'My worries feel:' : 'مخاوفي تبدو:'}
          <AudioButton
          text={lang === 'en' ? 'My worries feel' : 'مخاوفي تبدو'} />

        </p>
        <div className="flex gap-2">
          {['Small', 'Medium', 'Big'].map((size) =>
        <button
          key={size}
          onClick={() =>
          setAnswers({
            ...answers,
            worrySize: size
          })
          }
          className={`flex-1 p-3 rounded-xl border-2 font-bold ${answers.worrySize === size ? 'bg-amal-black text-white' : 'bg-white'}`}>

              {size}
            </button>
        )}
        </div>
      </div>
    </div>,
  // Step 3: Anxiety (PTSD Focused)
  <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amal-green flex items-center">
        {t.questions.worry} <AudioButton text={t.questions.worry} />
      </h2>
      {[
    lang === 'en' ?
    'I get scared when I hear loud noises (like planes or bangs).' :
    'أخاف عندما أسمع أصواتاً عالية (مثل الطائرات).',
    lang === 'en' ?
    'I worry about my family being safe.' :
    'أقلق بشأن سلامة عائلتي.',
    lang === 'en' ?
    'I kept thinking “something bad will happen.”' :
    'أفكر دائماً أن شيئاً سيئاً سيحدث.',
    lang === 'en' ?
    'I avoided places because they make me scared.' :
    'أتجنب الأماكن التي تخيفني.'].
    map((q, i) =>
    <div key={i} className="bg-gray-50 p-4 rounded-2xl">
          <p className="font-medium mb-2 flex items-center justify-between">
            {q} <AudioButton text={q} />
          </p>
          {renderScale(answers.anxiety[i], (val) =>
      handleScaleChange('anxiety', i, val)
      )}
        </div>
    )}
    </div>,
  // Step 4: Stress/Trauma (PTSD Focused)
  <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amal-green flex items-center">
        {t.questions.stress} <AudioButton text={t.questions.stress} />
      </h2>
      {[
    lang === 'en' ?
    'I have bad dreams about what happened.' :
    'لدي كوابيس حول ما حدث.',
    lang === 'en' ?
    'I get scared from sudden sounds.' :
    'أفزع من الأصوات المفاجئة.',
    lang === 'en' ?
    'I feel “on alert” all the time.' :
    'أشعر أنني في حالة تأهب طوال الوقت.',
    lang === 'en' ?
    'I try not to think about the scary things I saw.' :
    'أحاول عدم التفكير في الأشياء المخيفة التي رأيتها.',
    lang === 'en' ?
    'Bad memories pop into my head.' :
    'ذكريات سيئة تخطر ببالي.'].
    map((q, i) =>
    <div key={i} className="bg-gray-50 p-4 rounded-2xl">
          <p className="font-medium mb-2 flex items-center justify-between">
            {q} <AudioButton text={q} />
          </p>
          {renderScale(answers.stress[i], (val) =>
      handleScaleChange('stress', i, val)
      )}
        </div>
    )}
    </div>,
  // Step 5: Sadness (Loss Focused)
  <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amal-green flex items-center">
        {t.questions.sadness} <AudioButton text={t.questions.sadness} />
      </h2>
      {[
    lang === 'en' ?
    'I miss my home or friends.' :
    'أشتاق لبيتي أو أصدقائي.',
    lang === 'en' ?
    'I feel sad about people we lost.' :
    'أشعر بالحزن على من فقدناهم.',
    lang === 'en' ? 'I feel hopeless.' : 'أشعر باليأس.'].
    map((q, i) =>
    <div key={i} className="bg-gray-50 p-4 rounded-2xl">
          <p className="font-medium mb-2 flex items-center justify-between">
            {q} <AudioButton text={q} />
          </p>
          {renderScale(answers.sadness[i], (val) =>
      handleScaleChange('sadness', i, val)
      )}
        </div>
    )}
    </div>,
  // Step 6: Anger
  <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amal-green flex items-center">
        {t.questions.anger} <AudioButton text={t.questions.anger} />
      </h2>
      {[
    lang === 'en' ? 'I get angry quickly.' : 'أغضب بسرعة.',
    lang === 'en' ?
    'I shout or break things when upset.' :
    'أصرخ أو أكسر الأشياء عندما أنزعج.',
    lang === 'en' ?
    'Small problems feel HUGE.' :
    'المشاكل الصغيرة تبدو ضخمة.'].
    map((q, i) =>
    <div key={i} className="bg-gray-50 p-4 rounded-2xl">
          <p className="font-medium mb-2 flex items-center justify-between">
            {q} <AudioButton text={q} />
          </p>
          {renderScale(answers.anger[i], (val) =>
      handleScaleChange('anger', i, val)
      )}
        </div>
    )}
    </div>,
  // Step 7: Sleep
  <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amal-green flex items-center">
        {t.questions.sleep} <AudioButton text={t.questions.sleep} />
      </h2>
      <div className="bg-gray-50 p-4 rounded-2xl">
        <p className="font-medium mb-2 flex items-center justify-between">
          {lang === 'en' ? 'I fall asleep easily.' : 'أنام بسهولة.'}
          <AudioButton
          text={lang === 'en' ? 'I fall asleep easily.' : 'أنام بسهولة.'} />

        </p>
        <div className="flex gap-2">
          {['yes', 'sometimes', 'no'].map((opt) =>
        <button
          key={opt}
          onClick={() =>
          setAnswers({
            ...answers,
            sleep: {
              ...answers.sleep,
              fallAsleep: opt
            }
          })
          }
          className={`flex-1 p-2 rounded-lg border-2 font-bold ${answers.sleep.fallAsleep === opt ? 'bg-amal-green text-white' : 'bg-white'}`}>

              {opt}
            </button>
        )}
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-2xl">
        <p className="font-medium mb-2 flex items-center justify-between">
          {lang === 'en' ?
        'I wake up a lot or have bad dreams.' :
        'أستيقظ كثيراً أو أرى كوابيس.'}
          <AudioButton
          text={
          lang === 'en' ?
          'I wake up a lot or have bad dreams.' :
          'أستيقظ كثيراً أو أرى كوابيس.'
          } />

        </p>
        {renderScale(answers.sleep.wakeUp, (val) =>
      setAnswers({
        ...answers,
        sleep: {
          ...answers.sleep,
          wakeUp: val
        }
      })
      )}
      </div>
    </div>,
  // Step 8: School
  <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amal-green flex items-center">
        {t.questions.school} <AudioButton text={t.questions.school} />
      </h2>
      <div className="bg-gray-50 p-4 rounded-2xl">
        <p className="font-medium mb-2 flex items-center justify-between">
          {lang === 'en' ?
        'I can focus on learning.' :
        'أستطيع التركيز في التعلم.'}
          <AudioButton
          text={
          lang === 'en' ?
          'I can focus on learning.' :
          'أستطيع التركيز في التعلم.'
          } />

        </p>
        <div className="flex gap-2">
          {['yes', 'sometimes', 'no'].map((opt) =>
        <button
          key={opt}
          onClick={() =>
          setAnswers({
            ...answers,
            school: {
              ...answers.school,
              focus: opt
            }
          })
          }
          className={`flex-1 p-2 rounded-lg border-2 font-bold ${answers.school.focus === opt ? 'bg-amal-green text-white' : 'bg-white'}`}>

              {opt}
            </button>
        )}
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-2xl">
        <p className="font-medium mb-2 flex items-center justify-between">
          {lang === 'en' ? 'My mind keeps drifting.' : 'عقلي يشرد كثيراً.'}
          <AudioButton
          text={
          lang === 'en' ? 'My mind keeps drifting.' : 'عقلي يشرد كثيراً.'
          } />

        </p>
        {renderScale(answers.school.drift, (val) =>
      setAnswers({
        ...answers,
        school: {
          ...answers.school,
          drift: val
        }
      })
      )}
      </div>
    </div>,
  // Step 9: Body
  <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amal-green flex items-center">
        {t.questions.body} <AudioButton text={t.questions.body} />
      </h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {[
      'Stomach pain',
      'Headaches',
      'Feeling sick',
      'Chest tightness',
      'Trouble breathing'].
      map((s) =>
      <button
        key={s}
        onClick={() => {
          const newSomatic = answers.somatic.includes(s) ?
          answers.somatic.filter((i) => i !== s) :
          [...answers.somatic, s];
          setAnswers({
            ...answers,
            somatic: newSomatic
          });
        }}
        className={`px-3 py-2 rounded-lg border-2 font-bold ${answers.somatic.includes(s) ? 'bg-amal-red text-white' : 'bg-white'}`}>

            {s}
          </button>
      )}
      </div>
      <div className="bg-gray-50 p-4 rounded-2xl">
        <p className="font-medium mb-2 flex items-center justify-between">
          {lang === 'en' ?
        'My heart beats very fast when I hear loud sounds.' :
        'قلبي يدق بسرعة عند سماع أصوات عالية.'}
          <AudioButton
          text={
          lang === 'en' ?
          'My heart beats very fast when I hear loud sounds.' :
          'قلبي يدق بسرعة عند سماع أصوات عالية.'
          } />

        </p>
        {renderScale(answers.bodyWorse, (val) =>
      setAnswers({
        ...answers,
        bodyWorse: val
      })
      )}
      </div>
    </div>,
  // Step 10: Support
  <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amal-green flex items-center">
        {t.questions.safety} <AudioButton text={t.questions.safety} />
      </h2>
      <div className="bg-gray-50 p-4 rounded-2xl">
        <p className="font-medium mb-2 flex items-center justify-between">
          {lang === 'en' ? 'I have an adult I trust.' : 'لدي شخص بالغ أثق به.'}
          <AudioButton
          text={
          lang === 'en' ?
          'I have an adult I trust.' :
          'لدي شخص بالغ أثق به.'
          } />

        </p>
        <div className="flex gap-2">
          {['yes', 'not sure', 'no'].map((opt) =>
        <button
          key={opt}
          onClick={() =>
          setAnswers({
            ...answers,
            support: {
              ...answers.support,
              trustedAdult: opt
            }
          })
          }
          className={`flex-1 p-2 rounded-lg border-2 font-bold ${answers.support.trustedAdult === opt ? 'bg-amal-green text-white' : 'bg-white'}`}>

              {opt}
            </button>
        )}
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-2xl">
        <p className="font-medium mb-2 flex items-center justify-between">
          {lang === 'en' ? 'At home I feel...' : 'في المنزل أشعر...'}
          <AudioButton
          text={lang === 'en' ? 'At home I feel...' : 'في المنزل أشعر...'} />

        </p>
        <div className="flex gap-2">
          {['safe', 'sometimes safe', 'not safe'].map((opt) =>
        <button
          key={opt}
          onClick={() =>
          setAnswers({
            ...answers,
            support: {
              ...answers.support,
              safeHome: opt
            }
          })
          }
          className={`flex-1 p-2 rounded-lg border-2 font-bold ${answers.support.safeHome === opt ? 'bg-amal-green text-white' : 'bg-white'}`}>

              {opt}
            </button>
        )}
        </div>
      </div>
    </div>,
  // Step 11: Strengths
  <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amal-green flex items-center">
        {t.questions.strengths} <AudioButton text={t.questions.strengths} />
      </h2>
      <div className="space-y-4">
        <p className="font-medium flex items-center">
          {lang === 'en' ?
        'One thing that helps me feel better:' :
        'شيء يساعدني على الشعور بالتحسن:'}
          <AudioButton
          text={
          lang === 'en' ?
          'One thing that helps me feel better' :
          'شيء يساعدني على الشعور بالتحسن'
          } />

        </p>
        <div className="flex flex-wrap gap-2">
          {[
        'Breathing',
        'Prayer',
        'Music',
        'Drawing',
        'Talking',
        'Playing'].
        map((s) =>
        <button
          key={s}
          onClick={() =>
          setAnswers({
            ...answers,
            strengths: {
              ...answers.strengths,
              coping: s
            }
          })
          }
          className={`px-4 py-2 rounded-full border-2 font-bold ${answers.strengths.coping === s ? 'bg-amal-black text-white' : 'bg-white'}`}>

              {s}
            </button>
        )}
        </div>
        <p className="font-medium mt-4 flex items-center">
          {lang === 'en' ? "One thing I'm proud of:" : 'شيء أنا فخور به:'}
          <AudioButton
          text={lang === 'en' ? "One thing I'm proud of" : 'شيء أنا فخور به'} />

        </p>
        <input
        className="w-full p-4 rounded-2xl border-2 border-gray-200"
        placeholder={lang === 'en' ? 'I am proud that...' : 'أنا فخور بأن...'}
        value={answers.strengths.proud}
        onChange={(e) =>
        setAnswers({
          ...answers,
          strengths: {
            ...answers.strengths,
            proud: e.target.value
          }
        })
        } />

      </div>
    </div>];

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 max-w-2xl mx-auto w-full">
      <div className="w-full mb-8">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-amal-green"
            initial={{
              width: 0
            }}
            animate={{
              width: `${step / 11 * 100}%`
            }} />

        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -20
          }}
          className="w-full bg-white p-6 md:p-8 rounded-3xl shadow-xl border-b-8 border-gray-100 max-h-[65vh] overflow-y-auto custom-scrollbar">

          {steps[step]}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between w-full mt-8">
        {step > 0 &&
        <BubblyButton onClick={prevStep} variant="outline" className="w-32">
            <ArrowLeftIcon className="w-5 h-5 mr-2" /> {t.back}
          </BubblyButton>
        }
        <div className="flex-1" />
        <BubblyButton onClick={nextStep} variant="primary" className="w-32">
          {step === 11 ? t.finish : t.next}
          {step === 11 ?
          <CheckIcon className="w-5 h-5 ml-2" /> :

          <ArrowRightIcon className="w-5 h-5 ml-2" />
          }
        </BubblyButton>
      </div>
    </div>);

}