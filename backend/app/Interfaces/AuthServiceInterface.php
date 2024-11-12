<?php

namespace App\Interfaces;

interface AuthServiceInterface
{
    public function registerUser(array $data);
    public function loginUser(array $credentials);
    public function logoutUser();
}