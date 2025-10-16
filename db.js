// db.js - Base de datos de productos (autos)
const productos = [
    {
        id: 1,
        nombre: "Tesla Model S",
        precio: 79990,
        descripcion: "El Tesla Model S ofrece un rendimiento excepcional con aceleración Ludicrous, autonomía líder en su clase y tecnología de vanguardia.",
        imagen: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        categoria: "eléctrico",
        destacado: true
    },
    {
        id: 2,
        nombre: "Porsche 911",
        precio: 99990,
        descripcion: "Icono deportivo con más de 50 años de evolución. Motor trasero, tracción trasera y diseño inconfundible.",
        imagen: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        categoria: "deportivo",
        destacado: true
    },
    {
        id: 3,
        nombre: "Audi Q5",
        precio: 45900,
        descripcion: "SUV premium con espacio, confort y tecnología Audi. Perfecto para familias que buscan elegancia y rendimiento.",
        imagen: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        categoria: "suv",
        destacado: false
    },
    {
        id: 4,
        nombre: "BMW Serie 3",
        precio: 42900,
        descripcion: "El deportivo de la clase ejecutiva. Dinámica de conducción excepcional y diseño sofisticado.",
        imagen: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        categoria: "sedan",
        destacado: true
    },
    {
        id: 5,
        nombre: "Jeep Wrangler",
        precio: 38995,
        descripcion: "El auténtico SUV todoterreno. Diseño icónico y capacidades off-road incomparables.",
        imagen: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        categoria: "4x4",
        destacado: false
    },
    {
        id: 6,
        nombre: "Mercedes-Benz Clase A",
        precio: 33900,
        descripcion: "Compacto premium con tecnología MBUX y diseño moderno. Elegancia en un formato urbano.",
        imagen: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        categoria: "hatchback",
        destacado: true
    }
];