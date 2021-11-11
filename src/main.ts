import grunt from 'grunt';

export { simple } from './simple';
export { initialize } from './initialize';

// Equivalent to IGrunt.
export type Grunt = typeof grunt;

// Equivalent to IProjectConfig.
export type Config = {
  [plugin: string]: Record<string, unknown>;
};

// @types/grunt doesn't define a convenient Task type.
export type Task = {
  name: string;
  description: string;
  tasks: string[];
};
