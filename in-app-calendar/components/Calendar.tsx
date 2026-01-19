import React,{useEffect} from 'react';
import { gapi } from 'gapi-script';
interface CalendarProps {
  calendarId: string;
  apiKey: string;
  accessToken: string;
}
const Calendar = ({calendarId,apiKey,accessToken}:CalendarProps) => {
  const getCalendarEvents = (calendarId:string,apiKey:string) => {
    function start() {
      gapi.client.init({
        apiKey: apiKey,
      }).then(() => {
        return gapi.client.request({
          'path': `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        });
      }
      ).then((response: Response) => {
        console.log('res',response);
      },
        function(error: Error) {
          return [false, error];
        }
      );
    }
    gapi.load('client', start);
  }
    useEffect(() => {
      const events = getCalendarEvents(calendarId,apiKey);
      console.log('e',events);
    }
    , []);
    return (
      <div>
        <h1>Calendar Component</h1>
        {/* Calendar implementation goes here */}
      </div>
    );
  }
  export default Calendar;
