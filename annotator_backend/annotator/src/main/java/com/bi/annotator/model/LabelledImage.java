package com.bi.annotator.model;

import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Blob;

@Document(collection = "LabelledImages")
public class LabelledImage {

    public String label;
    public String quality;
    public String name;
    public Binary image;

    public LabelledImage(){}


    public LabelledImage(String label, String quality, String name, Binary image) {
        this.label = label;
        this.quality = quality;
        this.name = name;
        this.image = image;
    }

    public LabelledImage(String hi, String good, String name, String blob) {
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getQuality() {
        return quality;
    }

    public void setQuality(String quality) {
        this.quality = quality;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Binary getImage() {
        return image;
    }

    public void setImage(Binary image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "LabelledImage{" +
                "label='" + label + '\'' +
                ", quality='" + quality + '\'' +
                ", name='" + name + '\'' +
                ", image=" + image +
                '}';
    }
}
