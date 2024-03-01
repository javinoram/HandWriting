from waitress import serve
import api

print("Starting server ... in 0.0.0.0:8080")
#Servidor de produccion, editar host y port segun corresponda
serve(api.app, host='0.0.0.0', port=8080)