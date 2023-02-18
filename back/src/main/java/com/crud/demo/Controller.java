package com.crud.demo;

import ch.qos.logback.core.net.server.Client;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/cliente")
public class Controller {

    private Repository repository;

    Controller(Repository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Cliente> findAll() {
        return repository.findAll();
    }

    @GetMapping(path = {"/{id}"})
    public ResponseEntity findById(@PathVariable long id) {
        return repository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.notFound().build());
    }
    @PostMapping
    public Cliente create(@RequestBody Cliente cliente) {
        return repository.save(cliente);

    }
    @PutMapping(value = "/{id}")
    public ResponseEntity update(@PathVariable("id") long id,
                                 @RequestBody Cliente cliente) {
        return repository.findById(id)
                .map(record -> {
                    record.setName(cliente.getName());
                    record.setEmail(cliente.getEmail());
                    record.setTipo_pessoa(cliente.getTipo_pessoa());
                    record.setCpf(cliente.getCpf());
                    record.setCnpj(cliente.getCnpj());
                    record.setCep(cliente.getCep());
                    record.setEndereco(cliente.getEndereco());
                    record.setNumero(cliente.getNumero());
                    record.setBairro(cliente.getBairro());
                    record.setCidade(cliente.getCidade());
                    record.setEstado(cliente.getEstado());
                    Cliente updated = repository.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping(path ={"/{id}"})
    public ResponseEntity<?> delete(@PathVariable long id) {
        return repository.findById(id)
                .map(record -> {
                    repository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}