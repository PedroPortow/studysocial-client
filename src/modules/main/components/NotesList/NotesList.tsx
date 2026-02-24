import { useEffect, useState } from "react"
import { Pagination } from "@heroui/pagination"

import { useNotes } from "../../hooks/queries/useNotes"
import { Note } from "../../types"

import NoteCard from "./components/NoteCard"
import { NoteDialog } from "./components/NoteDialog"

import { usePagination } from "@/hooks/usePagination"

const PER_PAGE = 5

interface NotesListProps {
  subjectId?: number
}

function NotesList({ subjectId }: NotesListProps) {
  const { data: notes = [] } = useNotes({ subjectId })

  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const {
    currentPage,
    totalPages,
    data: paginatedNotes,
    setPage,
  } = usePagination({
    data: notes,
    perPage: PER_PAGE,
  })

  useEffect(() => {
    setPage(1)
  }, [subjectId])

  const handleNotePress = (note: Note) => {
    setSelectedNote(note)
    setIsDialogOpen(true)
  }

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) setSelectedNote(null)
  }

  if (!notes.length) {
    return (
      <div className="text-center text-default-500 py-8">
        Nenhuma anotação encontrada.
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {paginatedNotes.map((note) => (
          <NoteCard key={note.id} note={note} onPress={handleNotePress} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            className="cursor-pointer"
            color="primary"
            page={currentPage}
            total={totalPages}
            onChange={setPage}
          />
        </div>
      )}

      <NoteDialog
        isOpen={isDialogOpen}
        note={selectedNote}
        onOpenChange={handleDialogChange}
      />
    </>
  )
}

export default NotesList
