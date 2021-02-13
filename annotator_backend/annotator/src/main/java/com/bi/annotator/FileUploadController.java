package com.bi.annotator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class FileUploadController {
    public static String relativeUrl = "/images";
    public static String UploadDir = System.getProperty("user.dir")+relativeUrl;

    @RequestMapping("/upload")
    public String UploadPage(@RequestParam MultipartFile[] files) throws IOException {
        StringBuilder fileNames = new StringBuilder();

        for(MultipartFile file :files){
            Path fileNameAndPath = Paths.get(UploadDir, file.getOriginalFilename());
            fileNames.append((file.getOriginalFilename()));
            System.out.println(fileNames);
            try{
                Files.write(fileNameAndPath,file.getBytes());
            }catch (IOException e){
                e.printStackTrace();;
            }
        }
        System.out.println(fileNames);

        return "Succesful";
    }

}
