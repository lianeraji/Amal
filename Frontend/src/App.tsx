//Liane Raji
import React, { useState } from 'react';
import { DetailedCheckIn } from './components/onboarding/DetailedCheckIn';
import { AmalCompanion } from './components/companion/AmalCompanion';
import { motion, AnimatePresence } from 'framer-motion';
type AppState = 'onboarding' | 'companion';
type BackgroundTheme = 'default' | 'sky' | 'space' | 'forest';
export function App() {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [assessmentSummary, setAssessmentSummary] = useState<string>('');
  const [bgTheme, setBgTheme] = useState<BackgroundTheme>('default');
  const handleAssessmentComplete = (summary: string) => {
    setAssessmentSummary(summary);
    setAppState('companion');
  };
  const toggleBackground = () => {
    const themes: BackgroundTheme[] = ['default', 'sky', 'space', 'forest'];
    const currentIndex = themes.indexOf(bgTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setBgTheme(themes[nextIndex]);
  };
  const getBackgroundClass = () => {
    switch (bgTheme) {
      case 'sky':
        return 'bg-gradient-to-b from-sky-300 to-sky-100';
      case 'space':
        return 'bg-gradient-to-b from-indigo-900 to-purple-800';
      case 'forest':
        return 'bg-gradient-to-b from-green-300 to-emerald-100';
      default:
        return 'bg-gradient-to-b from-amal-light-green to-white';
      // Default calming green feel
    }
  };
  return (
    <main
      className={`w-full h-screen overflow-hidden transition-colors duration-1000 ${getBackgroundClass()}`}>

      <AnimatePresence mode="wait">
        {appState === 'onboarding' ?
        <motion.div
          key="onboarding"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0,
            x: -100
          }}
          className="h-full w-full">

            <DetailedCheckIn onComplete={handleAssessmentComplete} />
          </motion.div> :

        <motion.div
          key="companion"
          initial={{
            opacity: 0,
            x: 100
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          className="h-full w-full max-w-md mx-auto md:max-w-2xl shadow-2xl bg-white/5 backdrop-blur-sm md:border-x-2 md:border-white/20">

            <AmalCompanion
            initialFeeling={assessmentSummary}
            onChangeBackground={toggleBackground} />

          </motion.div>
        }
      </AnimatePresence>
    </main>);

}