/**
 *
 * Asynchronously loads the component for Editor
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Editor = lazyLoad(
  () => import('./index'),
  module => module.Editor,
);
