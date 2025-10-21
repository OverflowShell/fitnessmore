/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/File.java to edit this template
 */

package com.example.fitnesss.controller;

import com.example.fitnesss.model.Meta;
import com.example.fitnesss.model.Usuario;
import com.example.fitnesss.service.MetaService;
import com.example.fitnesss.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "http://localhost:3000")
public class MetaController {
    private final MetaService metaService;
    private final UsuarioService usuarioService;

    public MetaController(MetaService metaService, UsuarioService usuarioService) {
        this.metaService = metaService;
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Meta> listar() { return metaService.listarPorUsuario(null); /* fallback: list all? handled below */ }

    @GetMapping("/{id}")
    public ResponseEntity<Meta> obtener(@PathVariable Long id) {
        return metaService.buscar(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Meta m, @RequestParam(required = false) Long usuarioId) {
        if (usuarioId != null) {
            Usuario u = usuarioService.buscar(usuarioId).orElse(null);
            if (u == null) return ResponseEntity.badRequest().body("Usuario no encontrado");
            m.setUsuario(u);
        }
        Meta saved = metaService.guardar(m);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody Meta m) {
        return metaService.buscar(id).map(existing -> {
            existing.setNombre(m.getNombre());
            existing.setDescripcion(m.getDescripcion());
            existing.setFechaInicio(m.getFechaInicio());
            existing.setFechaFin(m.getFechaFin());
            existing.setEstado(m.getEstado());
            Meta updated = metaService.guardar(existing);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        metaService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> metasPorUsuario(@PathVariable Long usuarioId) {
        Usuario u = usuarioService.buscar(usuarioId).orElse(null);
        if (u == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(metaService.listarPorUsuario(u));
    }
}
