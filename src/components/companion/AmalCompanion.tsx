//Liane Raji
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubble } from './ChatBubble';
import { InputControls } from './InputControls';
import { BubblyButton } from '../ui/BubblyButton';
import { SettingsIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';
interface Message {
  id: string;
  text: string;
  isUser: boolean;
}
interface AmalCompanionProps {
  initialFeeling: string; // This now contains the summary string from DetailedCheckIn
  onChangeBackground: () => void;
}
export function AmalCompanion({
  initialFeeling,
  onChangeBackground
}: AmalCompanionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<'text' | 'voice' | 'sign'>('text');
  const [isMuted, setIsMuted] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  // Initial greeting based on assessment summary
  useEffect(() => {
    // If initialFeeling is a summary string, use it. Otherwise default.
    const initialMessage =
    initialFeeling || "Hello friend! I am Amal. I'm here to listen.";
    setTimeout(() => {
      setMessages([
      {
        id: 'init',
        text: initialMessage,
        isUser: false
      }]
      );
      // Follow up with a helpful prompt after a short delay
      setTimeout(() => {
        setMessages((prev) => [
        ...prev,
        {
          id: 'followup',
          text: "Let's take a deep breath together. Breathe in... and out...",
          isUser: false
        }]
        );
      }, 2000);
    }, 1000);
  }, [initialFeeling]);
  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true
    };
    setMessages((prev) => [...prev, newMessage]);
    // Simulate Amal response
    setTimeout(() => {
      const responses = [
      "That's so interesting! Tell me more!",
      "I understand. You're doing great.",
      'Can you teach me a word in your language?',
      'You are so brave and strong!',
      'I love chatting with you friend!',
      'Remember, you are safe here with me.',
      'Would you like to try a drawing game?'];

      const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false
      }]
      );
    }, 1500);
  };
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Robot Video Background/Container */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-90">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-[80%] max-w-none object-cover md:object-contain animate-float"
          src="/PixVerse_V5,6_Image_Text_360P_make_the_robot_f-Picsart-BackgroundRemover.undefined" />

      </div>

      {/* Header Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <BubblyButton
          variant="outline"
          size="sm"
          onClick={() => setIsMuted(!isMuted)}
          className="bg-white/80 backdrop-blur">

          {isMuted ?
          <VolumeXIcon className="w-5 h-5" /> :

          <Volume2Icon className="w-5 h-5" />
          }
        </BubblyButton>
        <BubblyButton
          variant="outline"
          size="sm"
          onClick={onChangeBackground}
          className="bg-white/80 backdrop-blur">

          <SettingsIcon className="w-5 h-5" />
        </BubblyButton>
      </div>

      {/* Chat Area - Pushed to bottom */}
      <div className="flex-1 z-10 flex flex-col justify-end pb-0">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-4 max-h-[30vh] mask-image-gradient"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 20%)'
          }}>

          <AnimatePresence>
            {messages.map((msg) =>
            <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
            )}
          </AnimatePresence>
        </div>

        <InputControls
          onSendMessage={handleSendMessage}
          onModeChange={setMode}
          currentMode={mode} />

      </div>
    </div>);

}