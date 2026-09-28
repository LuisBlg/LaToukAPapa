package com.example.backend;

public class LoginRequest {

    private String blaze;
    private String mdp;

    public LoginRequest() {
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
