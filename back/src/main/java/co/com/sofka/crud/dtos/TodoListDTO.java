package co.com.sofka.crud.dtos;

import java.util.HashSet;
import java.util.Set;

public class TodoListDTO {
    private Long id;
    private String name;
    /*
    Se optó por utilizar la colección Set para los Todos gracias al siguiente diagrama:
    https://www.adictosaltrabajo.com/wp-content/uploads/2015/09/java-collections-img1.png

    Ya que no deben existir entidades To-do duplicadas porque tienen un id único. A su vez, se utilizará para manipular
    los datos y el orden no es relevante.
     */
    private Set<TodoDTO> todos = new HashSet<>();

    public TodoListDTO() {
        super();
    }

    public TodoListDTO(Long id, String name, Set<TodoDTO> todos) {
        this.id = id;
        this.name = name;
        this.todos = todos;
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

    public Set<TodoDTO> getTodos() {
        return todos;
    }

    public void setTodos(Set<TodoDTO> todos) {
        this.todos = todos;
    }
}
