/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/File.java to edit this template
 */

package com.example.fitnesss.repository;

import com.example.fitnesss.model.Registro;
import com.example.fitnesss.model.Habito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RegistroRepository extends JpaRepository<Registro, Long> {
    List<Registro> findByHabito(Habito habito);
    List<Registro> findByHabitoAndFechaBetween(Habito habito, LocalDate desde, LocalDate hasta);
}
