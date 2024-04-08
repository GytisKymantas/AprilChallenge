export function formatDate(dateString:string) {
    // Create a new Date object from the provided date string
    const date = new Date(dateString);
  
    // Define an array to hold month names
    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
  
    // Extract the month and day from the date object
    const month = months[date.getMonth()];
    const day = date.getDate();
  
    // Concatenate the month and day to form the desired format
    const formattedDate = `${month} ${day}`;
  
    // Return the formatted date
    return formattedDate;
  }

  export const formatTimeString = (data:any) => {
    let formattedString = "";
    let hasSaturdayOrSunday = false;

    data.forEach(entry => {
        if (entry.day === "6" || entry.day === "7") {
            if (!hasSaturdayOrSunday) {
                formattedString += `Sat-Sun (${entry.start_time.slice(0, 5)}-${entry.end_time.slice(0, 5)}) `;
                hasSaturdayOrSunday = true;
            }
        }
    });

    return formattedString.trim();
};



export const getDaysOfWeekFromData = (data) => {
  const getDayOfWeek = (dayNumber) => {
      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayNumber - 1];
      return dayOfWeek;
  };

  return data.map(entry => {
      const dayNumber = parseInt(entry.day);
      return getDayOfWeek(dayNumber);
  });
};