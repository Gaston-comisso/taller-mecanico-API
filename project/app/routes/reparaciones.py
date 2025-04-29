from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models import Reparacion
from app import db
from datetime import datetime

reparaciones_bp = Blueprint('reparaciones', __name__)

@reparaciones_bp.route('/reparaciones', methods=['GET'])
@jwt_required()
def get_reparaciones():
    reparaciones = Reparacion.query.all()
    return jsonify([{
        'id': r.id,
        'vehicleId': r.vehiculo_id,
        'description': r.description,
        'startDate': r.start_date.isoformat(),
        'endDate': r.end_date.isoformat() if r.end_date else None,
        'status': r.status,
        'cost': r.cost,
        'notes': r.notes
    } for r in reparaciones]), 200

@reparaciones_bp.route('/reparaciones', methods=['POST'])
@jwt_required()
def create_reparacion():
    data = request.get_json()
    
    reparacion = Reparacion(
        vehiculo_id=data['vehicleId'],
        description=data['description'],
        start_date=datetime.fromisoformat(data['startDate'].replace('Z', '+00:00')),
        end_date=datetime.fromisoformat(data['endDate'].replace('Z', '+00:00')) if data.get('endDate') else None,
        status=data['status'],
        cost=data['cost'],
        notes=data.get('notes')
    )
    
    db.session.add(reparacion)
    db.session.commit()
    
    return jsonify({
        'id': reparacion.id,
        'vehicleId': reparacion.vehiculo_id,
        'description': reparacion.description,
        'startDate': reparacion.start_date.isoformat(),
        'endDate': reparacion.end_date.isoformat() if reparacion.end_date else None,
        'status': reparacion.status,
        'cost': reparacion.cost,
        'notes': reparacion.notes
    }), 201

@reparaciones_bp.route('/reparaciones/<int:id>', methods=['PUT'])
@jwt_required()
def update_reparacion(id):
    reparacion = Reparacion.query.get_or_404(id)
    data = request.get_json()
    
    reparacion.vehiculo_id = data.get('vehicleId', reparacion.vehiculo_id)
    reparacion.description = data.get('description', reparacion.description)
    if 'startDate' in data:
        reparacion.start_date = datetime.fromisoformat(data['startDate'].replace('Z', '+00:00'))
    if 'endDate' in data and data['endDate']:
        reparacion.end_date = datetime.fromisoformat(data['endDate'].replace('Z', '+00:00'))
    reparacion.status = data.get('status', reparacion.status)
    reparacion.cost = data.get('cost', reparacion.cost)
    reparacion.notes = data.get('notes', reparacion.notes)
    
    db.session.commit()
    
    return jsonify({
        'id': reparacion.id,
        'vehicleId': reparacion.vehiculo_id,
        'description': reparacion.description,
        'startDate': reparacion.start_date.isoformat(),
        'endDate': reparacion.end_date.isoformat() if reparacion.end_date else None,
        'status': reparacion.status,
        'cost': reparacion.cost,
        'notes': reparacion.notes
    }), 200

@reparaciones_bp.route('/reparaciones/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_reparacion(id):
    reparacion = Reparacion.query.get_or_404(id)
    db.session.delete(reparacion)
    db.session.commit()
    return '', 204