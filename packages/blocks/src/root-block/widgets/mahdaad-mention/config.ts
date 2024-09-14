export type MahdaadMentionMenuConfig = {
  triggerKeys: string[];
  ignoreBlockTypes: BlockSuite.Flavour[];
  maxHeight: number;
  tooltipTimeout: number;
};

export const defaultMahdaadMentionMenuConfig: MahdaadMentionMenuConfig = {
  triggerKeys: [
    //'@'
  ],
  ignoreBlockTypes: ['affine:code'],
  maxHeight: 344,
  tooltipTimeout: 800,
};
