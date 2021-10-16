import os
from http.server import HTTPServer, CGIHTTPRequestHandler
import webbrowser
import sys
os.chdir('./app')
server_object = HTTPServer(server_address=('', 4000), RequestHandlerClass=CGIHTTPRequestHandler)
print('Server started on http://localhost:4000/\nPress ctrl+c to exit')
try:
    if(len(sys.argv) > 1 and sys.argv[1] == '-c'):
      chrome_path = 'open -a /Applications/Google\ Chrome.app %s'
      webbrowser.get(chrome_path).open('http://localhost:4000/')
    server_object.serve_forever()
except KeyboardInterrupt:
    pass
server_object.server_close()
print("Server stopped.")
