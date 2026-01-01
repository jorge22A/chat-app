Chat App – Trabajo Final Integrador (Angular)

Aplicación web tipo chat desarrollada con Angular como Trabajo Final Integrador de la materia *Desarrollo en Angular*.

El proyecto simula un sistema de chats con contactos, mensajes y respuestas automáticas, aplicando los conceptos centrales del framework.



Tecnologías utilizadas

Angular (Standalone Components)**
TypeScript
Angular Router
Reactive Forms
Signals
CSS nativo (Flexbox / Responsive Design)
Vercel (deploy)
GitHub (control de versiones)

---

 Funcionalidades principales

- Lista de chats con:
  - avatar
  - nombre
  - estado (online / offline / última vez visto)
- Buscador de chats
- Creación de nuevos chats mediante formulario reactivo
- Ventana de conversación independiente por chat
- Envío de mensajes con validación
- Respuestas automáticas de la aplicación con retardo
- Diferenciación visual de mensajes:
  - Usuario → alineados a la derecha
  - App → alineados a la izquierda
- Diseño responsive:
  - Escritorio: dos paneles (lista + conversación)
  - Mobile: un panel a la vez

---

---

 Capturas de pantalla

 Vista Desktop
Aplicación en pantallas grandes, mostrando el panel de chats y la conversación activa en simultáneo.

![Vista Desktop](screenshots/captura1.png)

---

 Vista Mobile – Panel de chats
En dispositivos móviles se muestra primero el panel de lista de chats.

![Vista Mobile - Panel de chats](screenshots/captura2.png)

---

Vista Mobile – Conversación
Vista de la conversación activa en dispositivos móviles.

![Vista Mobile - Conversación](screenshots/captura3.png)


 Rutas de la aplicación

- `/chats` → lista de chats
- `/chats/:id` → conversación con un contacto
- `/nuevo` → formulario para crear un nuevo chat

El enrutamiento se implementa usando `provideRouter` y componentes standalone.

---

 Organización del proyecto

- Componentes reutilizables
- Uso de interfaces para definir `Chat` y `Mensaje`
- Manejo de estado global mediante signals
- Estilos separados en archivos `.css`
- Código organizado siguiendo buenas prácticas de Angular

---

Cómo ejecutar el proyecto en local

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>

Instalar dependencias:

npm install


Levantar el servidor de desarrollo:

ng serve


Abrir en el navegador:

http://localhost:4200

 Deploy

La aplicación está desplegada en Vercel y configurada como SPA para soportar el enrutamiento de Angular.

 URL del deploy:
<URL_DE_VERCEL>

 Notas finales

El historial de commits refleja el proceso progresivo de desarrollo.

El proyecto cumple con los criterios de evaluación solicitados:

uso de Angular moderno

routing

formularios reactivos

diseño responsive

organización del código

👨‍💻 Autor

Jorge Acosta
Trabajo Final Integrador – Desarrollo en Angular





