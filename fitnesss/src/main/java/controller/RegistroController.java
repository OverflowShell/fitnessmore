/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/File.java to edit this template
 */

package com.example.fitnesss.controller;

import com.example.fitnesss.model.Registro;
import com.example.fitnesss.model.Habito;
import com.example.fitnesss.service.RegistroService;
import com.example.fitnesss.service.HabitoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/registros")
@CrossOrigin(origins = "http://localhost:3000")
public class RegistroController {
    private final RegistroService registroService;
    private final HabitoService habitoService;

    public RegistroController(RegistroService registroService, HabitoService habitoService) {
        this.registroService = registroService;
        this.habitoService = habitoService;
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Registro r, @RequestParam Long habitoId) {
        Habito h = habitoService.buscar(habitoId).orElse(null);
        if (h == null) return ResponseEntity.badRequest().body("Hábito no encontrado");
        r.setHabito(h);
        Registro saved = registroService.guardar(r);
        return ResponseEntity.status(201).body(saved);
    }

    @GetMapping("/habito/{habitoId}")
    public ResponseEntity<?> porHabito(@PathVariable Long habitoId) {
        Habito h = habitoService.buscar(habitoId).orElse(null);
        if (h == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(registroService.porHabito(h));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable Long id) {
        return registroService.buscar(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        registroService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/habito/{habitoId}/rango")
    public ResponseEntity<?> porHabitoRango(@PathVariable Long habitoId,
                                            @RequestParam String desde,
                                            @RequestParam String hasta) {
        Habito h = habitoService.buscar(habitoId).orElse(null);
        if (h == null) return ResponseEntity.notFound().build();
        LocalDate d = LocalDate.parse(desde);
        LocalDate h2 = LocalDate.parse(hasta);
        List<?> list = registroService.porHabitoEntre(h, d, h2);
        return ResponseEntity.ok(list);
    }
}
