'use client'
import { Save, StickyNote, X } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface AyatNotesProps {
    showNotes:boolean;
    setShowNotes:React.Dispatch<React.SetStateAction<boolean>>
}

const AyatNotes = ({ showNotes, setShowNotes }:AyatNotesProps) => {
    const [notes, setNotes]=useState('')
    const[isLoadingNotes, setIsloadingNotes]=useState(false)

    const saveNotes=()=>{

    }

    const clearNotes=()=>{

    }

    if(!showNotes){
        return null;
    }
  return (
    <>
      <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
                <StickyNote size={16} />
                Catatan Pribadi
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotes(false)}
                className="text-yellow-600 hover:text-yellow-800"
              >
                <X size={16} />
              </Button>
            </div>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tambahkan catatan pribadi disini..."
              className="mb-3 min-h-[100px] resize-none border-yellow-200 focus:border-yellow-400"
            />
            <div className="flex gap-2">
              <Button
                onClick={saveNotes}
                disabled={isLoadingNotes}
                className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white flex items-center gap-2"
              >
                {isLoadingNotes ? (
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  <Save size={16} />
                )}
                Save Notes
              </Button>
              {notes && (
                <Button
                  variant="outline"
                  onClick={clearNotes}
                  className="border-yellow-300 cursor-pointer text-yellow-700 hover:bg-yellow-50"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
    </>
  )
}

export default AyatNotes
