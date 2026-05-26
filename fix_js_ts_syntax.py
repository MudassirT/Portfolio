import re
from pathlib import Path
root = Path('.')
patterns = [
    (re.compile(r'^\s*import\s+type\s+[^;]+;\n', re.MULTILINE), ''),
    (re.compile(r'\bas\s+const\b'), ''),
    (re.compile(r'\bas\s+[A-Za-z0-9_\[\]<>\|\s\.\(\)\"]+'), ''),
    (re.compile(r'\b(React\.forwardRef|forwardRef|React\.createContext|useState|React\.useState|useRef|React\.useRef|useMemo|useCallback|useReducer|createContext)<[^>]+>\s*\('), lambda m: m.group(1) + '('),
    (re.compile(r'\bReact\.createContext<[^>]+>\s*\('), 'React.createContext('),
    (re.compile(r'\bReact\.forwardRef<[^>]+>\s*\('), 'React.forwardRef('),
    (re.compile(r'\bforwardRef<[^>]+>\s*\('), 'forwardRef('),
    (re.compile(r'\bReact\.ComponentPropsWithoutRef<[^>]+>'), ''),
    (re.compile(r'\bReact\.ComponentProps<[^>]+>'), ''),
    (re.compile(r'\bReact\.ElementRef<[^>]+>'), ''),
    (re.compile(r'\bReact\.HTMLAttributes<[^>]+>'), ''),
    (re.compile(r'\bOmit<[^>]+>'), ''),
    (re.compile(r'\bParameters<[^>]+>'), ''),
    (re.compile(r'\bReturnType<[^>]+>'), ''),
    (re.compile(r'\bReact\.ReactElement<[^>]+>'), 'React.ReactElement'),
    (re.compile(r'\bReact\.ElementType<[^>]+>'), 'React.ElementType'),
    (re.compile(r'\bnew Map<[^>]+>\('), 'new Map('),
    (re.compile(r'\s*=\s*\(\s*\)\s*:\s*[^=\n]+=>'), '= () =>'),
    (re.compile(r'\(\s*([^\)]+?)\s*\)\s*:\s*[^=>\n]+=>'), lambda m: '(' + m.group(1) + ') =>'),
    (re.compile(r'\bconst\s+([A-Za-z0-9_]+)\s*:\s*[^=;\n]+\s*='), r'const \1 ='),
    (re.compile(r'\blet\s+([A-Za-z0-9_]+)\s*:\s*[^=;\n]+\s*='), r'let \1 ='),
    (re.compile(r'\bvar\s+([A-Za-z0-9_]+)\s*:\s*[^=;\n]+\s*='), r'var \1 ='),
    (re.compile(r'\(\s*([^\)]+?)\s*\)\s*:\s*[^,\)]+(?=[,\)])'), lambda m: '(' + re.sub(r'\s*:\s*[^,\)]+', '', m.group(0)) + ')'),
    (re.compile(r'\s*:\s*[^,\)=;]+(?=[,\)=;])'), ''),
    (re.compile(r'!\s*([\)\]])'), r'\1'),
]
block_re = re.compile(r'^\s*(export\s+)?(type|interface)\b')
files = [p for p in root.rglob('src/**/*') if p.suffix.lower() in {'.js', '.jsx'}]
modified = 0
for file in sorted(files):
    if 'node_modules' in file.parts:
        continue
    text = file.read_text(encoding='utf-8')
    orig = text
    out = []
    skip = False
    depth = 0
    for line in text.splitlines(True):
        if not skip and block_re.match(line):
            if '{' in line:
                depth = line.count('{') - line.count('}')
                skip = True
                continue
            else:
                continue
        if skip:
            depth += line.count('{') - line.count('}')
            if depth <= 0:
                skip = False
            continue
        out.append(line)
    text = ''.join(out)
    for patt, repl in patterns:
        text = patt.sub(repl, text)
    if text != orig:
        file.write_text(text, encoding='utf-8')
        modified += 1
print(f'Processed {len(files)} files, modified {modified} files.')
