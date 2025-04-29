from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models import Vehiculo
from app import db

vehiculos_bp = Blueprint('vehiculos', __name__)

@vehiculos_bp.route('/vehiculos', methods=['GET'])
@jwt_required()
def get_vehiculos():
    vehiculos = Vehiculo.query.all()
    return jsonify([{
        'id': v.id,
        'clientId': v.cliente_id,
        'make': v.make,
        'model': v.model,
        'year': v.year,
        'licensePlate': v.license_plate,
        'vin': v.vin,
        'color': v.color
    } for v in vehiculos]), 200

@vehiculos_bp.route('/vehiculos', methods=['POST'])
@jwt_required()
def create_vehiculo():
    data = request.get_json()
    
    vehiculo = Vehiculo(
        cliente_id=data['clientId'],
        make=data['make'],
        model=data['model'],
        year=data['year'],
        license_plate=data['licensePlate'],
        vin=data['vin'],
        color=data['color']
    )
    
    db.session.add(vehiculo)
    db.session.commit()
    
    return jsonify({
        'id': vehiculo.id,
        'clientId': vehiculo.cliente_id,
        'make': vehiculo.make,
        'model': vehiculo.model,
        'year': vehiculo.year,
        'licensePlate': vehiculo.license_plate,
        'vin': vehiculo.vin,
        'color': vehiculo.color
    }), 201

@vehiculos_bp.route('/vehiculos/<int:id>', methods=['PUT'])
@jwt_required()
def update_vehiculo(id):
    vehiculo = Vehiculo.query.get_or_404(id)
    data = request.get_json()
    
    vehiculo.cliente_id = data.get('clientId', vehiculo.cliente_id)
    vehiculo.make = data.get('make', vehiculo.make)
    vehiculo.model = data.get('model', vehiculo.model)
    vehiculo.year = data.get('year', vehiculo.year)
    vehiculo.license_plate = data.get('licensePlate', vehiculo.license_plate)
    vehiculo.vin = data.get('vin', vehiculo.vin)
    vehiculo.color = data.get('color', vehiculo.color)
    
    db.session.commit()
    
    return jsonify({
        'id': vehiculo.id,
        'clientId': vehiculo.cliente_id,
        'make': vehiculo.make,
        'model': vehiculo.model,
        'year': vehiculo.year,
        'licensePlate': vehiculo.license_plate,
        'vin': vehiculo.vin,
        'color': vehiculo.color
    }), 200

@vehiculos_bp.route('/vehiculos/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_vehiculo(id):
    vehiculo = Vehiculo.query.get_or_404(id)
    db.session.delete(vehiculo)
    db.session.commit()
    return '', 204