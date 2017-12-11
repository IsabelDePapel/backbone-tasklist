import Backbone from 'backbone';
import _ from 'underscore';

import Task from '../models/task';
import TaskView from '../views/task_view';

const TaskListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    // clear the unordered list
    this.$('#todo-items').empty();

    // iterate through the list, rendering each task
    this.model.each((task) => {
      const taskView = new TaskView({
        model: task,
        template: this.template,
        tagName: 'li',
        className: 'task',
      });

      // render TaskView and append this html to DOM
      // this.$ lets us look up jquery things within THIS view
      // this.$ means that you avoid accidentally selecting any jquery
      // OUTSIDE of this view
      this.$('#todo-items').append(taskView.render().$el);
    });
    return this;
  },
  events: {
    'click #add-new-task': 'addTask',
  },
  addTask(event) {
    event.preventDefault();
    const taskData = {};
    ['task_name', 'assignee'].forEach((field) => {
      const val = this.$(`#add-task-form input[name=${field}]`).val();
      if (val != '') {
        taskData[field] = val;
      }
    });
    const newTask = new Task(taskData);

    if (newTask.isValid()) {
      this.model.add(newTask);
      this.updateStatusMessageWith(`New task added: ${newTask.get('task_name')}`);
    } else {
      this.updateStatusMessageFrom(newTask.validationError);
    }
  },
  updateStatusMessageFrom(messageHash) {
    const statusMessagesEl = this.$('#status-messages');
    statusMessagesEl.empty();
    _.each(messageHash, (messageType) => {
      messageType.forEach((message) => {
        statusMessagesEl.append(`<li>${message}</li>`);
      });
    });
    statusMessagesEl.show();
  },
  updateStatusMessageWith(message) {
    const statusMessagesEl = this.$('#status-messages');
    statusMessagesEl.empty();
    statusMessagesEl.append(`<li>${message}</li>`);
    statusMessagesEl.show();
  },
});

export default TaskListView;
