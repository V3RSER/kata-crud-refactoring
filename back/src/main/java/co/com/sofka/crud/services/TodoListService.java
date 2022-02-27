package co.com.sofka.crud.services;

import co.com.sofka.crud.dtos.TodoListDTO;
import co.com.sofka.crud.models.TodoList;
import co.com.sofka.crud.repositories.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TodoListService {

    @Autowired
    private TodoListRepository listRepository;

    public Set<TodoListDTO> getAllList() {
        Set<TodoListDTO> todoListDTOS = new HashSet<>();
        listRepository.findAll().forEach(todoList -> todoListDTOS.add(listModelToDTO(todoList)));
        return todoListDTOS;
    }

    public TodoListDTO getListById(Long id) {
        Optional<TodoList> todoList = this.listRepository.findById(id);
        if (todoList.isEmpty()) {
            throw new ShowException("El id no existe");
        }
        return listModelToDTO(todoList.get());
    }

    public TodoListDTO addList(TodoListDTO todoListDTO) {
        String nameList = todoListDTO.getName();
        if (nameList.isEmpty()) {
            throw new ShowException("El nombre está vacío");
        } else if (nameList.length() > 25) {
            throw new ShowException("El nombre excede el número de carácteres");
        }
        return listModelToDTO(listRepository.save(new TodoList(nameList)));
    }

    public void deleteList(Long id) {
        getListById(id);
        listRepository.deleteById(id);
    }

    public static TodoListDTO listModelToDTO(TodoList todoList) {
        return new TodoListDTO(
                todoList.getId(),
                todoList.getName(),
                /*
                collect(Collectors.toSet()) convierte el Stream<Object> que devuelve el stream().map() en la colección
                requerida por el constructor de TodoListDTO, la cual es Set<TodoDTO>
                */
                todoList.getTodos().stream().map(TodoService::todoModelToDTO).collect(Collectors.toSet())
        );
    }
}