package com.bi.annotator.controller;

import com.bi.annotator.FileUploadController;
import com.bi.annotator.MyUserDetailsService;
import com.bi.annotator.model.*;
import com.bi.annotator.repository.UsersRepository;
import com.bi.annotator.util.jwtUtil;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class UsersController {
    public int counter=0;
    @Autowired
    UsersRepository usersRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    MyUserDetailsService userDetailsService;

    @Autowired
    jwtUtil jwtutil;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception{
        try {
            System.out.println(authenticationRequest.getUserName()+"  "+authenticationRequest.getPassword());
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(),authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e){
            throw new Exception("Incorrect UserName or Password",e);
        }

        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUserName());
        final String jwt = jwtutil.geerateToken(userDetails);
        System.out.println(("55%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% "+authenticationRequest.getUserName()));
        Users  users = usersRepository.findByUserName(authenticationRequest.getUserName());
        System.out.println(jwt);
        if(users ==null){
            return ResponseEntity.ok(new AuthenticateResponse(jwt,"User"));
        }
        return ResponseEntity.ok(new AuthenticateResponse(jwt,users.getRole()));

    }

    @GetMapping("users/{id}")
    public Optional<Users> getUserById(@PathVariable String id){
        return usersRepository.findById(id);
    }

    @PostMapping("/users")
    public void addUsers(@RequestBody Users users){
//        Calendar cal = Calendar.getInstance();
//        users.setDOB(cal.getTime());
        usersRepository.save(users);
    }

    @GetMapping("/users")
    public List<Users> getAllUsers(){
        return usersRepository.findAll();
    }

    @DeleteMapping("/users")
    public void deleteUserByUsername(@RequestBody Users user){
        usersRepository.delete(user);
    }

    @GetMapping("/getImage")
    public ImageRespond giveImage(@RequestHeader("userName")String userName){
        int noofimages;
        File[] totalImages = new File(FileUploadController.UploadDir).listFiles();
        if(totalImages!=null) {
            noofimages = totalImages.length;
            System.out.println(totalImages.length);
            ImageRespond imageRespond = new ImageRespond();
            imageRespond.setImagesLeft(noofimages-counter);
            imageRespond.setImage(totalImages[counter]);
            return imageRespond;
        }else {
            noofimages = 0;
        }


        counter++;
        return null;
    }

    @GetMapping("/demo")
    public byte[] getDemo(@RequestHeader("userName")String userName) throws IOException {
        int noofImages;
        File[] totalImages = new File(FileUploadController.UploadDir).listFiles();

        if(totalImages!=null) {
            noofImages = totalImages.length;
            if(counter>=noofImages){
                counter=0;
            }

            Users user = usersRepository.findByUserName(userName);
            user.setNoOfImagesAnnotated(user.getNoOfImagesAnnotated()+1);
            usersRepository.save(user);
            return convertFileContentToBlob(totalImages[counter++]);
        }else{
            return null;
        }


    }

    public static byte[] convertFileContentToBlob(File file) throws IOException {
        // create file object
//        File file = new File(filePath);
        // initialize a byte array of size of the file
        byte[] fileContent = new byte[(int) file.length()];
        FileInputStream inputStream = null;
        try {
            // create an input stream pointing to the file
            inputStream = new FileInputStream(file);
            // read the contents of file into byte array
            inputStream.read(fileContent);
        } catch (IOException e) {
            throw new IOException("Unable to convert file to byte array. " +
                    e.getMessage());
        } finally {
            // close input stream
            if (inputStream != null) {
                inputStream.close();
            }
        }
        return fileContent;
    }

    @GetMapping("/left")
    public Left getLeft(){
        int noof;
        File[] totalImages = new File(FileUploadController.UploadDir).listFiles();

        if(totalImages!=null) {
            noof = totalImages.length;
            return new Left(noof - counter);
        }
        else
            return new Left(0);

    }



}
