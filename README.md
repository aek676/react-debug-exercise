# React Debugging Exercises

Este repositorio contiene una colección de **ejercicios prácticos para aprender a debuggear en React**. Cada ejercicio presenta desafíos comunes que los desarrolladores enfrentan en aplicaciones React del mundo real.

## 🎯 Objetivo

El objetivo de estos ejercicios es desarrollar habilidades de debugging en React, aprendiendo a:
- Identificar errores comunes en componentes React
- Usar las herramientas de desarrollo del navegador
- Entender el flujo de datos y estado en React
- Depurar problemas de renderizado y eventos

## 📋 Ejercicios

### Ejercicio 1: Formulario de Login
**Ruta:** `/exercise1`

Un ejercicio de debugging de un formulario de login con validación. El estudiante debe identificar y corregir problemas relacionados con el manejo de eventos y la lógica de formularios.

**Componentes involucrados:**
- `LoginForm.tsx` - Formulario principal con validación
- `Navbar.tsx` - Barra de navegación
- `Footer.tsx` - Pie de página

### Ejercicio 2: Lista de Tareas (Todos)
**Ruta:** `/exercise2`

Un ejercicio para debuggear una aplicación de lista de tareas. Contiene errores en la lógica de eliminación de elementos y manejo del estado.

**Componentes involucrados:**
- `SimpleTodos.tsx` - Componente principal de la lista
- `TodosItem.tsx` - Componente individual de cada tarea

### Ejercicio 3: Buscador de Películas (React 19 Migration)
**Ruta:** `/exercise3`

⚠️ **Este ejercicio es especial:** Consiste en **actualizar la aplicación a la nueva versión de React 19 y debuggear para poder hacerla funcional de nuevo**.

La aplicación es un buscador de películas que utiliza la API de TMDb (The Movie Database). Originalmente fue escrita usando patrones antiguos de React (componentes de clase, jQuery, Bloodhound/Typeahead) que pueden no ser compatibles con React 19.

**Desafíos del ejercicio:**
- Migrar componentes de clase a componentes funcionales con hooks
- Reemplazar dependencias obsoletas (jQuery, Bloodhound)
- Adaptar el código a los nuevos patrones de React 19
- Identificar y corregir errores de compatibilidad

**Componentes involucrados:**
- `Exercise3.jsx` - Componente principal de clase
- `card.jsx` - Tarjeta de información de película
- `search.jsx` - Caja de búsqueda con typeahead

## 🚀 Instalación

Para instalar las dependencias:

```bash
bun install
```

## 💻 Desarrollo

Para iniciar el servidor de desarrollo:

```bash
bun dev
```

## 🏭 Producción

Para ejecutar en modo producción:

```bash
bun start
```

## 🛠️ Tecnologías

- **Bun** - Runtime de JavaScript
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Shadcn/UI** - Componentes de UI
- **React Router** - Enrutamiento

## 📚 Recursos de Debugging

- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Debugging en el navegador](https://developer.chrome.com/docs/devtools/)
- [Documentación de React 19](https://react.dev/)

---

Este proyecto fue creado usando `bun init` con [Bun](https://bun.com), un runtime de JavaScript rápido y todo-en-uno.
