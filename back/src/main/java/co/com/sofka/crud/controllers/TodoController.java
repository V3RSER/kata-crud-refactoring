package co.com.sofka.crud.controllers;

import co.com.sofka.crud.dtos.TodoDTO;
import co.com.sofka.crud.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping(path = "todo")
    public Iterable<TodoDTO> getAllTodo() {
        return todoService.getAllTodo();
    }

    @GetMapping(path = "todo/{id}")
    public TodoDTO getTodoById(@PathVariable("id") Long id) {
        return todoService.getTodoById(id);
    }

    @GetMapping(path = "todo/list/{idList}")
    public Iterable<TodoDTO> getAllTodoByLisId(@PathVariable("idList") Long idList) {
        return todoService.getAllTodoByLisId(idList);
    }

    @PostMapping(path = "todo/list/{idList}")
    public TodoDTO addTodoByListId(@RequestBody TodoDTO todoDTO, @PathVariable("idList") Long idList) {
        return todoService.addTodoByListId(todoDTO, idList);
    }

    @DeleteMapping(path = "/todo/{id}")
    public void deleteTodo(@PathVariable("id") Long id) {
        todoService.deleteTodo(id);
    }

    @PutMapping(path = "/todo/{id}")
    public TodoDTO updateTodo(@RequestBody TodoDTO todoDTO, @PathVariable("id") Long id) {
        return todoService.updateTodo(todoDTO, id);
    }
}
