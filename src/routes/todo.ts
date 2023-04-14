import express, { Router } from 'express';
import { type } from 'os';

const router = Router();

import { Todo } from '../models/todo'

let todos: Todo[] = []

type RequestBody = { text: string }
type RequestParams = { todoId: string }


router.get('/', (req, res, next) => {
    res.status(300).json({ todos: todos })
})

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(200).json({ message: 'todo pushed' })
})

router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams
    const tid = params.todoId;
    const todoIndex = todos.findIndex(todosItem => {
        todosItem.id === tid
    })
    if (todoIndex > 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text }
        return res.status(200).json({ message: 'text updated' })

    } else {
        res.status(500).json({ message: 'coudnt find todo id' })
    }
})

router.delete('/todos/:todoId', (req, res, next) => {
    const params = req.params as RequestParams
    const tid = params.todoId;
    todos.filter((tododItem) => {
        tododItem.id !== tid
    })
})

export default router;