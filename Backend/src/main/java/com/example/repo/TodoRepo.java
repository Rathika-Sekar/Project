package com.example.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.TodoEntity;

public interface TodoRepo extends JpaRepository<TodoEntity, Long> {

	List<TodoEntity> findByUsername(String username);
	Optional findById(Long id);
}
