// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

import Task from './models/task';
import TaskList from './collections/task_list';

// import TaskView from './views/task_view';
import TaskListView from './views/task_list_view';

const taskList = new TaskList();
let taskTemplate;

// const renderList = function(taskList) {
//   const $taskList = $('#todo-items');
//   $taskList.empty();
//
//   taskList.forEach((task) =>{
//     // const taskHtml = $(taskTemplate(task.attributes));
//     // $taskList.append(taskHtml);
//
//     const taskView = new TaskView({
//       model: task,
//       template: taskTemplate,
//       tagName: 'li',
//       className: 'task',
//     });
//
//     $taskList.append(taskView.render().$el);
//
//     // taskHtml.find('.delete').click({task: task}, (params) => {
//     //   const task = params.data.task;
//     //   console.log(params);
//     //   taskList.remove(task);
//     //   updateStatusMessageWith(`The task "${task.get('task_name')}" has been deleted`)
//     // });
//     //
//     // taskHtml.on('click', '.toggle-complete', {task: task}, function(params) {
//     //   params.data.task.set('is_complete', !params.data.task.get('is_complete'));
//     //   $(this).closest('.task').toggleClass('is-complete')
//     // });
//   });
// }

// helper method for updating the DOM with the status from a hash
// const updateStatusMessageFrom = (messageHash) => {
//   $('#status-messages').empty();
//   _.each(messageHash, (messageType) => {
//     messageType.forEach((message) => {
//       $('#status-messages').append($(`<li>${message}</li>`));
//     })
//   });
//   $('#status-messages').show();
// }
//
// // helper method for updating the DOM with the status from a string
// const updateStatusMessageWith = (message) => {
//   $('#status-messages').empty();
//   $('#status-messages').append($(`<li>${message}</li>`));
//   $('#status-messages').show();
// }
//
// const addNewTask = function(event) {
//   event.preventDefault();
//
//   const taskData ={};
//   ['task_name', 'assignee'].forEach( (field) => {
//     const val = $(`input[name=${field}]`).val();
//     if (val != '') {
//       taskData[field] = val;
//     }
//   });
//   const newTask = new Task(taskData);
//
//   if (newTask.isValid()) {
//     taskList.add(newTask);
//     updateStatusMessageWith(`New task added: ${newTask.get('task_name')}`);
//   } else {
//     updateStatusMessageFrom(newTask.validationError);
//   }
// }

$(document).ready( () => {
  taskTemplate = _.template($('#task-template').html());

  // $('#add-task-form').submit(addNewTask);

  // taskList.on('update', renderList, taskList);

  const taskListView = new TaskListView({
    model: taskList,  // defined at beginning of file
    template: taskTemplate,
    el: 'main',  // when this renders, the element is going to be in main
  });

  taskListView.render();

  taskList.add(new Task({task_name: "Put rendering logic in Backbone Views", assignee: "Me"}));
  taskList.add(new Task({task_name: "Put handling events in Backbone Views", assignee: "Me"}));
  taskList.add(new Task({task_name: "Eat a tasty thing"}));
});
