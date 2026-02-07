import React, { useState } from 'react';
import { BubblyButton } from '../ui/BubblyButton';
import { MicIcon, KeyboardIcon, HandIcon, SendIcon } from 'lucide-react';
interface InputControlsProps {
  onSendMessage: (text: string) => void;
  onModeChange: (mode: 'text' | 'voice' | 'sign') => void;
  currentMode: 'text' | 'voice' | 'sign';
}
export function InputControls({
  onSendMessage,
  onModeChange,
  currentMode
}: InputControlsProps) {
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };
  return (
    <div className="w-full bg-white/90 backdrop-blur-sm p-4 rounded-t-3xl border-t-4 border-amal-green shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      {/* Mode Switchers */}
      <div className="flex justify-center gap-3 mb-4">
        <BubblyButton
          size="sm"
          variant={currentMode === 'text' ? 'primary' : 'outline'}
          onClick={() => onModeChange('text')}>

          <KeyboardIcon className="w-4 h-4" /> Text
        </BubblyButton>
        <BubblyButton
          size="sm"
          variant={currentMode === 'voice' ? 'secondary' : 'outline'}
          onClick={() => onModeChange('voice')}>

          <MicIcon className="w-4 h-4" /> Voice
        </BubblyButton>
        <BubblyButton
          size="sm"
          variant={currentMode === 'sign' ? 'accent' : 'outline'}
          onClick={() => onModeChange('sign')}>

          <HandIcon className="w-4 h-4" /> Sign
        </BubblyButton>
      </div>

      {/* Input Area */}
      {currentMode === 'text' &&
      <form onSubmit={handleSubmit} className="flex gap-2">
          <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message to Amal..."
          className="flex-1 bg-gray-100 border-2 border-gray-200 rounded-2xl px-4 py-3 text-lg focus:outline-none focus:border-amal-green focus:ring-2 focus:ring-amal-green/20 transition-all" />

          <BubblyButton
          type="submit"
          variant="primary"
          size="md"
          className="aspect-square px-0 w-14 flex items-center justify-center">

            <SendIcon className="w-6 h-6 ml-1" />
          </BubblyButton>
        </form>
      }

      {currentMode === 'voice' &&
      <div className="text-center py-4">
          <BubblyButton
          size="lg"
          variant="secondary"
          className="w-full animate-pulse">

            <MicIcon className="w-6 h-6 mr-2" /> Hold to Speak
          </BubblyButton>
        </div>
      }

      {currentMode === 'sign' &&
      <div className="text-center py-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <p className="text-gray-500 font-medium flex items-center justify-center gap-2">
            <HandIcon className="w-5 h-5" /> Camera active - Amal is watching
          </p>
        </div>
      }
    </div>);

}