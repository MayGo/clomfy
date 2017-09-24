module.exports = {
  require: jest.genMockFunction(),
  match: jest.genMockFunction(),
  app: {
    getName: () => {
      return 'clomfy';
    },
    getPath: () => {
      return '/tmp/mock_path';
    },
  },
  dialog: jest.genMockFunction(),

  ipcMain: {
    on: jest.genMockFunction(),
  },

  remote: {
    getCurrentWindow: jest.genMockFunction(),

    dialog: {
      showSaveDialog: jest.genMockFunction(),
    },
  },
};
