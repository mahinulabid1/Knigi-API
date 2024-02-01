exports.absgetFormattedDateTimeWithGMT = ( ) => {
   const currentDate = new Date();
 
   // Define months array for formatting
   const months = [
     "January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
   ];
 
   // Function to format time in 12-hour clock with AM/PM
   function formatAMPM(date) {
     let hours = date.getHours();
     let minutes = date.getMinutes();
     const ampm = hours >= 12 ? 'PM' : 'AM';
     hours = hours % 12;
     hours = hours ? hours : 12; // Handle midnight (12 AM)
     minutes = minutes < 10 ? '0' + minutes : minutes;
     return `${hours}:${minutes} ${ampm}`;
   }
 
   // Function to format GMT offset
   function formatGMTOffset(date) {
     const offset = date.getTimezoneOffset();
     const offsetHours = Math.abs(Math.floor(offset / 60));
     const offsetMinutes = Math.abs(offset % 60);
     const offsetString = `${offset < 0 ? '+' : '-'}${offsetHours}:${offsetMinutes < 10 ? '0' + offsetMinutes : offsetMinutes}`;
     return offsetString;
   }
 
   // Format the date string as required
   const formattedDateString = `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()} ${formatAMPM(currentDate)} (GMT${formatGMTOffset(currentDate)})`;
 
   // Return the formatted date string
   return formattedDateString;
 }
 

 
 
 