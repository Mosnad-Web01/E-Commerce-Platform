<?php

namespace App\Interfaces;

interface OrderServiceInterface
{
    public function getAllOrders();
    public function getOrderById($id);
    public function createOrder(array $data);
    public function updateOrderStatus($id, $status);
}