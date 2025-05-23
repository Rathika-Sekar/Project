package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.UserEntity;
@Repository
public interface UserRepo extends JpaRepository<UserEntity,String>{
	boolean existsById(String username);
//	UserEntity findByUsername(String username);

	
}