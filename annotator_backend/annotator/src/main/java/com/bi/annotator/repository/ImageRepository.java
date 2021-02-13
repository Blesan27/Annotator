package com.bi.annotator.repository;


import com.bi.annotator.model.LabelledImage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ImageRepository extends MongoRepository<LabelledImage,String> {
}
