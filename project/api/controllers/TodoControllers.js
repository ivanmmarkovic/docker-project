const TodoModel = require('../models/Todo');

const findAll = async (req, res, next) => {
    try {
        let todos = await TodoModel.find();
        res.status(200)
        res.send(JSON.stringify({
            status: 200,
            message: "Todos found",
            data: todos,
            success: true,
        }));
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        let {body} = req.body;
        if(body == undefined){
            let error = new Error("No data provided");
            error.status = 400;
            throw error;
        }
        let todo = await TodoModel.create({body, done: false});
        res.status(201).json({
            status: 201,
            message: "Todo created",
            data: todo,
            success: true
        });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    let todo = null;
    try {
        let {body, done} = req.body;
        let id = req.params.id;
        if(body == undefined && done == undefined){
            let error = new Error("No data provided");
            error.status = 400;
            throw error;
        }
        let o = {};
        if(body != undefined){
            o.body = body;
        }
        if(done != undefined){
            o.done = done;
        }
        todo = await TodoModel.findByIdAndUpdate(id, {...o}, {new: true});
        res.status(200).json({
            status: 200,
            message: "Todo updated",
            data: todo,
            success: true
        });
    } catch (error) {
        if(todo == null){
            error.message = "No todo with that id";
            error.status = 400;
        }
        next(error);
    }
};

const destroy = async (req, res, next) => {
    let todo = null;
    try {
        let id = req.params.id;
        let todo = await TodoModel.findByIdAndDelete(id);
        res.status(204).json({
            status: 204,
            message: "Todo deleted",
            data: null,
            success: true
        });
    } catch (error) {
        if(todo == null){
            error.message = "No todo with that id";
            error.status = 400;
        }
        next(error);
    }
};

module.exports = {
    findAll,
    create,
    update,
    destroy
};