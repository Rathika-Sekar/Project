package com.example.service;


import org.springframework.stereotype.Service;

import com.example.entity.TodoEntity;
import com.example.entity.UserEntity;
@Service
public interface TodoServices {

	String createUser(UserEntity entity);
	String authenticate(String username, String password);
	TodoEntity addTodo(TodoEntity todo);
	TodoEntity updateTodo(Long id);
	List<TodoEntity> getTodos(String username);
	boolean delete(Long id);
}