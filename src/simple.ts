import { Config, Grunt, Task } from './main';
import { compose, flatten, map } from 'lodash/fp';

import { initialize } from './initialize';

export type SimpleTask = {
  name: string;
  description: string;
  clean: string[];
  copy: string[];
  exec: string[];
};

const packages = ['grunt-contrib-clean', 'grunt-contrib-copy', 'grunt-exec'];

const prefixedJoin = compose(
  flatten,
  map(([k, v]) => map((x: string) => k.concat(':', x))(v))
);

const stdoutExecs = (config: Config) => ({
  ...config,
  ...{
    exec: Object.fromEntries(
      Object.entries(config.exec).map(([k, v]) => [
        k,
        {
          cmd: v,
          stdout: 'inherit',
        },
      ])
    ),
  },
});

const joinTaskNames = ({
  name,
  description,
  clean,
  copy,
  exec,
}: SimpleTask): Task => ({
  name,
  description,
  tasks: prefixedJoin(Object.entries({ clean, copy, exec })),
});

export const simple = (
  config: Config,
  tasks: SimpleTask[]
): ((grunt: Grunt) => Grunt) =>
  initialize(stdoutExecs(config), packages, map(joinTaskNames)(tasks));
