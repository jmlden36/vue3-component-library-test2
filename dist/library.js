'use strict';

var vue = require('vue');

var script = {
  name: 'my-button',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    props = vue.reactive(props);
    return {
      classes: vue.computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': props.primary,
        'storybook-button--secondary': !props.primary,
        [`storybook-button--${props.size || 'medium'}`]: true,
      })),
      style: vue.computed(() => ({
        backgroundColor: props.backgroundColor,
      })),
      onClick() {
        emit('click');
      }
    }
  },
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("button", {
    type: "button",
    class: vue.normalizeClass($setup.classes),
    onClick: _cache[0] || (_cache[0] = (...args) => ($setup.onClick && $setup.onClick(...args))),
    style: vue.normalizeStyle($setup.style)
  }, vue.toDisplayString($props.label), 7 /* TEXT, CLASS, STYLE */))
}

script.render = render;
script.__file = "src/stories/Button.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
var MyButton = {
  title: 'Example/Button',
  component: script,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: {},
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyButton: script },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<my-button v-bind="args" />',
});

const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};

const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

var components = { MyButton };

const plugin = {
  install (Vue) {
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop];
        Vue.component(component.name, component);
      }
    }
  }
};

module.exports = plugin;
