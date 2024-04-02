package com.dox_google_doc_clone.dox_google_doc_clone;
import com.dox_google_doc_clone.dox_google_doc_clone.Models.User;

import com.dox_google_doc_clone.dox_google_doc_clone.Repositories.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
public class DoxGoogleDocCloneApplication {



	public static void main(String[] args) {
		SpringApplication.run(DoxGoogleDocCloneApplication.class, args);
	}



}



