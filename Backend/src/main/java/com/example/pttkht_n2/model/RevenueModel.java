package com.example.pttkht_n2.model;

import java.io.Serializable;
import java.time.LocalDate;

public class RevenueModel implements Serializable {
    private LocalDate date;
    private double revenue;
    private int numberOfOrder;

    public RevenueModel() {
    }

    public RevenueModel(LocalDate date, double revenue, int numberOfOrder) {
        this.date = date;
        this.revenue = revenue;
        this.numberOfOrder = numberOfOrder;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }

    public int getNumberOfOrder() {
        return numberOfOrder;
    }

    public void setNumberOfOrder(int numberOfOrder) {
        this.numberOfOrder = numberOfOrder;
    }
}
