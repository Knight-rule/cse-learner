#!/usr/bin/env python3
# Fix double-encoded UTF-8 (mojibake) in courses.ts
# The file was saved as UTF-8, but the original UTF-8 bytes were
# misinterpreted as cp1252/Latin-1 before saving.

import codecs

with open("src/data/courses.ts", "r", encoding="utf-8") as f:
    content = f.read()

# Strategy: find mojibake byte sequences and reverse them
# cp1252 maps 0x80-0xFF to specific Unicode chars
# We can use the unicode_escape + latin-1 approach

def fix_mojibake_str(s):
    """Try to reverse a mojibake string."""
    try:
        # Encode as latin-1 (which maps 1:1 for U+0000-U+00FF)
        raw = s.encode("latin-1")
        # Decode as UTF-8
        return raw.decode("utf-8")
    except (UnicodeDecodeError, UnicodeEncodeError):
        return s

# Find all icon: "..." values and fix them
import re

def fix_icon_match(m):
    old_val = m.group(1)
    new_val = fix_mojibake_str(old_val)
    if new_val != old_val:
        print(f"  Fixed icon: {old_val} -> {new_val}")
    return f'icon: "{new_val}"'

content = re.sub(r'icon: "([^"]+)"', fix_icon_match, content)

# Fix mojibake in ALL strings (quiz options, descriptions, etc.)
# Process line by line, only fix lines with mojibake patterns
lines = content.split('\n')
fixed_count = 0
for i, line in enumerate(lines):
    # Skip lines that are pure ASCII
    if all(ord(c) < 128 for c in line):
        continue
    # Try to fix the whole line
    try:
        raw = line.encode("latin-1")
        decoded = raw.decode("utf-8")
        if decoded != line:
            lines[i] = decoded
            fixed_count += 1
            print(f"  Line {i+1}: fixed")
    except (UnicodeDecodeError, UnicodeEncodeError):
        pass

content = '\n'.join(lines)

with open("src/data/courses.ts", "w", encoding="utf-8") as f:
    f.write(content)

print(f"\nDone. Fixed {fixed_count} lines with mojibake.")
