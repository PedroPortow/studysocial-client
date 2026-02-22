export function formatDate(dateString: string) {
  const date = new Date(dateString)

  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })
}
