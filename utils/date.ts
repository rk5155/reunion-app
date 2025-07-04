export const getFormattedDate = (dateString: string): string => {
  if (!dateString) return '';
  const eventDate = new Date(dateString);
  const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
  const year = eventDate.getFullYear();
  const month = String(eventDate.getMonth() + 1).padStart(2, '0');
  const date = String(eventDate.getDate()).padStart(2, '0');
  const day = dayNames[eventDate.getDay()];
  return `${year}.${month}.${date}(${day})`;
};

