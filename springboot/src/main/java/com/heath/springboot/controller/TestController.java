package com.heath.springboot.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/test")
public class TestController {

    @PostMapping("/send/file")
    public String sendFile(HttpServletRequest request) throws IOException {
        String requestBody = "";
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
            requestBody = reader.lines().collect(Collectors.joining(System.lineSeparator()));
            System.out.println("Request Body Length: " + requestBody.length());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Request body printed to console.";
    }

}
