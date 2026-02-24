import { Suspense } from "react"

import FeedLayout from "../../components/FeedLayout/FeedLayout"

function AcademicDiaryScreen() {
  return (
    <FeedLayout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold">Diário Acadêmico</h2>
            <span className="text-slate-500">
              Confira suas anotações, frequencia e notas!
            </span>
          </div>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          {/* <NotesLisT /> */}
        </Suspense>
        {/* <Input
          isClearable
          className="bg-white"
          placeholder="Pesquisar grupos por nome..."
          startContent={<Search className="text-default-400" size={18} />}
          value={searchTerm}
          variant="bordered"
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm("")}
        /> */}

        {/* <Suspense fallback={<div>Loading...</div>}> */}
        {/* <GroupList searchTerm={searchTerm} /> */}
        {/* </Suspense> */}
      </div>
    </FeedLayout>
  )
}

export default AcademicDiaryScreen
