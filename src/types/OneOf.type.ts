export type OnlyFirst<TFirst, TSecond> = TFirst & {
    [key in keyof Omit<TSecond, keyof TFirst>]?: never;
};

export type MergeTypes<TArray extends any[], TResult = {}> = TArray extends [
    infer THead,
    ...infer TRest,
]
    ? MergeTypes<TRest, TResult & THead>
    : TResult;

export type OneOf<
    TArray extends any[],
    TResult = never,
    TAllProperties = MergeTypes<TArray>,
> = TArray extends [infer THead, ...infer TRest]
    ? OneOf<TRest, TResult | OnlyFirst<THead, TAllProperties>, TAllProperties>
    : TResult;