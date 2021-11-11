import { Config, Grunt, Task } from './main';
import { chain, spread } from 'lodash';
import { compose, map } from 'lodash/fp';

const mapValues = <T>(x: (...args: T[]) => unknown) =>
  map(compose(spread(x), Object.values));

export const initialize =
  (config: Config, packages: string[], tasks: Task[]) =>
  (grunt: Grunt): Grunt =>
    chain(grunt)
      .tap((grunt) => grunt.initConfig(config))
      .tap((grunt) => map(grunt.loadNpmTasks)(packages))
      .tap((grunt) => mapValues(grunt.registerTask)(tasks))
      .value();
