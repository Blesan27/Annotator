package com.bi.annotator;

import com.bi.annotator.model.Users;
import com.bi.annotator.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
//
//        Users user = usersRepository.findByUserName(s);
//
//        if(user == null) {
//            System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
//            throw new UsernameNotFoundException("User not found");
//        }
//        System.out.println("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
//        System.out.println(user.getUserName()+"-  "+user.getPassword());
//        System.out.println(user.getRole());
//        System.out.println(user.getUserName());
//        System.out.println(user.getPassword());
//        System.out.println(user.getEmail());
//        System.out.println(user.getFirstName());
//        System.out.println(user.getLastName());
//        System.out.println(user.getPhoneNumber());
//        List<SimpleGrantedAuthority> authorities = Arrays.stream(user.getRole().split(","))
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
//        return new User(user.getUserName(), user.getPassword(), authorities);

        Users user = usersRepository.findByUserName(s);
        System.out.println("1111111111111111111111111111111111111111111111111111111111111111111111111111");
        if(user == null){
            System.out.println("22222222222222222222222222222222222222222222222222222222222222222222222222222222");
            throw new UsernameNotFoundException("NOT FOUND");
        }
        System.out.println("#3333333333333333333333333333333333333333333333333333333333333333333333333333333333");
        return new MyUserDetails(user);

//        return new mydetailsdemo(s);

    }
}
