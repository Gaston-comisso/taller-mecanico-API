from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from app.models import Usuario
from app import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = Usuario.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity={
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'role': user.role
        })
        return jsonify({
            'token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'role': user.role
            }
        }), 200
    return jsonify({'error': 'Credenciales inválidas'}), 401

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if Usuario.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'El email ya está registrado'}), 400
        
    if Usuario.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'El nombre de usuario ya está en uso'}), 400
    
    user = Usuario(
        username=data['username'],
        email=data['email'],
        role='receptionist'
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'Usuario registrado exitosamente'}), 201

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    return jsonify(current_user), 200