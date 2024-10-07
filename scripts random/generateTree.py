import os

# Lista de directorios cuyo contenido se debe ignorar
ignore_list = {'node_modules', '__pycache__', '.git', 'venv', '.next'}

def generate_tree(dir_path, prefix=''):
    tree_str = ''
    try:
        # Listar archivos y directorios en el directorio actual sin ordenar
        files = os.listdir(dir_path)
        
        # Procesar cada archivo y directorio en el orden en que se listan
        for index, file in enumerate(files):
            file_path = os.path.join(dir_path, file)
            
            if os.path.isdir(file_path):
                if file in ignore_list:
                    # Si el directorio está en la lista de ignorados, lo añadimos pero no procesamos su contenido
                    tree_str += prefix + '└── ' + file + '\n'
                    continue  # No procesamos el contenido de este directorio
                else:
                    if index == len(files) - 1:
                        tree_str += prefix + '└── ' + file + '\n'
                        new_prefix = prefix + '    '
                    else:
                        tree_str += prefix + '├── ' + file + '\n'
                        new_prefix = prefix + '│   '
                    
                    tree_str += generate_tree(file_path, new_prefix)
            else:
                if index == len(files) - 1:
                    tree_str += prefix + '└── ' + file + '\n'
                else:
                    tree_str += prefix + '├── ' + file + '\n'
    
    except Exception as e:
        print(f"Error processing {dir_path}: {e}")

    return tree_str

# Usa el directorio actual del script
project_dir = os.getcwd()
tree = generate_tree(project_dir)

# Abre el archivo con codificación UTF-8
with open('structure.md', 'w', encoding='utf-8') as f:
    f.write('```\n' + tree + '```\n')

print('Project structure saved to structure.md')
