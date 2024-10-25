# institutions = [
#         {
#             'name': 'Universidad de Buenos Aires',
#             'address': 'Av. Figueroa Alcorta 651, CABA, Argentina',
#             'contact_info': 'info@uba.ar'
#         },
#         {
#             'name': 'Instituto Tecnológico de Monterrey',
#             'address': 'Av. Eugenio Garza Sada 2501 Sur, San Pedro Garza García, México',
#             'contact_info': 'contacto@itesm.mx'
#         },
#         {
#             'name': 'Massachusetts Institute of Technology',
#             'address': '77 Massachusetts Ave, Cambridge, MA, USA',
#             'contact_info': 'info@mit.edu'
#         },
#     ]

#     for inst in institutions:
#         Institution.objects.get_or_create(
#             name=inst['name'],
#             defaults={
#                 'address': inst['address'],
#                 'contact_info': inst['contact_info'],
#             }
#         )

#     # Crear Grupos
#     groups = [
#         {'name': 'Ventas', 'institution_name': 'Universidad de Buenos Aires'},
#         {'name': 'Recursos Humanos', 'institution_name': 'Universidad de Buenos Aires'},
#         {'name': 'Desarrollo de Producto', 'institution_name': 'Instituto Tecnológico de Monterrey'},
#         {'name': 'Marketing', 'institution_name': 'Instituto Tecnológico de Monterrey'},
#         {'name': 'Investigación', 'institution_name': 'Massachusetts Institute of Technology'},
#         {'name': 'Finanzas', 'institution_name': 'Massachusetts Institute of Technology'},
#     ]
