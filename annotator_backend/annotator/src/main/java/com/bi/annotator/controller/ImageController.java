package com.bi.annotator.controller;

import com.bi.annotator.model.LabelledImage;
import com.bi.annotator.repository.ImageRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.sql.Blob;

@RestController
public class ImageController {

    @Autowired
    ImageRepository imageRepository;

    @PostMapping("/save")
    public void addPhoto(@RequestParam MultipartFile im,@RequestHeader("name")String name,
                         @RequestHeader("quality")String quality,
                         @RequestHeader("label")String label) throws IOException {
        System.out.println(im);

        Binary binary = new Binary(BsonBinarySubType.BINARY, im.getBytes());
        LabelledImage labelledImage = new LabelledImage(label,quality,name, binary);
        imageRepository.save(labelledImage);
    }

}
