/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/File.java to edit this template
 */

package com.example.fitnesss.service;

import com.example.fitnesss.model.Registro;
import com.example.fitnesss.model.Habito;
import com.example.fitnesss.repository.RegistroRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RegistroService {
    private final RegistroRepository repo;

    public RegistroService(RegistroRepository repo) { this.repo = repo; }

    public Registro guardar(Registro r) { return repo.save(r); }
    public Optional<Registro> buscar(Long id) { return repo.findById(id); }
    public List<Registro> porHabito(Habito h) { return repo.findByHabito(h); }
    public List<Registro> porHabitoEntre(Habito h, LocalDate desde, LocalDate hasta) {
        return repo.findByHabitoAndFechaBetween(h, desde, hasta);
    }
    public void eliminar(Long id) { repo.deleteById(id); }
}
