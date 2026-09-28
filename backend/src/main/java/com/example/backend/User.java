package com.example.backend;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String blaze;

    private String mdp;

    public User() {
    }

    public User(String blaze, String mdp) {
        this.blaze = blaze;
        this.mdp = mdp;
    }

    public Long getId() {
        return id;
    }

    public String getBlaze() {
        return blaze;
    }

    public void setBlaze(String blaze) {
        this.blaze = blaze;
    }

    public String getMdp() {
        return mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }
}
