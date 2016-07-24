module.exports = {
  title: 'fit-commit-schema',
  type: 'object',
  properties: {
    validators: {
      type: 'object',
    },
    lineLength: {
      type: 'object',
    },
    emptyLines: {
      type: 'object',
    },
    tenseSubject: {
      type: 'object',
    },
    subjectPeriod: {
      type: 'object',
    },
    wip: {
      type: 'object',
    },
  },
  required: [ 'validators' ],
};
