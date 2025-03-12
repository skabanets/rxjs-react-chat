export const formatTimestamp = (date: string | Date): string => {
  return new Date(date).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
