package com.example.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="users")
public class UserEntity {

	@Id
	@Column(name= "Username")
	private String username;
	@Column(name= "Email")
	private String email;
	@Column(name= "Password")
	private String password;
}
