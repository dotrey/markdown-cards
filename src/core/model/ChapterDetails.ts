
/**
 * ChapterDetails are used to locally store information about a chapter, so we don't have to load the chapter
 * file to display this information in the UI.
 */
export class ChapterDetails {
  cardCount: number = 0;
  cardDistribution: number[] = [0, 0, 0, 0, 0];
}
