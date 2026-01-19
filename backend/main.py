# for productivity app - ownTheMoment
from fastapi import FastAPI
from google_auth_oauthlib.flow import InstalledAppFlow
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from fastapi.middleware.cors import CORSMiddleware
from os import path
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
    )
scopes = ['https://www.googleapis.com/auth/calendar.readonly']


def get_credentials():
    creds = None
    if path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', scopes)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', scopes)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return creds
 

@app.get("/api/events")
def get_events():
    creds = get_credentials()
    service = build('calendar', 'v3', credentials=creds)
    events_result = service.events().list(calendarId='primary', maxResults=10, singleEvents=True,
                                            orderBy='startTime').execute()
    events = events_result.get('items', [])
    return {"events": events}

