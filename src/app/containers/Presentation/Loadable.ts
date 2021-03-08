/**
 *
 * Asynchronously loads the component for Presentation
 *
 */

import { lazyLoad } from 'utils/loadable';

export const Presentation = lazyLoad(
  () => import('./index'),
  module => module.Presentation,
);
