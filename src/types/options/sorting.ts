export type SortingOptionEnum = "manual-add-to-end";

export type SortingOption = SortingOptionEnum | (string & NonNullable<unknown>); // preserve possibility to any string
