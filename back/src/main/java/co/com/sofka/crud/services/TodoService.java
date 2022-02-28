package co.com.sofka.crud.services;

import co.com.sofka.crud.dtos.TodoDTO;
import co.com.sofka.crud.models.Todo;
import co.com.sofka.crud.models.TodoList;
import co.com.sofka.crud.repositories.TodoListRepository;
import co.com.sofka.crud.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;
    @Autowired
    private TodoListRepository listRepository;

    public Set<TodoDTO> getAllTodo() {
        Set<TodoDTO> todoDTOS = new HashSet<>();
        todoRepository.findAll().forEach(todoList -> todoDTOS.add(todoModelToDTO(todoList)));
        return todoDTOS;
    }

    public TodoDTO getTodoById(Long id) {
        Optional<Todo> todo = this.todoRepository.findById(id);
        if (todo.isEmpty()) {
            throw new ShowException("El id no existe");
        }
        return todoModelToDTO(todo.get());
    }

    public Set<TodoDTO> getAllTodoByLisId(Long idList) {
        // Comprobando existencia de la lista
        Optional<TodoList> listTodo = listRepository.findById(idList);
        if (listTodo.isEmpty()) {
            throw new ShowException("El id de List no existe");
        }
        return listTodo.get().getTodos().stream().map(TodoService::todoModelToDTO).collect(Collectors.toSet());
    }

    public TodoDTO addTodoByListId(TodoDTO todoDTO, long idList) {
        // Comprobando existencia de la lista a modificar
        Optional<TodoList> listTodo = listRepository.findById(idList);
        if (listTodo.isEmpty()) {
            throw new ShowException("El id de List no existe");
        }

        // Validando carácteres del nombre en el todoDTO
        String nameDTO = todoDTO.getName();
        if (nameDTO == null || nameDTO.isEmpty()) {
            throw new ShowException("El nombre de TO-DO está vacío");
        } else if (nameDTO.length() > 25) {
            throw new ShowException("El nombre de TO-DO excede el número de carácteres");
        }

        return todoModelToDTO(todoRepository.save(new Todo(nameDTO, todoDTO.isCompleted(), listTodo.get())));
    }

    public TodoDTO updateTodo(TodoDTO todoDTO, long id) {
        // Comprobando existencia del to-do a modificar
        Optional<Todo> oldTodo = this.todoRepository.findById(id);
        if (oldTodo.isEmpty()) {
            throw new ShowException("El id del TO-DO no existe");
        }
        // Validando carácteres del nombre en el todoDTO
        String nameDTO = todoDTO.getName();
        if (nameDTO == null || nameDTO.isEmpty()) {
            throw new ShowException("El nombre del TO-DO está vacío");
        } else if (nameDTO.length() > 25) {
            throw new ShowException("El nombre del TO-DO excede el número de carácteres");
        }
        // Comprobando existencia de la lista del todoDTO
        Long listIdDTO = todoDTO.getIdList();
        if (listIdDTO != null) {
            Optional<TodoList> listDTO = listRepository.findById(listIdDTO);
            if (listDTO.isEmpty()) {
                throw new ShowException("El idList del TO-DO no existe");
            }
            // Se establece la lista que coincide con el el id
            oldTodo.get().setList(listDTO.get());
        }
        // Comprobando id del todoDTO
        if (todoDTO.getId() != null) {
            oldTodo.get().setId(todoDTO.getId());
        }

        oldTodo.get().setName(nameDTO);
        oldTodo.get().setCompleted(todoDTO.isCompleted());

        return todoModelToDTO(todoRepository.save(oldTodo.get()));
    }

    public void deleteTodo(Long id) {
        getTodoById(id);
        this.todoRepository.deleteById(id);
    }

    public static TodoDTO todoModelToDTO(Todo todo) {
        return new TodoDTO(todo.getId(), todo.getName(), todo.isCompleted(), todo.getList().getId());
    }
}
