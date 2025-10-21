/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/File.java to edit this template
 */

package com.example.fitnesss.service;

import com.example.fitnesss.model.Habito;
import com.example.fitnesss.model.Usuario;
import com.example.fitnesss.repository.HabitoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HabitoService {
    private final HabitoRepository repo;

    public HabitoService(HabitoRepository repo) { this.repo = repo; }

    public List<Habito> listarPorUsuario(Usuario u) { return repo.findByUsuario(u); }
    public List<Habito> listarTodos() { return repo.findAll(); }
    public Optional<Habito> buscar(Long id) { return repo.findById(id); }
    public Habito guardar(Habito h) { return repo.save(h); }
    public void eliminar(Long id) { repo.deleteById(id); }
}
