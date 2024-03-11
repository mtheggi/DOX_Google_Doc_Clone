package com.dox_google_doc_clone.dox_google_doc_clone;
import com.dox_google_doc_clone.dox_google_doc_clone.User.User;

import com.dox_google_doc_clone.dox_google_doc_clone.User.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DoxGoogleDocCloneApplication implements CommandLineRunner {

	@Autowired
	private UserRepository repository;

	public static void main(String[] args) {
		SpringApplication.run(DoxGoogleDocCloneApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		repository.deleteAll();

		// save a couple of customers
		repository.save(new User( "smith", "123123" ,"Smith@gmail.com" ));
		repository.save(new User( "moyasser", "123123" ,"moyasser@gmail.com" ));

		// fetch all Users
		System.out.println("Users found with findAll():");
		System.out.println("-------------------------------");
		for (User user : repository.findAll()) {
			System.out.println(user);
		}

	}

}



