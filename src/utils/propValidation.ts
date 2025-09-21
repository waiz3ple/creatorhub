/**
 * Prop validation utilities for runtime validation
 * Provides better debugging and error handling
 */

export const validateRequired = <T>(value: T, propName: string, componentName: string): T => {
  if (value == null) {
    console.warn(`Warning: ${componentName} expects ${propName} to be provided but got ${value}`);
  }
  return value;
};

export const validateFunction = (fn: unknown, propName: string, componentName: string): Function | undefined => {
  if (fn != null && typeof fn !== 'function') {
    console.warn(`Warning: ${componentName} expects ${propName} to be a function but got ${typeof fn}`);
    return undefined;
  }
  return fn as Function;
};

export const validateString = (value: unknown, propName: string, componentName: string): string => {
  if (value != null && typeof value !== 'string') {
    console.warn(`Warning: ${componentName} expects ${propName} to be a string but got ${typeof value}`);
    return String(value);
  }
  return value as string || '';
};

export const validateBoolean = (value: unknown, propName: string, componentName: string): boolean => {
  if (value != null && typeof value !== 'boolean') {
    console.warn(`Warning: ${componentName} expects ${propName} to be a boolean but got ${typeof value}`);
    return Boolean(value);
  }
  return value as boolean || false;
};

export const validateObject = <T extends Record<string, any>>(
  value: unknown,
  propName: string,
  componentName: string
): T | null => {
  if (value != null && (typeof value !== 'object' || Array.isArray(value))) {
    console.warn(`Warning: ${componentName} expects ${propName} to be an object but got ${typeof value}`);
    return null;
  }
  return value as T;
};

export const validateArray = <T>(
  value: unknown,
  propName: string,
  componentName: string
): T[] => {
  if (value != null && !Array.isArray(value)) {
    console.warn(`Warning: ${componentName} expects ${propName} to be an array but got ${typeof value}`);
    return [];
  }
  return (value as T[]) || [];
};
