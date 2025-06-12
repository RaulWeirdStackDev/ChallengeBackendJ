import app from "./app"

const PORT = process.env.PORT || 3000

// Solo iniciar el servidor cuando este archivo se ejecute directamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
    console.log(`Swagger docs disponibles en http://localhost:${PORT}/api-docs`)
  })
}

export default app
