/**
 *
 * Asynchronously loads the component for Home
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Trash = lazyLoad(
  () => import('./index'),
  module => module.Trash,
);
