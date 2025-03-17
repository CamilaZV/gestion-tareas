from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, Task

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/tasks',methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{'id': t.id, 'titulo': t.titulo, 'descripcion': t.descripcion, 'completada': t.completada} for t in tasks])

@app.route('/tasks',methods=['POST'])
def create_task():
    data = request.json
    new_task = Task(titulo=data['titulo'], descripcion=data.get('descripcion',''), completada=False)
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message':'Tareas creada'}), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Tareas no encontrada'}), 404
    
    data = request.json
    task.titulo = data.get('titulo', task.titulo)
    task.descripcion = data.get('descripcion', task.descripcion)
    task.completada = data.get('completada', task.completada)

    db.session.commit()
    return jsonify({'message': 'Tarea actualizada'}), 200

@app.route('/tasks/<int:task_id>',methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Tarea no encontrada'}), 404
    
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Tarea eliminada'}), 200

if __name__ == '__main__':
    app.run(debug=True)