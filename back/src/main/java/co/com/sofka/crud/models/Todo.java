package co.com.sofka.crud.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "todo")
public class Todo implements Serializable {
    @Id
    @Column(name = "id_todo")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 25, nullable = false)
    private String name;

    @Column(name = "completed")
    private Boolean completed = false;

    /*
     @ManyToOne:
         Relación de dependencia entre tablas de muchos Todos a una TodoList.
     (param) optional = false:
         Establece que es un dato requerido y dicta que no puede existir un To-do sin una TodoList.
   */
    @ManyToOne(optional = false)
    @JoinColumn(name = "id_list")
    private TodoList list;

    public Todo() {
    }

    public Todo(String name, Boolean completed, TodoList list) {
        this.name = name;
        this.completed = completed;
        this.list = list;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public TodoList getList() {
        return list;
    }

    public void setList(TodoList list) {
        this.list = list;
    }
}
