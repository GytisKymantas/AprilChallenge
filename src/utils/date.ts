export function formatDate(dateString:string) {
    const date = new Date(dateString);
  
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
  
    const month = months[date.getMonth()];
    const day = date.getDate();
  
    const formattedDate = `${month} ${day}`;
  
    return formattedDate;
  }

  export const formatTimeString = (data:any) => {
    let formattedString = "";
    let hasSaturdayOrSunday = false;

    data.forEach((entry:any) => {
        if (entry.day === "6" || entry.day === "7") {
            if (!hasSaturdayOrSunday) {
                formattedString += `Sat-Sun (${entry.start_time.slice(0, 5)}-${entry.end_time.slice(0, 5)}) `;
                hasSaturdayOrSunday = true;
            }
        }
    });

    return formattedString.trim();
};



export const getDaysOfWeekFromData = (data:any) => {
  const getDayOfWeek = (dayNumber:number) => {
      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayNumber - 1];
      return dayOfWeek;
  };

  return data.map((entry:any) => {
      const dayNumber = parseInt(entry.day);
      return getDayOfWeek(dayNumber);
  });
};