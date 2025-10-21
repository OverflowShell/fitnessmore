/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/File.java to edit this template
 */

package com.example.fitnesss.service;

import com.example.fitnesss.model.Usuario;
import com.example.fitnesss.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean login(String email, String rawPassword) {
        return usuarioRepository.findByEmail(email)
                .map(usuario -> passwordEncoder.matches(rawPassword, usuario.getPassword()))
                .orElse(false);
    }

    public Usuario register(String nombre, String email, String rawPassword) {
        if (usuarioRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("El usuario con email " + email + " ya existe");
        }
        
        Usuario usuario = new Usuario();
        usuario.setNombre(nombre);
        usuario.setEmail(email);
        usuario.setPassword(passwordEncoder.encode(rawPassword));
        return usuarioRepository.save(usuario);
    }
}