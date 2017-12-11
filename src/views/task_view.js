import Backbone from 'backbone'
import Task from '../models/task';

const TaskView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    // listen to changes in the model and render when they occur
    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    if (this.model.get('is_complete')) {
      this.$el.addClass('is-complete');
    } else {
      this.$el.removeClass('is-complete');
    }
    return this;
  },
  events: {
    'click button.delete': 'deleteTask',
    'click button.toggle-complete': 'toggleComplete',
  },
  deleteTask: function(e) {
    this.model.destroy();
    this.remove();
  },
  toggleComplete: function(e) {
    console.log(this.model);
    console.log('printing');
    this.model.set('is_complete', !this.model.get('is_complete'));
    // this.model.task.set('is_complete', !this.model.task.get('is_complete'));
    // this.$el.toggleClass('is-complete');
  },
})

export default TaskView;
