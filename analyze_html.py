import os, glob, re, json
from html.parser import HTMLParser

class FieldExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.inputs = []
        self.tables = []
        self.current_table = []
        self.in_th = False
        self.current_th = ''

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag in ('input', 'select', 'textarea'):
            name = attr_dict.get('name', '')
            type_ = attr_dict.get('type', tag)
            id_ = attr_dict.get('id', '')
            if name or id_:
                self.inputs.append({'tag': tag, 'name': name, 'id': id_, 'type': type_})
        elif tag == 'th':
            self.in_th = True
            self.current_th = ''

    def handle_data(self, data):
        if self.in_th:
            self.current_th += data

    def handle_endtag(self, tag):
        if tag == 'th':
            self.in_th = False
            text = self.current_th.strip()
            if text:
                self.current_table.append(text)
        elif tag == 'tr':
            if self.current_table:
                self.tables.append(self.current_table)
                self.current_table = []

project_path = r'F:\Developer Abhishek\Website\sanskaar'
html_files = glob.glob(os.path.join(project_path, '**', '*.html'), recursive=True)

schema = {}

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            extractor = FieldExtractor()
            extractor.feed(content)
            
            schema[os.path.relpath(filepath, project_path).replace('\\', '/')] = {
                'inputs': extractor.inputs,
                'tables': extractor.tables
            }
    except Exception as e:
        print(f'Error reading {filepath}: {e}')

with open('schema_analysis.json', 'w', encoding='utf-8') as f:
    json.dump(schema, f, indent=2)

print(f'Processed {len(html_files)} HTML files.')
