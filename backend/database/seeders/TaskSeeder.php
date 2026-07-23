<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::insert([
            [
                'title' => 'Todo Test',
                'description' => 'Setup BE Laravel 12',
                'status' => 'done'
            ],
            [
                'title' => 'Todo Test',
                'description' => 'Setup FE NextJS',
                'status' => 'done'
            ],
            [
                'title' => 'Build dan Testing',
                'description' => 'Testing sistem yang sudah dibuat',
                'status' => 'pending'
            ]
        ]);
    }
}
