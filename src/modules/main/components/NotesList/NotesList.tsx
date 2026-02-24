import { useNotes } from "../../hooks/queries/useNotes"

import NoteCard from "./components/NoteCard"

interface NotesListProps {
  subjectId?: number
}

function NotesList({ subjectId }: NotesListProps) {
  const { data: notes = [] } = useNotes({ subjectId })

  if (!notes.length) {
    return (
      <div className="text-center text-default-500 py-8">
        Nenhuma anotação encontrada.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}

export default NotesList
