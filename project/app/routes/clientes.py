from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models import Cliente
from app import db

clientes_bp = Blueprint('clientes', __name__)

@clientes_bp.route('/clientes', methods=['GET'])
@jwt_required()
def get_clientes():
    clientes = Cliente.query.all()
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'email': c.email,
        'phone': c.phone,
        'address': c.address,
        'created_at': c.created_at.isoformat()
    } for c in clientes]), 200

@clientes_bp.route('/clientes', methods=['POST'])
@jwt_required()
def create_cliente():
    data = request.get_json()
    
    cliente = Cliente(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        address=data['address']
    )
    
    db.session.add(cliente)
    db.session.commit()
    
    return jsonify({
        'id': cliente.id,
        'name': cliente.name,
        'email': cliente.email,
        'phone': cliente.phone,
        'address': cliente.address,
        'created_at': cliente.created_at.isoformat()
    }), 201

@clientes_bp.route('/clientes/<int:id>', methods=['PUT'])
@jwt_required()
def update_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    data = request.get_json()
    
    cliente.name = data.get('name', cliente.name)
    cliente.email = data.get('email', cliente.email)
    cliente.phone = data.get('phone', cliente.phone)
    cliente.address = data.get('address', cliente.address)
    
    db.session.commit()
    
    return jsonify({
        'id': cliente.id,
        'name': cliente.name,
        'email': cliente.email,
        'phone': cliente.phone,
        'address': cliente.address,
        'created_at': cliente.created_at.isoformat()
    }), 200

@clientes_bp.route('/clientes/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    db.session.delete(cliente)
    db.session.commit()
    return '', 204