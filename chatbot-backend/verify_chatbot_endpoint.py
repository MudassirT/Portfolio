import os

gemini_api_key = os.getenv('GEMINI_API_KEY')
if not gemini_api_key:
    raise RuntimeError('GEMINI_API_KEY environment variable must be set before running this verifier.')
os.environ['GEMINI_API_KEY'] = gemini_api_key
os.environ['GEMINI_MODEL'] = os.getenv('GEMINI_MODEL', 'models/gemini-2.5-flash')

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)
payload = {
    'query': 'Who is Mudassir Ahmed and what is this portfolio about?',
    'conversation_id': None,
    'history': [],
}

response = client.post('/api/chat/query', json=payload)
print('status_code:', response.status_code)
try:
    print('json:', response.json())
except Exception as exc:
    print('json error:', exc)
    print('text:', response.text)
