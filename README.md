# Node Video Downloader

A nodejs video downloader helper using node-fetch.

### Usage:

```
import { download, save, createOptions } from 'node-video-downloader';

const URL =
  'https://assets.mixkit.co/videos/preview/mixkit-cloudy-sky-118-large.mp4';

download(URL).then(save('./', 'sample.mp4'));
```

## Api

**download(url, options)**
_url_: video url
_options_: options to be applied for node-fetch

**save(location, file_name)**
_location_: path to where the file to be saved
_file_name_: file name of the downloaded path. (note: include extension)

**createOptions(options, useDefault = true)**
_options_: (object) node-fetch options to be used
_useDefault_: (boolean: true) flag to use default options

### Default Options

```
const defaultOptions = {
  method: 'GET',
  cache: 'default',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'video/mp4',
  },
};
```
