package co.com.sofka.crud.controllers;

import co.com.sofka.crud.dtos.TodoListDTO;
import co.com.sofka.crud.services.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoListController {

    @Autowired
    private TodoListService listService;

    @GetMapping(path = "/list")
    public Iterable<TodoListDTO> getAllList() {
        return listService.getAllList();
    }

    @GetMapping(path = "/list/{id}")
    public TodoListDTO getListById(@PathVariable("id") Long id) {
        return listService.getListById(id);
    }

    @PostMapping(path = "/list")
    public TodoListDTO addList(@RequestBody TodoListDTO todoListDTO) {
        return listService.addList(todoListDTO);
    }

    @DeleteMapping(path = "/list/{id}")
    public void deleteList(@PathVariable("id") Long id) {
        listService.deleteList(id);
    }
}
