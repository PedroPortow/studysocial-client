import { GroupCard } from "./components"
import { useGroups } from "../../hooks/queries/useGroups";
import { useMemo } from "react";

interface GroupListProps {
  searchTerm?: string;
}

function GroupList({ searchTerm = "" }: GroupListProps) {
  const { data: groups = [] } = useGroups();

  const filteredGroups = useMemo(() => {
    if (!groups.length) return []

    if (!searchTerm) return groups

   return groups.filter((group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [groups, searchTerm])

  if (!groups.length || !filteredGroups.length) {
    return (
      <div className="text-center text-default-500 py-8">
        {searchTerm
          ?  `Nenhum grupo encontrado com "${searchTerm}".`
          :  'Nenhum grupo disponível ainda.'
        }
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredGroups.map(group => {
        return (
          <GroupCard displayOwnerBadge group={group} key={group.id} isPressable />
        )
      })}
    </div>
  )
}

export default GroupList
