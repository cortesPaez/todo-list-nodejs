## Getting Started
Instrucciones para poder levantar el proyecto

<ul>
    <li>Instalar Postgresql</li>
    <li>Instalar nodejs</li>
    <li>Instalar los modulos de node</li>
    <li>Ejecutar migraciones</li>
    <li>Levantar el proyecto</li>
</ul>

Crear base de datos en Postgres

Añadir .env al proyecto con la palabra secreta y los datos de la db reemplazando username, password y mydb

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
JWT_SECRET="your_secret"
```



```bash
npm i
```

```bash
npm i
```

Instalar modulos de node
```bash
npm i
```

Ejecutar las migraciones
```bash
npx prisma migrate dev
```

Ejecutar servidor en el puerto 3000
```bash
npm run dev
```
