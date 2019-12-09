export const TABLE_OPT_VALUES: string[] = ["CURRENT_TIMESTAMP"];

export const FEILD_TEMPLATE: string = `{{field}}{{type}}{{unsigned}}{{notNull}}{{default}}{{autoIncrement}}{{onUpdate}}{{comment}}`;

export const WHERE_TERM_API = {
    equal: "whereEqual",
    notEqual: "whereNotEqual",
    in: "whereIn",
    notIn: "whereNotIn",
    more: "whereMore",
    less: "whereLess",
    moreEqual: "whereMoreEqual",
    lessEqual: "whereLessEqual",
    like: "whereLike",
    notLike: "whereNotLike",
    between: "whereBetween",
    notBetween: "whereNotBetween",
    orEqual: "whereOrEqual",
    orNotEqual: "whereOrNotEqual",
    orIn: "whereOrIn",
    orNotIn: "whereOrNotIn",
    orMore: "whereOrMore",
    orLess: "whereOrLess",
    orMoreEqual: "whereOrMoreEqual",
    orLessEqual: "whereOrLessEqual",
    orLike: "whereOrLike",
    orNotLike: "whereOrNotLike",
    orBetween: "whereOrBetween",
    orNotBetween: "whereOrNotBetween"
};

export const HAVING_TERM_API = {
    equal: "havingEqual",
    notEqual: "havingNotEqual",
    in: "havingIn",
    notIn: "havingNotIn",
    more: "havingMore",
    less: "havingLess",
    moreEqual: "havingMoreEqual",
    lessEqual: "havingLessEqual",
    like: "havingLike",
    notLike: "havingNotLike",
    between: "havingBetween",
    notBetween: "havingNotBetween",
    orEqual: "havingOrEqual",
    orNotEqual: "havingOrNotEqual",
    orIn: "havingOrIn",
    orNotIn: "havingOrNotIn",
    orMore: "havingOrMore",
    orLess: "havingOrLess",
    orMoreEqual: "havingOrMoreEqual",
    orLessEqual: "havingOrLessEqual",
    orLike: "havingOrLike",
    orNotLike: "havingOrNotLike",
    orBetween: "havingOrBetween",
    orNotBetween: "havingOrNotBetween"
};
