package com.example.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import com.example.entity.TodoEntity;
import com.example.entity.UserEntity;
import com.example.repo.TodoRepo;
import com.example.repo.UserRepo;
import com.example.service.TodoServices;
@Component
public class TodoServiceImpl implements TodoServices{
	@Autowired
	UserRepo userrepo;
	@Autowired
	TodoRepo todorepo;
	@Override
	public String createUser(UserEntity user) {
	    String username = user.getUsername().trim().toLowerCase();

	    if (userrepo.existsById(username)) {
	        throw new RuntimeException("Username already exists!");
	    }
	    user.setUsername(username);
	    userrepo.save(user);
	    return "User registered successfully!";
	}
	@Override
	public String authenticate(String username, String password) {
	    if(!userrepo.existsById(username)) {
	    	return "Username not found";
	    }
	    Optional<UserEntity> user1 = userrepo.findById(username);

	    if (userrepo.findById(username).isEmpty()) {
	        return "Username not found"; 
	    }
	    UserEntity user = user1.get();
	    if (!user.getPassword().equals(password)) {
	        return "Invalid credentials";
	    }

	    return "User Logged in successfully!";
	}
	@Override
	public TodoEntity addTodo(TodoEntity todo) {
			return todorepo.save(todo);
		
	}
	@Override
	public List<TodoEntity> getTodos(String username){
		
		return todorepo.findByUsername(username);
	}
	@Override
	public TodoEntity updateTodo(Long id) {
		Optional<TodoEntity> updatetodo = todorepo.findById(id);
		if (updatetodo.isPresent()) {
	        TodoEntity todo = updatetodo.get();
	        todo.setCompleted(!todo.isCompleted());
	        return todorepo.save(todo);
		}
		return null;
		
	}
	@Override
	public boolean delete(Long id) {
		Optional<TodoEntity> updatetodo = todorepo.findById(id);
		if (updatetodo.isPresent()) {
	        todorepo.deleteById(id);
	        return true;
		}
		return false;	
	}

	

	
	

	
	

}