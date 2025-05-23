package com.example.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name ="todos")
public class TodoEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name= "id")
	private Long id;
	@Column(name="username")
	private String username;
	@Column(name= "task_date")
	private String date;
	@Column(name= "task")
    private String task;
	@Column(name= "completed")
    private boolean completed;
	

}
