package com.bi.annotator.model;

public class Left {
    int left;

    public Left(){}
    public Left(int left) {
        this.left = left;
    }

    public int getLeft() {
        return left;
    }

    public void setLeft(int left) {
        this.left = left;
    }

    @Override
    public String toString() {
        return "Left{" +
                "left=" + left +
                '}';
    }
}
