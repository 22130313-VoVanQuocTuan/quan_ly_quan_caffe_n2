package com.example.pttkht_n2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.util.List;

@Data
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String username;
    String password;
    String email;
    String sex;
    String name;
    Timestamp dob;
    String role;
    String CCCD;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Order> orders;

}
