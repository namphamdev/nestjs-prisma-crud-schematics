import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { SubAppOptions } from './sub-app.schema';

describe('SubApp Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );
  it('should manage name only', async () => {
    const options: SubAppOptions = {
      name: 'project',
    };
    const tree: UnitTestTree = await runner.runSchematicAsync('sub-app', options).toPromise();
    const files: string[] = tree.files;
    expect(files).toEqual([
      '/nest-cli.json',
      '/apps/nestjs-schematics/tsconfig.app.json',
      '/apps/project/tsconfig.app.json',
      '/apps/project/src/main.ts',
      '/apps/project/src/project.controller.spec.ts',
      '/apps/project/src/project.controller.ts',
      '/apps/project/src/project.module.ts',
      '/apps/project/src/project.service.ts',
      '/apps/project/test/app.e2e-spec.ts',
      '/apps/project/test/jest-e2e.json',
    ]);
  });
  it('should manage name to dasherize', async () => {
    const options: SubAppOptions = {
      name: 'awesomeProject',
    };
    const tree: UnitTestTree = await runner.runSchematicAsync('sub-app', options).toPromise();
    const files: string[] = tree.files;
    expect(files).toEqual([
      '/nest-cli.json',
      "/apps/nestjs-prisma-crud-schematics/tsconfig.app.json",
      '/apps/awesome-project/tsconfig.app.json',
      '/apps/awesome-project/src/main.ts',
      '/apps/awesome-project/src/awesome-project.controller.spec.ts',
      '/apps/awesome-project/src/awesome-project.controller.ts',
      '/apps/awesome-project/src/awesome-project.module.ts',
      '/apps/awesome-project/src/awesome-project.service.ts',
      '/apps/awesome-project/test/app.e2e-spec.ts',
      '/apps/awesome-project/test/jest-e2e.json',
    ]);
  });
  it('should manage javascript files', async () => {
    const options: SubAppOptions = {
      name: 'project',
      language: 'js',
    };
    const tree: UnitTestTree = await runner.runSchematicAsync('sub-app', options).toPromise();
    const files: string[] = tree.files;
    expect(files).toEqual([
      '/nest-cli.json',
      "/apps/nestjs-prisma-crud-schematics/.babelrc",
      "/apps/nestjs-prisma-crud-schematics/index.js",
      "/apps/nestjs-prisma-crud-schematics/jsconfig.json",
      '/apps/project/.babelrc',
      '/apps/project/index.js',
      '/apps/project/jsconfig.json',
      '/apps/project/src/app.controller.js',
      '/apps/project/src/app.controller.spec.js',
      '/apps/project/src/app.module.js',
      '/apps/project/src/app.service.js',
      '/apps/project/src/main.js',
      '/apps/project/test/app.e2e-spec.js',
      '/apps/project/test/jest-e2e.json',
    ]);
  });
});
