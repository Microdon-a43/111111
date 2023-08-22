import Task from '../models/tasksModel.js';

export const taskController = {
  createTask: async (req, res) => {
    try {
      const newTask = await Task.create(req.body);

      res.json({
        message: 'Task was created successfully',
        newTask,
      });
    } catch (error) {
      res.status(500).json({ msg: 'При создании задачи произошла ошибка' });
    }
  },
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json({tasks});
    } catch (error) {
      res.status(500).json({ msg: 'При выполнении запроса произошла ошибка' });
    }
  },
  getOneTask: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task)
        return res.status(404).json({
          message: 'Задача не найдена',
        });
      res.json({
        message: 'Success',
        task,
      });
    } catch (error) {
      res.status(500).json({ msg: 'При выполнении запроса произошла ошибка' });
    }
  },
  updateTask: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(
        { _id: req.params.id },
        { isComplete: req.body.isComplete }
      );
      if (!task)
        return res.status(404).json({
          message: 'Задача не найдена',
        });
      res.json({
        message: 'Задача была успешно обновлена',
        task
      });
    } catch (error) {}
  },

  deleteOneTask: async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
      res.json({
        message: 'Задача удалена успешно',
        deletedTask,
      });
    } catch (error) {
      res.status(500).json({ msg: 'При выполнении запроса произошла ошибка' });
    }
  },

  deleteAllTasks: async (req, res) => {
    await Task.deleteMany({})
    res.json({
      message: 'Удаление прошло успешно',
    })
  }
};
