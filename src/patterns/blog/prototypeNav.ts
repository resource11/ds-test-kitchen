import type { MouseEvent } from 'react';
import { addons } from 'storybook/preview-api';
import { SELECT_STORY } from 'storybook/internal/core-events';

/*
 * Prototype glue, not app routing. Lets the blog prototypes click through to
 * each other inside Storybook, using the same `selectStory` event that
 * `@storybook/addon-links` sends — without adding that dependency.
 */

export const storyIds = {
  index: 'prototypes-blog-index--default',
  article: 'prototypes-article-detail--default',
} as const;

type StoryId = (typeof storyIds)[keyof typeof storyIds];

/** A real URL for links, so middle-click and "copy link" still land somewhere. */
export const storyHref = (id: StoryId) => `/?path=/story/${id}`;

/** Click handler that switches the Storybook manager to another story. */
export function goTo(id: StoryId) {
  return (event?: MouseEvent) => {
    event?.preventDefault();

    // Opened as a bare iframe (no manager around it): swap the story in place.
    if (window.parent === window) {
      window.location.search = `?id=${id}&viewMode=story`;
      return;
    }

    addons.getChannel().emit(SELECT_STORY, { storyId: id });
  };
}
