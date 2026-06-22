import re
from pathlib import Path
path = Path(r'C:\Users\Junior\AppData\Roaming\Code\User\workspaceStorage\406db9dc0bdc734c027d5bf93c424932\GitHub.copilot-chat\chat-session-resources\ab0c55e6-e8eb-4993-a815-398b9de61c18\call_XxigFzk0e990IyV9Qolb560Y__vscode-1782162780499\content.txt')
text = path.read_text(encoding='utf-8', errors='ignore')
start = text.find('heading "KAIKEFLEX- UM DOIDO PELO MUNDO"')
if start == -1:
    raise SystemExit('playlist heading not found')
text = text[start:]
pattern = re.compile(r'/url: (/(?:watch\?v=[^\s"]+&list=[^\s"]+&index=\d+[^\s"]*)).*?heading "([^"]+)" \[level=3\]', re.S)
matches = pattern.findall(text)
print('matches', len(matches))
for i, (url, title) in enumerate(matches, start=1):
    vid = re.search(r'watch\?v=([^&]+)', url).group(1)
    print(f'{i}. {vid} | {title}')
