/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/File.java to edit this template
 */
package com.example.fitnesss.controller;

import com.example.fitnesss.model.Usuario;
import com.example.fitnesss.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {
    private final UsuarioService service;

    public UsuarioController(UsuarioService service) { this.service = service; }

    @GetMapping
    public List<Usuario> listar() { return service.listar(); }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtener(@PathVariable Long id) {
        return service.buscar(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Usuario u) {
        if (u.getEmail() != null && service.existeEmail(u.getEmail())) {
            return ResponseEntity.badRequest().body("Email ya registrado");
        }
        Usuario saved = service.guardar(u);
        // no devolver password
        saved.setPassword(null);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Long id, @RequestBody Usuario u) {
        return service.buscar(id).map(existing -> {
            existing.setNombre(u.getNombre());
            existing.setEmail(u.getEmail());
            if (u.getPassword() != null) existing.setPassword(u.getPassword());
            existing.setEdad(u.getEdad());
            existing.setPeso(u.getPeso());
            existing.setAltura(u.getAltura());
            Usuario updated = service.guardar(existing);
            updated.setPassword(null);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (service.buscar(id).isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
