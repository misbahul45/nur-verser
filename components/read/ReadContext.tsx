
'use client';
import { createContext, useState, ReactNode } from "react";

interface AudioContextType {
  selectedReciter: string;
  setSelectedReciter: (reciter: string) => void;
  reciters: Record<string, string>;
}

const reciters = {
  '01': 'Abdullah Al-Juhany',
  '02': 'Abdul-Muhsin Al-Qasim',
  '03': 'Abdurrahman as-Sudais',
  '04': 'Ibrahim Al-Dossari',
  '05': 'Misyari Rasyid Al-Afasi',
};

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

export default function ReadProvider({ children }: { children: ReactNode }) {
  const [selectedReciter, setSelectedReciter] = useState<string>('01');

  return (
    <AudioContext.Provider value={{ selectedReciter, setSelectedReciter, reciters }}>
      {children}
    </AudioContext.Provider>
  );
}