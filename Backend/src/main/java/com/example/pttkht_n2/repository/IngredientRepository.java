package com.example.pttkht_n2.repository;

import com.example.pttkht_n2.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
    Optional<Ingredient> findByCode(String code);
}
