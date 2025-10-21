/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/File.java to edit this template
 */

package com.example.fitnesss.service;

import com.example.fitnesss.model.Meta;
import com.example.fitnesss.model.Usuario;
import com.example.fitnesss.repository.MetaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MetaService {
    private final MetaRepository repo;

    public MetaService(MetaRepository repo) { this.repo = repo; }

    public List<Meta> listarPorUsuario(Usuario u) { return repo.findByUsuario(u); }
    public Optional<Meta> buscar(Long id) { return repo.findById(id); }
    public Meta guardar(Meta m) { return repo.save(m); }
    public void eliminar(Long id) { repo.deleteById(id); }
}
