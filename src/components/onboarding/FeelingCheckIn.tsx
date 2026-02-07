import React from 'react';
import { motion } from 'framer-motion';
import { BubblyButton } from '../ui/BubblyButton';
import { SmileIcon, FrownIcon, MehIcon, HeartIcon, ZapIcon } from 'lucide-react';
interface FeelingCheckInProps {
  onComplete: (feeling: string) => void;
}
const feelings = [
{
  id: 'happy',
  label: 'Happy',
  icon: SmileIcon,
  color: 'bg-amal-yellow'
},
{
  id: 'sad',
  label: 'Sad',
  icon: FrownIcon,
  color: 'bg-blue-200'
},
{
  id: 'okay',
  label: 'Okay',
  icon: MehIcon,
  color: 'bg-gray-200'
},
{
  id: 'excited',
  label: 'Excited',
  icon: ZapIcon,
  color: 'bg-orange-200'
},
{
  id: 'loved',
  label: 'Loved',
  icon: HeartIcon,
  color: 'bg-pink-200'
}];

export function FeelingCheckIn({ onComplete }: FeelingCheckInProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center max-w-2xl mx-auto">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="mb-8">

        <img
          src="/ChatGPT_Image_Feb_6,_2026,_04_12_21_PM.png"
          alt="Amal Logo"
          className="h-32 mx-auto mb-6 drop-shadow-xl hover:scale-105 transition-transform duration-300" />

        <h1 className="text-4xl md:text-5xl font-black text-amal-black mb-4">
          Hi Friend! <span className="text-amal-green">Salam!</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-medium">
          How are you feeling today?
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {feelings.map((feeling, index) =>
        <motion.button
          key={feeling.id}
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: index * 0.1
          }}
          whileHover={{
            scale: 1.05,
            rotate: 2
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={() => onComplete(feeling.id)}
          className={`
              ${feeling.color} 
              p-6 rounded-3xl border-b-8 border-black/10 
              flex flex-col items-center justify-center gap-3
              aspect-square shadow-lg hover:shadow-xl transition-all
            `}>

            <feeling.icon className="w-12 h-12 md:w-16 md:h-16 text-amal-black opacity-80" />
            <span className="text-lg md:text-xl font-bold text-amal-black">
              {feeling.label}
            </span>
          </motion.button>
        )}
      </div>
    </div>);

}