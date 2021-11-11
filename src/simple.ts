import { Config, Grunt, Task, initialize } from "./initialize";
import { compose, flatten, map } from "lodash/fp";

export type SimpleTask = {
  name: string;
  description: string;
  clean: string[];
  copy: string[];
  exec: string[];
};

const packages = ["grunt-contrib-clean", "grunt-contrib-copy", "grunt-exec"];

const prefixedJoin = compose(
  flatten,
  map(([k, v]) => map((x: string) => k.concat(":", x))(v))
);

const transformTasks = ({
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
  initialize(config, packages, map(transformTasks)(tasks));
