package co.com.sofka.crud.services;

import co.com.sofka.crud.dtos.TodoDTO;
import co.com.sofka.crud.models.Todo;
import co.com.sofka.crud.repositories.TodoListRepository;
import co.com.sofka.crud.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

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
        return todoModelToDTO(this.todoRepository.findById(id).get());
    }

    public TodoDTO addTodoByListId(TodoDTO todoDTO, long idList) {
        return todoModelToDTO(
                todoRepository.save(
                        new Todo(
                                todoDTO.getName(),
                                todoDTO.isCompleted(),
                                listRepository.findById(idList).get()
                        )));
    }

    public TodoDTO updateTodo(TodoDTO todoDTO, long id) {
        Optional<Todo> oldTodo = this.todoRepository.findById(id);
        oldTodo.get().setList(listRepository.findById(todoDTO.getIdList()).get());
        oldTodo.get().setId(todoDTO.getId());
        oldTodo.get().setName(todoDTO.getName());
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
