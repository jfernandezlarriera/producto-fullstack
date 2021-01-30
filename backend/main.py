import pymysql.cursors
import pymysql
import simplejson as json
from app import app
from flask import flash, request

config = {
    'host': 'db',
    'port': 3306,
    'user': 'db',
    'password': 'db',
    'database': 'db'
}
        
@app.route('/')
def getall():
    conn = pymysql.connect(**config)
    cursor = conn.cursor()
    cursor.execute('SELECT latitude, longitude FROM puntos')
    rows = cursor.fetchall()
    res = json.JSONEncoder().encode({'status': 200, 'rows': rows})
    cursor.close() 
    conn.close()
    
    return res
        
@app.errorhandler(404)
def not_found(error=None):
    res = json.JSONEncoder().encode({'status': 404})

    return res
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)