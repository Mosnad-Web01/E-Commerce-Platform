<?php

namespace App\Services;

use App\Interfaces\OrderServiceInterface;
use App\Repositories\Contracts\OrderRepositoryInterface;

class OrderService implements OrderServiceInterface
{
    protected $orderRepository;

    public function __construct(OrderRepositoryInterface $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function getAllOrders()
    {
        return $this->orderRepository->all();
    }

    public function getOrderById($id)
    {
        return $this->orderRepository->find($id);
    }

    public function createOrder(array $data)
    {
        return $this->orderRepository->create($data);
    }

    public function updateOrderStatus($id, $status)
    {
        return $this->orderRepository->update($id, ['status' => $status]);
    }
}
