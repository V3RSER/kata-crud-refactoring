package co.com.sofka.crud.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "todo_list")
public class TodoList implements Serializable {
    @Id
    @Column(name = "id_list")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", length = 25, nullable = false)
    private String name;

    /*
     @OneToMany:
            Relación de dependencia entre tablas de una TodoList a muchos To-do.
     (param) cascade = CascadeType.ALL:
            Establece una relación de dependencia para que al aplicar operaciones a una estancia de TodoList también se
            apliquen a los To-do dentro de la colección "todos".
     (param) orphanRemoval = true:
            Establece una relación de dependencia para que al eliminar una instancia de TodoList también se eliminen
            los To-do dentro de la colección "todos".
    */
    @OneToMany(mappedBy = "list", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Todo> todos = new HashSet<>();

    public TodoList() {
    }

    public TodoList(String name) {
        this.name = name;
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

    public Set<Todo> getTodos() {
        return todos;
    }

    public void setTodos(Set<Todo> todos) {
        this.todos = todos;
    }
}
