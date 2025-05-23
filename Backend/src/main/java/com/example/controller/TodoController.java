package com.example.controller;

import java.util.List;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.TodoEntity;
import com.example.entity.UserEntity;
import com.example.service.TodoServices;
import com.example.serviceImpl.TodoServiceImpl;

import jakarta.servlet.http.HttpSession;
@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class TodoController {
	@Autowired
	TodoServices todoservice;
	@Autowired
	TodoServiceImpl todoserviceImpl;
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody UserEntity users)
	{
		return new ResponseEntity<>(todoservice.createUser(users), HttpStatus.CREATED);
		
	}
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserEntity users,HttpSession session)
	{
		String username = users.getUsername().trim().toLowerCase();
		String pass=users.getPassword();
		String result = todoservice.authenticate(username, pass);
		if (result.equals("User Logged in successfully!")) {
	        session.setAttribute("currentUser", username); // ✅ Save to session
	        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
	    } else {
	        return new ResponseEntity<>(result, HttpStatus.UNAUTHORIZED);
	    }
		
	}
	@GetMapping("/todo/current-user")
	public ResponseEntity<String> getCurrentUser(HttpSession session) {
		String username = (String) session.getAttribute("currentUser");

	    if (username == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
	    }

	    return ResponseEntity.ok(username);
	}

	 @PostMapping("/todo/{username}")
	public ResponseEntity<?> createTodo(@PathVariable String username,@RequestBody TodoEntity todo) {
		 todo.setUsername(username); 
        return new ResponseEntity<>(todoserviceImpl.addTodo(todo), HttpStatus.CREATED);
    }
	 @GetMapping("/todo/{username}")
	 public ResponseEntity<List<TodoEntity>> getTodosByUsername(@PathVariable String username) {
	     List<TodoEntity> todos = todoserviceImpl.getTodos(username);
	     return new ResponseEntity<>(todos, HttpStatus.OK);
	 }
	 @PutMapping("/todo/{id}")
	 public ResponseEntity<?> toggleTodo(@PathVariable Long id) {
		    TodoEntity updatedTodo = todoserviceImpl.updateTodo(id);
		    return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
	}
	 @DeleteMapping("/todo/{id}")
	 public ResponseEntity<?> deleteTodo(@PathVariable Long id){
		 boolean del=todoserviceImpl.delete(id);
			if(del)
			{
				return new ResponseEntity<>("Todo is deleted",HttpStatus.OK);
			}
			return new ResponseEntity<>("Unable to find todo",HttpStatus.NOT_FOUND);
		}
}
