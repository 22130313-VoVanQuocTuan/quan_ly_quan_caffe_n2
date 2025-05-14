package com.example.pttkht_n2.repository;

import com.example.pttkht_n2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    boolean existsByEmail(String email);

    boolean existsByUsername( String username);

    User findByUsername(String username);


}
