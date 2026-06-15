package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class UserServiceTest {

    @Test
    void deveRetornarTrueParaSenhaForteValida() {
        UserService userService = new UserService(null);

        boolean resultado = userService.isPasswordValid("Valid1@A");

        assertTrue(resultado);
    }

    @Test
    void deveRetornarFalseParaSenhaFracaOuCurta() {
        UserService userService = new UserService(null);

        boolean resultado = userService.isPasswordValid("abc");

        assertFalse(resultado);
    }

    @Test
    void deveRetornarFalseQuandoSenhaForNula() {
        UserService userService = new UserService(null);

        boolean resultado = userService.isPasswordValid(null);

        assertFalse(resultado);
    }
}