'use client';
import { Save, StickyNote, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { createNoteAyatAction, deleteNoteAyatAction } from '@/actions/read.action';
import { toast } from 'sonner';
import { ActionResult } from "@/types"

interface AyatNotesProps {
  showNotes: boolean;
  setShowNotes: React.Dispatch<React.SetStateAction<boolean>>;
  ayatKey: number;
  surah_number: number;
  userId: string;
  arabic: string;
  terjemahan: string;
  tafsir: string;
  noteData?: any;
}

const AyatNotes: React.FC<AyatNotesProps> = ({
  showNotes,
  setShowNotes,
  ayatKey,
  surah_number,
  userId,
  arabic,
  terjemahan,
  tafsir,
  noteData,
}) => {
  const [notes, setNotes] = useState<string>('');
  
  useEffect(() => {
    setNotes(noteData?.data?.note || '');
  }, [noteData]);

  const queryClient = useQueryClient();

  const saveMutation = useMutation<ActionResult, Error, { note: string }>({
    mutationFn: async ({ note }) =>
      await createNoteAyatAction({
        ayatKey,
        surah_number,
        userId,
        note,
        arabic,
        terjemahan,
        tafsir,
      }),
    onSuccess: async (result) => {
      if (result.success) {
        toast.success('Catatan berhasil disimpan');
        await queryClient.invalidateQueries({ queryKey: ['notes', ayatKey, surah_number, userId] });
      } else {
        toast.error(result.error || 'Catatan gagal disimpan');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Catatan gagal disimpan');
    },
  });

  const deleteMutation = useMutation<ActionResult, Error, void>({
    mutationFn: () =>
      deleteNoteAyatAction({
        ayatKey,
        surah_number,
        userId,
      }),
    onSuccess: async (result) => {
      if (result.success) {
        toast.success('Catatan berhasil dihapus');
        setNotes('');
        await queryClient.invalidateQueries({ queryKey: ['notes', ayatKey, surah_number, userId] });
      } else {
        toast.error(result.error || 'Catatan gagal dihapus');
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Catatan gagal dihapus');
    },
  });

  const saveNotes = () => {
    saveMutation.mutate({ note: notes });
  };

  const clearNotes = () => {
    if(noteData?.data){
      deleteMutation.mutate();
    }
    setNotes('')
  };

  if (!showNotes) {
    return null;
  }

  return (
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
          disabled={saveMutation.isPending}
          className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-white flex items-center gap-2"
        >
          {saveMutation.isPending ? (
            <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            <Save size={16} />
          )}
          Simpan
        </Button>
        {notes && (
          <Button
            variant="outline"
            onClick={clearNotes}
            disabled={deleteMutation.isPending}
            className="border-yellow-300 cursor-pointer text-yellow-700 hover:bg-yellow-50"
          >
            {deleteMutation.isPending ? (
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-yellow-700 border-t-transparent"></div>
            ) : (
              'Hapus'
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AyatNotes;