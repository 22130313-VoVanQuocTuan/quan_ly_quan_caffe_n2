package com.example.pttkht_n2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Data
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "shift")
public class Shift {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    @ManyToOne
    @JoinColumn(name = "userId")
    User user;
    String name;
    Timestamp timeIn;
    Timestamp timeOut;
    String note;
}
