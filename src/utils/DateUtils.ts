export const getDayWithSuffix = (day: number) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };
  
export const formatDate = (date: Date) => {
    const day = getDayWithSuffix(date.getDate());
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
};