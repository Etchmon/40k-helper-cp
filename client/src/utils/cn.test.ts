import { describe, it, expect } from 'vitest';
import { cn } from '../utils/cn';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    const isEnabled = false;
    const result = cn('foo', isEnabled && 'bar', 'baz');
    expect(result).toBe('foo baz');
  });

  it('should handle arrays', () => {
    const result = cn(['foo', 'bar']);
    expect(result).toBe('foo bar');
  });

  it('should merge tailwind classes with tailwind-merge', () => {
    const result = cn('px-2 px-4', 'py-1 py-2');
    // tailwind-merge should deduplicate, keeping the last value
    expect(result).toContain('px-4');
    expect(result).toContain('py-2');
  });
});