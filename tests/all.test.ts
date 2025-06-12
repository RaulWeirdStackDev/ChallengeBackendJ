import request from "supertest"
import app from "../src/app" // Importar app, no index

// Token JWT válido para endpoints protegidos
let token = ""

describe("Auth routes", () => {
  test("POST /api/auth/register - registrarUsuario", async () => {
    // Generar un email único para evitar conflictos
    const uniqueEmail = `testuser${Date.now()}@example.com`

    const res = await request(app).post("/api/auth/register").send({
      email: uniqueEmail,
      password: "1234",
    })

    // Aceptar tanto 201 como 200 como códigos válidos
    expect([200, 201]).toContain(res.statusCode)
    expect(res.body).toHaveProperty("message")
  })

  test("POST /api/auth/login - loginUsuario", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com", // Usar un usuario que sabemos que existe
      password: "1234",
    })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("token")
    token = res.body.token
  })

  test("GET /api/auth/usuarios - getUsuarios", async () => {
    const res = await request(app).get("/api/auth/usuarios").set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test("GET /api/auth/usuarios/:id - getUsuarioID", async () => {
    const res = await request(app).get("/api/auth/usuarios/1").set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("email")
  })
})

describe("Products routes", () => {
  let productId: string

  test("GET /api/products/ - getProductos", async () => {
    const res = await request(app).get("/api/products/")
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  test("POST /api/products/ - postProducto", async () => {
    const res = await request(app).post("/api/products/").set("Authorization", `Bearer ${token}`).send({
      nombre: "Headset con micrófono",
      descripcion: "equipo de audio y sonido para jugar en línea",
      precio: 35000,
      stock: 25,
    })

    expect(res.statusCode).toBe(201)

    // Ajustar según la estructura real de tu respuesta
    // Tu API devuelve: { message: "Producto creado", producto: { id: 5, ... } }
    expect(res.body).toHaveProperty("producto")
    expect(res.body.producto).toHaveProperty("id")

    productId = res.body.producto.id // Obtener el ID del objeto producto
  })

  test("GET /api/products/:id - getProductosID", async () => {
    // Verificar que productId no sea undefined
    expect(productId).toBeDefined()

    const res = await request(app).get(`/api/products/${productId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("nombre")
  })

  test("PUT /api/products/:id - putProducto", async () => {
    expect(productId).toBeDefined()

    const res = await request(app).put(`/api/products/${productId}`).set("Authorization", `Bearer ${token}`).send({
      nombre: "Joystick de videojuegos",
      descripcion: "Control para consolas de videojuegos",
      precio: 25709,
      stock: 20,
    })

    expect(res.statusCode).toBe(200)

    // Ajustar según la estructura real de tu respuesta
    if (res.body.producto) {
      // Si la respuesta tiene la estructura { message, producto }
      expect(res.body.producto).toHaveProperty("nombre", "Joystick de videojuegos")
    } else {
      // Si la respuesta tiene la estructura directa
      expect(res.body).toHaveProperty("nombre", "Joystick de videojuegos")
    }
  })

  test("DELETE /api/products/:id - deleteProductos", async () => {
    expect(productId).toBeDefined()

    const res = await request(app).delete(`/api/products/${productId}`).set("Authorization", `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
  })
})
