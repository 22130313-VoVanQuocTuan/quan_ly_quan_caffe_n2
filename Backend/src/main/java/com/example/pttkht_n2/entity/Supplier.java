package com.example.pttkht_n2.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@Entity
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "supplier")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id ;
            String name;
            String contact;
            String address;

            @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
            List<Inventory> inventories;

}
