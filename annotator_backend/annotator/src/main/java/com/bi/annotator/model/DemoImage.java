package com.bi.annotator.model;

import java.util.Arrays;

public class DemoImage {
    byte[] image;

    public DemoImage(){
    }
    public DemoImage(byte[] image) {
        this.image = image;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "DemoImage{" +
                "image=" + Arrays.toString(image) +
                '}';
    }
}
