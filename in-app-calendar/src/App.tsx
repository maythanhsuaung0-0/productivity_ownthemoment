import { useState } from 'react'
import './App.css'
import Calendar from '../components/Calendar'
function App() {
  const calendarId = import.meta.env.VITE_CALENDAR_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const accessToken = import.meta.env.VITE_GOOGLE_ACCESS_TOKEN;
  console.log('env',calendarId,apiKey,accessToken);
  return (
    <>
    <Calendar calendarId={calendarId}
    apiKey={apiKey}
    accessToken={accessToken}
    />
    </>
  )
}

export default App
