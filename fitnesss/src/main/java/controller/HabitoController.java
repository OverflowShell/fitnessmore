/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/File.java to edit this template
 */
package com.example.fitnesss.controller;

import com.example.fitnesss.model.Habito;
import com.example.fitnesss.model.Usuario;
import com.example.fitnesss.service.HabitoService;
import com.example.fitnesss.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habitos")
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "habito-controller", description = "Endpoints para gestión de hábitos")
public class HabitoController {
    private final HabitoService habitoService;
    private final UsuarioService usuarioService;

    public HabitoController(HabitoService habitoService, UsuarioService usuarioService) {
        this.habitoService = habitoService;
        this.usuarioService = usuarioService;
    }

    @Operation(summary = "Listar todos los hábitos", description = "Obtiene todos los hábitos del sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de hábitos obtenida exitosamente"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping
    public List<Habito> listarTodos() { 
        return habitoService.listarTodos(); 
    }

    @Operation(summary = "Obtener hábito por ID", description = "Obtiene un hábito específico por su ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Hábito encontrado"),
        @ApiResponse(responseCode = "404", description = "Hábito no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Habito> obtener(
            @Parameter(description = "ID del hábito", required = true)
            @PathVariable Long id) {
        
        return habitoService.buscar(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Crear nuevo hábito", description = "Crea un nuevo hábito en el sistema")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Hábito creado exitosamente"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos o usuario no encontrado"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping
    public ResponseEntity<?> crear(
            @Parameter(description = "Datos del hábito a crear", required = true)
            @RequestBody Habito h,
            @Parameter(description = "ID del usuario asociado (opcional)")
            @RequestParam(required = false) Long usuarioId) {
        
        if (usuarioId != null) {
            Usuario u = usuarioService.buscar(usuarioId).orElse(null);
            if (u == null) return ResponseEntity.badRequest().body("Usuario no encontrado");
            h.setUsuario(u);
        }
        Habito saved = habitoService.guardar(h);
        return ResponseEntity.status(201).body(saved);
    }

    @Operation(summary = "Actualizar hábito", description = "Actualiza un hábito existente")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Hábito actualizado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Hábito no encontrado"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(
            @Parameter(description = "ID del hábito a actualizar", required = true)
            @PathVariable Long id,
            @Parameter(description = "Nuevos datos del hábito", required = true)
            @RequestBody Habito h) {
        
        return habitoService.buscar(id).map(existing -> {
            existing.setNombre(h.getNombre());
            existing.setDescripcion(h.getDescripcion());
            existing.setCategoria(h.getCategoria());
            existing.setUnidad(h.getUnidad());
            existing.setObjetivo(h.getObjetivo());
            Habito updated = habitoService.guardar(existing);
            return ResponseEntity.ok(updated);
        }).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Eliminar hábito", description = "Elimina un hábito por ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Hábito eliminado exitosamente"),
        @ApiResponse(responseCode = "404", description = "Hábito no encontrado"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @Parameter(description = "ID del hábito a eliminar", required = true)
            @PathVariable Long id) {
        
        habitoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Obtener hábitos por usuario", description = "Obtiene todos los hábitos de un usuario específico")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Hábitos del usuario obtenidos exitosamente"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<?> porUsuario(
            @Parameter(description = "ID del usuario", required = true)
            @PathVariable Long usuarioId) {
        
        Usuario u = usuarioService.buscar(usuarioId).orElse(null);
        if (u == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(habitoService.listarPorUsuario(u));
    }

    @Operation(summary = "Obtener hábitos por categoría", description = "Obtiene hábitos filtrados por categoría")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Hábitos filtrados obtenidos exitosamente"),
        @ApiResponse(responseCode = "400", description = "Categoría no especificada")
    })
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Habito>> porCategoria(
            @Parameter(description = "Categoría para filtrar", required = true)
            @PathVariable String categoria) {
        
        // Necesitarías agregar este método en HabitoService y HabitoRepository
        // List<Habito> habitos = habitoService.listarPorCategoria(categoria);
        // return ResponseEntity.ok(habitos);
        
        return ResponseEntity.ok(List.of()); // Placeholder - implementar según necesidad
    }
}