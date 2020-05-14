const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const fetch = require('node-fetch');

const streamPipeline = promisify(require('stream').pipeline);

const defaultOptions = {
  method: 'GET',
  cache: 'default',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'video/mp4',
  },
};

const createOptions = (options, useDefault = true) => {
  if (useDefault) {
    const { headers, ...opts } = options;

    if (headers) {
      return {
        ...defaultOptions,
        ...opts,
        headers: {
          ...defaultOptions.headers,
          ...headers,
        },
      };
    }

    return { ...defaultOptions, ...opts };
  }

  return options;
};

const download = (url, options = defaultOptions) => {
  console.log(`Downloading: ${url} ...`);

  return fetch(url, options);
};

const save = (location, file_name) => async (response) => {
  if (!response.ok) {
    console.log(`unexpected response ${response.statusText}`);

    return Promise.reject(response.statusText);
  }

  const output_path = path.join(location, file_name);

  return await streamPipeline(
    response.body,
    fs.createWriteStream(output_path)
  ).then(() => console.log(`Download Complete: ${file_name} \n`));
};

module.exports = {
  createOptions,
  download,
  save,
};
