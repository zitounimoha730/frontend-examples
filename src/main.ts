import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { configAgGrid } from './grid.config';

configAgGrid();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
