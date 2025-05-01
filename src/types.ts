export const INPUT_STATUS = {
    DEFAULT: "default",
    SUCCESS: "success",
    ERROR: "error"
} as const;

export type InputStateType = (typeof INPUT_STATUS)[keyof typeof INPUT_STATUS]