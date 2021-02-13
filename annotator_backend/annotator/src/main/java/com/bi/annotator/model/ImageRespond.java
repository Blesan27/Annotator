package com.bi.annotator.model;

import java.io.File;

public class ImageRespond {
    public int imagesLeft;
    public File image;

    public ImageRespond(){}

    public ImageRespond(int imagesLeft, File image) {
        this.imagesLeft = imagesLeft;
        this.image = image;
    }

    public int getImagesLeft() {
        return imagesLeft;
    }

    public void setImagesLeft(int imagesLeft) {
        this.imagesLeft = imagesLeft;
    }

    public File getImage() {
        return image;
    }

    public void setImage(File image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "ImageRespond{" +
                "imagesLeft=" + imagesLeft +
                ", image=" + image +
                '}';
    }
}
